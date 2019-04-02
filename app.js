import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { privateKey } from './config/config.json'
import { queryParser, cookiesParser, checkToken } from './middlewares/'
import { usersRoutes, productsRoutes, authRouts } from './routes/'

import passport from 'passport'
import './passport'

const app = express()

app.use(/\/((?!auth).)*/, checkToken)
app.use(express.json())
app.use(cookieParser(), cookiesParser)
app.use(queryParser)
app.use(session({ secret: privateKey }))

app.use(passport.initialize())
app.use(passport.session())

app.use(authRouts)
app.use(usersRoutes)
app.use(productsRoutes)

export default app
