import express from 'express'
import UserController from '../controllers/userController.mjs'
import UserValidator from '../../../validators/userValidator.mjs'
import { checkSchema } from 'express-validator'
import { getPermissionsChecker } from '../../../middleware/auth.mjs'

const router = express.Router()
const permissionsChecker = getPermissionsChecker('users')

router.get('/', permissionsChecker('read'), UserController.usersList)
router.get(
	'/register/:id?', 
	UserController.registerForm
)

router.get('/types', UserController.getTypes)

router.post(
  '/register/:id?',
  permissionsChecker('create'),
  permissionsChecker('update'),
  checkSchema(UserValidator.userSchema),
  UserController.registerUser
)
router.delete('/:id', 
	permissionsChecker('delete'),
	UserController.deleteUser)

export default router