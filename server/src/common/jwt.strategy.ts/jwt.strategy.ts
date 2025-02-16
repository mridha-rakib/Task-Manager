import passport, { type PassportStatic } from 'passport';
import {
  ExtractJwt,
  Strategy as JwtStrategy,
  type StrategyOptionsWithRequest,
} from 'passport-jwt';
import { UnauthorizedException } from '../utils/catch-errors';
import env from '@/env';
import { userController, userRepository } from '@/modules/user/user.module';

interface JwtPayload {
  userId: string;
  sessionId: string;
}

const options: StrategyOptionsWithRequest = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => {
      const accessToken = req.cookies.accessToken;
      if (!accessToken) {
        throw new UnauthorizedException('Unauthorized access token');
      }

      return accessToken;
    },
  ]),
  secretOrKey: env.JWT_SECRET,
  audience: ['user'],
  algorithms: ['HS256'],
  passReqToCallback: true,
};

export const setupJwtStrategy = (passport: PassportStatic) => {
  passport.use(
    new JwtStrategy(options, async (req, payload: JwtPayload, done) => {
      try {
        const user = await userRepository.findUserById(payload.userId);
        console.log(user);
        if (!user) {
          return done(null, false);
        }

        req.sessionId = payload.sessionId;
        console.log('SessionID: ', req.sessionId);
        console.log('User: ', user);
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    })
  );
};

export const authenticateJWT = passport.authenticate('jwt', { session: false });
