import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import mongoose from 'mongoose'
import { privateKey } from './config/config.json'
import { queryParser, cookiesParser } from './middlewares/'
import { usersRoutes, productsRoutes, authRouts, citiesRoutes } from './routes/'

import passport from 'passport'
import './passport'

const app = express()

mongoose.Promise = Promise
mongoose
    .connect(mongodb)
    .then(() => {
        app.use(express.json())
        app.use(cookieParser(), cookiesParser)
        app.use(queryParser)
        app.use(session({ secret: privateKey }))

        app.use(passport.initialize())
        app.use(passport.session())

        app.use(authRouts)
        app.use(usersRoutes)
        app.use(productsRoutes)
        app.use(citiesRoutes)
    })
    .catch(err => console.log(err))

export default app
