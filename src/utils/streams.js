'use strict'

let fs = require('fs')

if (require.main == module) {
    run()
}

function run() {
    let program = require('commander')
    let utils = require('./utils')
    let helpMes = `
        To print file content call:
    node ./utils/streams.js -a print-file -f ./data/text.txt

    To reverse a string call:
    node ./utils/streams.js -a reverse

    To upper case input call:
    node ./utils/streams.js -a upper-case

    To convert csv file to json call:
    node ./utils/streams.js -a csv-file-to-json -f ./data/MOCK_DATA.csv

    To convert csv file to json file call:
    node ./utils/streams.js -a csv-file-to-json-file -f ./data/MOCK_DATA.csv

    To bundle css call (task 8):
    node ./utils/streams.js -a bundle-css -p ./data/css
        `
    const checkArgumentAndTriggerAction = (path, action) => {
        if (!path) {
            throw Error('No argument file')
        } else if (!fs.existsSync(path)){
            throw Error('No such file')
        }
        else {
            action(path)
        }
    }

    program
        .option('-a, --action <action name>', 'action to call')
        .option('-f, --file <file name>', 'file name to process')
        .option('-p, --path <path>', 'path to css files')
        .on('--help', () => {
            console.log(helpMes)
        })
        .parse(process.argv)

// If module is called without arguments, notify user about wrong input and print a usage message
    if (program.rawArgs.length === 2) {
        console.log(`Wrong input. Please pass any option\n${helpMes}`)
        return
    }



    switch (program.action) {
        case 'print-file':
            checkArgumentAndTriggerAction(program.file, utils.printFile)
            break
        case 'reverse':
            utils.reverse()
            break
        case 'upper-case':
            utils.upperCase()
            break
        case 'csv-file-to-json':
            checkArgumentAndTriggerAction(program.file, utils.convertCsvFileToJson)
            break
        case 'csv-file-to-json-file':
            checkArgumentAndTriggerAction(program.file, utils.convertCsvFileToJsonFile)
            break
        case 'bundle-css':
            checkArgumentAndTriggerAction(program.path, utils.bundleCss)
        default: console.log(`No action ${program.action}`)
    }
}




