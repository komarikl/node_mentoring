import express from 'express'
import * as AuthController from '../api/controllers/auth';

const router = express.Router();

router.post('/api/auth', AuthController.checkCredentials);
router.post('/api/auth/passport', AuthController.passportAuth);
router.get('/api/auth/facebook', AuthController.facebookAuth);
router.get('/api/auth/facebook/callback', AuthController.facebookAuthCallback);
router.get('/api/auth/twitter', AuthController.twitterAuth);
router.get('/api/auth/twitter/callback', AuthController.twitterAuthCallback);
router.get('/api/auth/google', AuthController.googleAuth);
router.get('/api/auth/google/callback', AuthController.googleAuthCallback);

export default router
