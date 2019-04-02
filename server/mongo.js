import http from 'http'
import { MongoClient } from 'mongodb'
import { mongodb } from '../config/db.json'
import { defaultPort, listeningMsg } from '../config/config.json'

MongoClient.connect(
    mongodb.slice(0, mongodb.lastIndexOf('/')),
    (err, client) => {
        if (err) console.log(err)

        const db = client.db('mentoring')
        const collection = db.collection('cities')

        const echoRequestHandler = (req, res) =>
            collection
                .find({})
                .toArray()
                .then(results => {
                    const index = Math.floor(Math.random() * results.length)
                    res.writeHead(200, { 'Content-Type': 'application/json' })
                    res.write(JSON.stringify(results[index]))
                    res.end()
                })
                .catch(err => console.log(err))

        http.createServer(echoRequestHandler).listen(defaultPort, err => {
            if (err) console.log(err)
            console.log(`${listeningMsg} ${defaultPort}`)
        })
    }
)
