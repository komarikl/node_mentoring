import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as TwitterStrategy } from 'passport-twitter'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { users } from './models'
import {
    defaultPort,
    FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET,
    TWITTER_CONSUMER_KEY,
    TWITTER_CONSUMER_SECRET,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET
} from './config/config.json'

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

passport.use(
    new FacebookStrategy(
        {
            clientID: FACEBOOK_APP_ID,
            clientSecret: FACEBOOK_APP_SECRET,
            callbackURL: `http://localhost:${defaultPort}/api/auth/facebook/callback`,
            profileFields: ['first_name', 'last_name', 'email']
        },
        (accessToken, refreshToken, profile, done) => (!profile ? done('Incorrect credentials!') : done(null, profile))
    )
)

passport.use(
    new TwitterStrategy(
        {
            consumerKey: TWITTER_CONSUMER_KEY,
            consumerSecret: TWITTER_CONSUMER_SECRET,
            callbackURL: `http://localhost:${defaultPort}/api/auth/twitter/callback`
        },
        (token, tokenSecret, profile, done) => (!profile ? done('Incorrect credentials!') : done(null, profile))
    )
)

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: `http://localhost:${defaultPort}/api/auth/google/callback`
        },
        (token, tokenSecret, profile, done) => (!profile ? done('Incorrect credentials!') : done(null, profile))
    )
)
