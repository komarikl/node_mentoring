import jwt from 'jsonwebtoken'
const config = require('../config/config.json')

module.exports = function(req, authOrSecDef, scopesOrApiKey, callback) {
    if (!scopesOrApiKey) {
        return callback({
            status: 403,
            message: 'Forbidden. No token!'
        })
    }

    try {
        jwt.verify(scopesOrApiKey.replace('Bearer ', ''), config.privateKey)
    } catch ({ message }) {
        return callback({
            status: 400,
            message
        })
    }

    callback(null)
}
