import passport from 'passport'
import jwt from 'jsonwebtoken'
import { users } from '../models'
import { privateKey } from '../config/config.json'

export const checkCredentials = async (req, res, next) => {
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
            token: jwt.sign(data, privateKey)
        })
    } else {
        return res.status(403).send({ message: 'Password incorrect.' })
    }
}

export const passportAuth = async (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user) => {
        if (err || !user) {
            return next({
                message: 'Incorrect credentials!',
                status: 401
            })
        }

        req.login(user, { session: false }, message => {
            if (message) {
                return next({
                    status: 500,
                    message
                })
            }

            res.status(200).json({
                data: {
                    user: {
                        email: user.email,
                        username: user.login
                    }
                },
                token: jwt.sign(
                    {
                        id: user.id,
                        login: user.login,
                        email: user.email
                    },
                    privateKey
                )
            })
        })
    })(req, res)
}

export const googleAuthCallback = async (req, res, next) => {
    passport.authenticate('google', { session: false }, (err, user) => {
        if (err || !user) {
            return next({
                message: 'Incorrect credentials!',
                status: 401
            })
        }

        req.login(user, { session: false }, message => {
            if (message) {
                return next({
                    status: 500,
                    message
                })
            }

            res.status(200).json({
                data: {
                    user: {
                        id: user.id,
                        username: user.displayName
                    }
                },
                token: jwt.sign(
                    {
                        username: user.username,
                        id: user.id
                    },
                    privateKey
                )
            })
        })
    })(req, res)
}

export const googleAuth = async (req, res, next) => {
    passport.authenticate('google', { scope: ['profile'] })(req, res, next)
}

export const twitterAuthCallback = async (req, res, next) => {
    passport.authenticate('twitter', { session: false }, (err, user) => {
        if (err || !user) {
            return next({
                message: 'Incorrect credentials!',
                status: 401
            })
        }

        req.login(user, { session: false }, message => {
            if (message) {
                return next({
                    status: 500,
                    message
                })
            }

            res.status(200).json({
                data: {
                    user: {
                        id: user.id,
                        username: user.username
                    }
                },
                token: jwt.sign(
                    {
                        username: user.username,
                        id: user.id
                    },
                    privateKey
                )
            })
        })
    })(req, res)
}

export const twitterAuth = async (req, res, next) => {
    passport.authenticate('twitter')(req, res, next)
}

export const facebookAuthCallback = async (req, res, next) => {
    passport.authenticate('facebook', { session: false }, (err, user) => {
        if (err || !user) {
            return next({
                message: 'Incorrect credentials!',
                status: 401
            })
        }

        req.login(user, { session: false }, message => {
            if (message) {
                return next({
                    status: 500,
                    message
                })
            }

            res.status(200).json({
                data: {
                    user: {
                        id: user.id,
                        username: `${user.name.givenName} ${user.name.familyName}`
                    }
                },
                token: jwt.sign(
                    {
                        id: user.id,
                        username: `${user.name.givenName} ${user.name.familyName}`
                    },
                    privateKey
                )
            })
        })
    })(req, res)
}

export const facebookAuth = async (req, res, next) => {
    passport.authenticate('facebook')(req, res, next)
}


