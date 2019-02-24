import jwt from 'jsonwebtoken'
import { users } from '../models'

export const auth = async (req, res, next) => {
    const { login, password } = req.query
    const user = users.find(user => user.login === login)

    if (!user) {
        return res.status(404).send('User not found!')
    }
    if (user.password === password) {
        const data = {
            user: {
                email: user.email,
                username: user.username
            }
        }
        res.status(200).json({
            data,
            token: jwt.sign(data, 'secret')
        })
    } else {
        return res.status(403).send({ message: 'Password incorrect.' })
    }
}
