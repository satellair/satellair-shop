import express from 'express'
// import { index, register, login } from '@controllers/product-controller'
// import { loginValidate, registerValidate } from '@schemas/product-schema'

import type { Router } from 'express'

import isLogin from '@middlewares/auth-jwt'
import isAdmin from '@middlewares/admin-auth'

const router: Router = express.Router()

// router.get('/', [isLogin], index)
// router.post('/detail/:id', loginValidate, login)
// router.post('/', registerValidate, register)
export default router