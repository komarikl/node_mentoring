import http from 'http'
import mongoose from 'mongoose'
import Cities from '../models/cities'
import { mongodb } from '../config/db.json'
import { defaultPort, serverStartMessage } from '../config/config.json'

mongoose.Promise = Promise
mongoose
    .connect(mongodb)
    .then(() => {
        const echoRequestHandler = (req, res) =>
            Cities.find({})
                .then(results => {
                    const index = Math.floor(Math.random() * results.length)
                    res.writeHead(200, { 'Content-Type': 'application/json' })
                    res.write(JSON.stringify(results[index]))
                    res.end()
                })
                .catch(err => console.log(err))

        http.createServer(echoRequestHandler).listen(defaultPort, err => {
            if (err) console.log(err)
            console.log(`${serverStartMessage} ${defaultPort}`)
        })
    })
    .catch(err => console.log(err))
