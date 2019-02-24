import fs from 'fs'
import url from 'url'
import path from 'path'
import http from 'http'
import { Transform } from 'stream'
import { defaultPort, listeningMsg } from '../config/config.json'

const htmlTransformer = class extends Transform {
    constructor(message) {
        super()
        this.message = message
    }

    _transform(chunk, encoding, done) {
        const str = chunk.toString()
        const newStr = str.replace('{message}', this.message)
        this.push(newStr)
        done()
    }
}
http.createServer((req, res) => {
    const { message = '' } = url.parse(req.url, true).query
    res.setHeader('Content-Type', 'text/html')

    fs.createReadStream(path.resolve('./http-servers/index.html'))
        .pipe(new htmlTransformer(message))
        .pipe(res)
}).listen(defaultPort, err => {
    if (err) {
        console.error(err)
    }
    console.log(`${listeningMsg} ${defaultPort}`)
})
