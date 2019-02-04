'use strict'

if (require.main == module) {
    run()
}

function run() {
    let program = require('commander')
    let utils = require('./utils')

    program
        .option('-a, --action <action name>', 'action to call')
        .option('-f, --file <file name>', 'file name to process')
        .option('-p, --path <path>', 'path to css files')
        .on('--help', () => {
            console.log(`
        To print file content call (task 4):
            node ./utils/streams.js -a print-file -f ./data/text.txt
        
        To upper case input call (task 5):
            node ./utils/streams.js -a upper-case
        
        To convert csv file to json call (task 6):
            node ./utils/streams.js -a csv-file-to-json -f ./data/MOCK_DATA.csv
        
        To convert csv file to json file call (task 7):
            node ./utils/streams.js -a csv-file-to-json-file -f ./data/MOCK_DATA.csv
        
        To bundle css call (task 8):
            node ./utils/streams.js -a bundle-css -p ./data/css
        `)
        })
        .parse(process.argv)

// If module is called without arguments, notify user about wrong input and print a usage message
    if (program.rawArgs.length === 2) {
        console.log('Wrong input. Please pass any option')
        return
    }

    switch (program.action) {
        case 'print-file':
            utils.printFile(program.file)
            break
        case 'upper-case':
            utils.upperCase()
            break
        case 'csv-file-to-json':
            utils.convertCsvFileToJson(program.file)
            break
        case 'csv-file-to-json-file':
            utils.convertCsvFileToJsonFile(program.file)
            break
        case 'bundle-css':
            utils.bundleCss(program.path)
    }
}




