import express from 'express'
import UserController from '../controllers/userController.mjs'
import UserValidator from '../../../validators/userValidator.mjs'
import { checkSchema } from 'express-validator'
import {ensureAdmin, checkAdminWithJWTToken} from '../../../middleware/ensureAdmin.mjs'

const router = express.Router()

router.get('/', UserController.usersList)

router.get(
	'/register/:id?', 
	ensureAdmin, 
	UserController.registerForm
)

router.get('/types', UserController.getTypes)

router.post(
  '/register/:id?',
  ensureAdmin,
  checkSchema(UserValidator.userSchema),
  UserController.registerUser
)
router.delete('/:id', 
	ensureAdmin,
	UserController.deleteUser)

export default router