import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

import { env, statusCode } from '@config'
import Member from '@models/member-model'
import { capitalize } from '@utils'

import type { JwtPayload } from 'jsonwebtoken'
import type { Result, ValidationError } from 'express-validator'
import type { ExpressController, ExpressControllerSync, ErrorHandler } from '@type'
import type { MemberDocument, MemberModel } from '@type/member'

const index: ExpressControllerSync = (req, res, next) => {
  const { role, fname, lname, tel, email } = req.user as MemberDocument
  res.status(200).json({
    message: `Welcome, ${capitalize(fname)} ${capitalize(lname)}!`,
    profile: { email, fname, lname, tel, role },
  })
}

const login: ExpressController = async (req, res, next) => {
  try {
    const { username, password } = req.body as MemberDocument

    // validation
    const errors: Result<ValidationError> = validationResult(req)
    if (!errors.isEmpty()) {
      const err: ErrorHandler = new Error('Input is incorrect')
      err.statusCode = statusCode.UNPROCESSABLE_ENTITY
      err.validation = errors.array()
      throw err
    }

    // check username exist
    const member = await Member.findOne({ username: username })
    if (!member) {
      const error: ErrorHandler = new Error('Incorrect username')
      error.statusCode = statusCode.NOT_FOUND
      throw error
    }

    const isValid = member.checkPassword(password)
    if (!isValid) {
      const error: ErrorHandler = new Error('Incorrect password')
      error.statusCode = statusCode.UNAUTHORIZED
      throw error
    }

    const token: string = jwt.sign(
      {
        id: member._id,
        role: member.role,
      },
      env.JWT_SECRET,
      {
        expiresIn: '5 days',
      }
    )

    const expires_in = jwt.decode(token) as JwtPayload

    res.status(statusCode.OK).json({
      access_token: token,
      expires_in: expires_in.exp,
      token_type: 'Bearer',
    })
  } catch (error) {
    next(error)
  }
}

const register: ExpressController = async (req, res, next) => {
  const body = req.body as MemberModel
  try {
    const errors: Result<ValidationError> = validationResult(req)
    if (!errors.isEmpty()) {
      const err: ErrorHandler = new Error('Input is incorrect')
      err.statusCode = statusCode.UNPROCESSABLE_ENTITY
      err.validation = errors.array()
      throw err
    }

    const existEmail = await Member.findOne({ email: body.email })
    if (existEmail) {
      const err: ErrorHandler = new Error('Email already exists')
      err.statusCode = statusCode.CONFLICT
      throw err
    }

    const existUsername = await Member.findOne({ username: body.username })
    if (existUsername) {
      const err: ErrorHandler = new Error('Username already exists')
      err.statusCode = statusCode.CONFLICT
      throw err
    }

    let member = new Member(body)
    member.password = member.encryptPassword(body.password)
    await member.save()

    res.status(statusCode.CREATED).json({
      message: 'Register member successfully',
    })
  } catch (err) {
    next(err)
  }
}

export { index, register, login }
