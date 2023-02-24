import type { ValidationError } from 'express-validator'
interface ErrorHandler extends Error {
  statusCode?: number
  validation?: ValidationError[]
}

export { ErrorHandler }
