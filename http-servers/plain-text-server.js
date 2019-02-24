import * as http from 'http'
import { defaultPort, listeningMsg } from '../config/config.json'
const port = process.env.PORT || defaultPort

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Hello world!')
}).listen(port, () => console.log(`${listeningMsg} ${port}!`))
