import jwt from 'jsonwebtoken'

export default function(req, res, next) {
    const token = req.headers['x-access-token']

    if (token) {
        jwt.verify(token, 'secret', err => {
            if (err) {
                res.json({ message: 'Failed to authenticate token' })
            } else {
                next()
            }
        })
    } else {
        res.status(403).send({ message: 'No token provided' })
    }
}
