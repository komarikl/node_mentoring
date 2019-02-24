import express from 'express'
import cookieParser from 'cookie-parser'
import { queryParser, cookiesParser, checkToken } from './middlewares/'
import { usersRoutes, productsRoutes, authRout } from './routes/'

const app = express()

app.use(/\/((?!auth).)*/, checkToken)
app.use(express.json())
app.use(cookieParser(), cookiesParser)
app.use(queryParser)

app.use(authRout)
app.use(usersRoutes)
app.use(productsRoutes)

// app.use((err, req, res) => {
//     console.error(err)
//     res.status(err.status).send(err.message)
// })
export default app
