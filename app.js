import express from 'express'
import mongoose from 'mongoose'
import { privateKey, defaultPort } from './config/config.json'
import { mongodb } from './config/db.json'
import SwaggerExpress from 'swagger-express-mw'
import BearerAuth from './middlewares/check-token'

const app = express()
const swaggerConfig = {
    appRoot: __dirname,
    swaggerSecurityHandlers: { BearerAuth }
}
SwaggerExpress.create(swaggerConfig, function(err, swaggerExpress) {
    if (err) {
        throw err
    }

    // install middleware
    swaggerExpress.register(app)

    const port = process.env.PORT || defaultPort
    mongoose.Promise = Promise
    mongoose
        .connect(mongodb)
        .then(() => {
            app.listen(port)
        })
        .catch(console.log)

    if (swaggerExpress.runner.swagger.paths['/hello']) {
        console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott')
    }
})

export default app
