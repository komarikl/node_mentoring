import http from 'http'
import { defaultPort, listeningMsg } from '../config/config.json'

http.createServer((req, res) => {
    res.setHeader('Content-Type', req.headers['content-type'] || 'text/plain')
    req.pipe(res)
}).listen(defaultPort, err => {
    if (err) {
        console.error(err)
    }
    console.log(`${listeningMsg} ${defaultPort}`)
})
