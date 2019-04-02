import express from 'express'
import { checkToken } from '../middlewares'
import * as UserController from '../controllers/users'

const router = express.Router()

router.get('/api/users', checkToken, UserController.getUser)
router.delete('/api/users/:id', checkToken, UserController.deleteUser)

export default router
