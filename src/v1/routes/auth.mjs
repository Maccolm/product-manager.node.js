import express from 'express'
import AuthController from '../controllers/authController.mjs'
import UserController from '../controllers/userController.mjs'

const router = express.Router()

//login
router.post('/login', AuthController.login)

// logout
router.get('/logout',AuthController.logout)

router.post('/signup', UserController.signup)
export default router