const jwt =  require ('jsonwebtoken')
const config   = require ('../../config/config.json')
const Users  = require ('../../models/users')

const checkCredentials = async (req, res, next) => {
    const { login, password } = req.query

    Users.findOne({ login, password })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    code: 404,
                    message: 'Not found!'
                })
            }

            res.status(200).send({
                data: {
                    user: {
                        email: user.email,
                        username: user.login
                    }
                },
                token: jwt.sign(
                    {
                        id: user._id,
                        login: user.login,
                        email: user.email
                    },
                    config.privateKey
                )
            })
        })
        .catch(err => console.log(err))
}

module.exports = {
    checkCredentials
}