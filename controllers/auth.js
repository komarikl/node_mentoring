import passport from 'passport'
import jwt from 'jsonwebtoken'
import { privateKey } from '../config/config.json'
import Users from '../models/users'

export const checkCredentials = async (req, res, next) => {
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
                    privateKey
                )
            })
        })
        .catch(err => console.log(err))
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
