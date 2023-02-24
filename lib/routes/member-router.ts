import express from 'express'
import { index, register, login } from '@controllers/member-controller'
import { loginValidate, registerValidate } from '@schemas/member-schema'

import type { Router } from 'express'

import isLogin from '@middlewares/auth-jwt'
const router: Router = express.Router()

router.get('/', [isLogin], index)
router.post('/login', loginValidate, login)
router.post('/register', registerValidate, register)

export default router
