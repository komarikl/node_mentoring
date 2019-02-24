import http from 'http'
import { defaultPort, listeningMsg } from '../config/config.json'

const product = {
    id: 1,
    name: 'Supreme T-Shirt',
    brand: 'Supreme',
    price: 99.99,
    options: [{ color: 'blue' }, { size: 'XL' }]
}

http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(product))
}).listen(defaultPort, err => {
    if (err) {
        console.error(err)
    }
    console.log(`${listeningMsg} ${defaultPort}`)
})
