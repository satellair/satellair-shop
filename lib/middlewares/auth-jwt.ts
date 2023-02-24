import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

import { env } from '@config'
import Member from '@models/member-model'

import type { AuthenticateCallback } from 'passport'
import type { JwtPayload } from 'jsonwebtoken'
import type { StrategyOptions, VerifiedCallback } from 'passport-jwt'

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.JWT_SECRET,
}

passport.use(
  new JwtStrategy(opts, async (jwt_payload: JwtPayload, done: VerifiedCallback) => {
    try {
      const user = await Member.findById(jwt_payload.id)

      if (!user) {
        return done(new Error('Member not found'), false)
      }

      return done(null, user)
    } catch (error: unknown) {
      done(error)
    }
  })
)

const isLogin: AuthenticateCallback = passport.authenticate('jwt', {
  session: false,
})

export default isLogin
