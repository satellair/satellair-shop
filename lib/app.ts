import type { Express } from 'express'

import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import mongoose from 'mongoose'
import passport from 'passport'

import { memberRouter } from '@routes'

import { env } from '@config'
import errorHandler from '@middlewares/error-handling'

const app: Express = express()

mongoose.connect(env.MONGODB_URI!)

app.use(logger('dev'))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(passport.initialize())

// app.use('/', router)
app.use('/member', memberRouter)
// app.use('/product', router.product)

app.use(errorHandler)

export default app
