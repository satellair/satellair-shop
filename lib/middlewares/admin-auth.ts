import { statusCode } from '@config'

import type { ExpressControllerSync } from '@type'
import type { Member } from '@type/member'

const isAdmin: ExpressControllerSync = (req, res, next) => {
  if (!req.user) {
    return res.status(statusCode.UNAUTHORIZED).json({
      error: {
        message: 'You are not logged in. Please login first.',
      },
    })
  }
  const { role } = req.user as Member

  if (role === 'admin') {
    next()
  } else {
    return res.status(statusCode.FORBIDDEN).json({
      error: {
        message: 'Unauthorized Access',
      },
    })
  }
}

export default isAdmin
