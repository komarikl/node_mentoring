'use strict'

let fs = require('fs')
let through2 = require('through2')
let csvToJson = require('csvtojson')
let request = require('request')
let path = require('path')

exports = module.exports = {}

exports.printFile = (filePath) => {
    fs.createReadStream(filePath).pipe(process.stdout)
}

exports.convertCsvFileToJson = (filePath) => {
    csvToJson()
        .fromStream(fs.createReadStream(filePath))
        .pipe(transformCsvToJson())
        .pipe(process.stdout)
}

exports.convertCsvFileToJsonFile = (filePath) => {
    let outputFileName = path.join(path.dirname(filePath), `${path.basename(filePath, '.csv')}.json`)

    csvToJson()
        .fromStream(fs.createReadStream(filePath))
        .pipe(transformCsvToJson())
        .pipe(fs.createWriteStream(outputFileName))
}

exports.upperCase = () => {
    let toUpperCase = through2((chunk, enc, callback) => {
        callback(null, new Buffer(chunk.toString().toUpperCase()))
    })

    process.stdin
        .pipe(toUpperCase)
        .pipe(process.stdout)
}

exports.bundleCss = (dirPath) => {
    fs.readdir(dirPath, (err, files) => {
        let epamCssUrl = 'https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css'
        let targetFile = fs.createWriteStream(path.join(dirPath, 'bundle.css'));

        let addLineEnd = s => s.pipe(through2(function (c, e, next) {
            this.push(c)
            next()
        }, function (flush) {
            this.push('\n')
            flush()
        }));

        console.log(request(epamCssUrl));

        files
            .filter(el => /\.css$/.test(el))
            .map((filePath) => fs.createReadStream(path.join(dirPath, filePath)))
            .concat(request(epamCssUrl))
            .map(addLineEnd)
            .reduce((prevStream, nextStream, i) => {

                i === 1 && prevStream.pipe(targetFile, {
                    end: false
                })

                prevStream.on('end', () => nextStream.pipe(targetFile, {
                    end: false
                }))

                return nextStream
            })
    })
}

function transformCsvToJson() {
    let objs = []
    return through2((data, enc, callback) => {
        objs.push(JSON.parse(data.toString()))
        callback(null, null)
    }, (callback) => {
        callback(null, JSON.stringify(objs, null, 2))
    })
}