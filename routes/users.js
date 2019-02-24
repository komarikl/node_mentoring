import express from 'express'
import * as UserController from '../controllers/users'

const router = express.Router()

router.get('/api/users', UserController.getUser)

export default router
