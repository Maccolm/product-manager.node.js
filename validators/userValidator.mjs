import { body } from 'express-validator'
import { validationResult } from 'express-validator'
import fs from 'fs'

class UserValidator {
  static userValidationRules = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    body('name').not().isEmpty().withMessage('Name is required'),
  ]
  static userSchema = {
    email: {
      isEmail: {
        errorMessage: 'Invalid email address',
      },
      normalizeEmail: true, // Нормалізує email
    },
    password: {
      isLength: {
        options: { min: 3 },
        errorMessage: 'Password must be at least 3 characters long',
      },
      trim: true, // Видаляє пробіли на початку і в кінці
      escape: true, // Екранує HTML символи
    },
    username: {
      notEmpty: {
        errorMessage: 'Name is required',
      },
      isLength: {
        options: { min: 3 },
        errorMessage: 'Username must be at least 3 characters long',
      },
      trim: true, // Видаляє пробіли на початку і в кінці
      escape: true, // Екранує HTML символи
    },
  }
}

export default UserValidator