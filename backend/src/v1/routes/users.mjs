import express from 'express'
import UserController from '../controllers/userController.mjs'
import UserValidator from '../validators/userValidator.mjs'
import { checkSchema } from 'express-validator'
import { ensureAdmin, ensureAuthenticated } from '../middleware/auth.mjs'

const router = express.Router()

router.get('/', UserController.usersList)

router.get('/register/:id?', UserController.registerForm)

router.post(
  '/register/:id?',
  ensureAuthenticated,
  ensureAdmin,
  checkSchema(UserValidator.userSchema),
  UserController.registerUser
)
router.delete('/:id', 
	ensureAuthenticated,
	ensureAdmin,
	UserController.deleteUser)

export default router