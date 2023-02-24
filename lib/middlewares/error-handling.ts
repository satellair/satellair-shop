import { statusCode } from '@config'
import type { ExpressErrorHandler } from '@type'

const errorHandler: ExpressErrorHandler = (err, req, res, next) => {
  const code = err.statusCode || statusCode.INTERNAL_SERVER_ERROR
  res.status(code).json({
    status_code: code,
    message: err.message,
    validation: err.validation,
  })
}

export default errorHandler
