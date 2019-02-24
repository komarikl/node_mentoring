import express from 'express'
import cookieParser from 'cookie-parser'
import { queryParser, cookiesParser, checkToken } from './middlewares/'
import { usersRoutes, productsRoutes, authRout } from './routes/'
import { users } from './models'
import passport from 'passport'
import passportLocal from 'passport-local'

const LocalStrategy = passportLocal.Strategy
const app = express()

passport.use(
    new LocalStrategy(
        {
            usernameField: 'login',
            passwordField: 'password'
        },
        function(login, password, done) {
            const userData = users.find(user => user.login === login && user.password === password)

            if (!userData) {
                return done(null, false, { message: 'Login or password is incorrect.' })
            }

            return done(null, userData)
        }
    )
)

app.use(/\/((?!auth).)*/, checkToken)
app.use(express.json())
app.use(cookieParser(), cookiesParser)
app.use(queryParser)

app.use(authRout)
app.use(usersRoutes)
app.use(productsRoutes)

export default app
