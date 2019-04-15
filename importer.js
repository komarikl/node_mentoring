const fs = require('fs')
const path = require('path')
const util = require('util')
const csvjson = require('csvjson')

const { resolve: resolvePath } = path
const readOptions = { encoding: 'utf8' }
const readFile = util.promisify(fs.readFile)

export class Importer {
    import(path) {
        return readFile(resolvePath(path), readOptions).then(data => csvjson.toObject(data.toString()))
    }

    importStream(path) {
        return fs
            .createReadStream(resolvePath(path))
            .pipe(csvjson.stream.toObject())
            .pipe(csvjson.stream.stringify())
    }

    importSync(path) {
        const data = fs.readFileSync(resolvePath(path), readOptions)
        return csvjson.toObject(data)
    }

    importSchemaObject(path) {
        const data = fs.readFileSync(resolvePath(path), readOptions)
        return fs.createReadStream(resolvePath(path)).pipe(csvjson.stream.toSchemaObject())
    }
}
