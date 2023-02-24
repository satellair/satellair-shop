import { checkSchema } from 'express-validator'
import type { Schema } from 'express-validator'
import { TEL_REGEX } from '@utils/validate-pattern'

const memberLoginSchema: Schema = {
  username: {
    notEmpty: {
      errorMessage: 'Please enter your username',
    },
  },
  password: {
    notEmpty: {
      errorMessage: 'Please enter your password',
    },
    isLength: {
      errorMessage: 'Password must be at least 8 characters',
      options: { min: 8 },
    },
  },
}

const memberRegisterSchema: Schema = {
  fname: {
    notEmpty: {
      errorMessage: 'Please enter your first name',
    },
  },
  lname: {
    notEmpty: {
      errorMessage: 'Please enter your last name',
    },
  },
  username: {
    notEmpty: {
      errorMessage: 'Please enter your username',
    },
  },
  email: {
    notEmpty: {
      errorMessage: 'Please enter your email',
    },
    isEmail: {
      errorMessage: 'Invalid email format',
    },
  },
  password: {
    notEmpty: {
      errorMessage: 'Please enter your password',
    },
    isLength: {
      errorMessage: 'Password must be at least 8 characters',
      options: { min: 8 },
    },
  },
  tel: {
    notEmpty: {
      errorMessage: 'Please enter your phone number',
    },
    isLength: {
      errorMessage: 'Phone number must be 10 characters',
      options: { min: 10, max: 10 },
    },
    matches: {
      errorMessage: 'Invalid phone number',
      options: TEL_REGEX,
    },
  },
}

const loginValidate = checkSchema(memberLoginSchema)
const registerValidate = checkSchema(memberRegisterSchema)

export { loginValidate, registerValidate }
