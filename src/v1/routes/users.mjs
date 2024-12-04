import express from 'express'
import UserController from '../controllers/userController.mjs'
import UserValidator from '../../../validators/userValidator.mjs'
import { checkSchema } from 'express-validator'

const router = express.Router()

router.get('/', UserController.usersList)

router.get('/register/:id?', UserController.registerForm)

router.get('/types', UserController.getTypes)

router.post(
  '/register/:id?',
  checkSchema(UserValidator.userSchema),
  UserController.registerUser
)
router.delete('/:id', 
	UserController.deleteUser)

export default router