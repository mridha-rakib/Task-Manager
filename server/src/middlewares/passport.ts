import { setupJwtStrategy } from '@/common/jwt.strategy.ts/jwt.strategy';
import passport from 'passport';

const intializePassport = () => {
  setupJwtStrategy(passport);
};

intializePassport();
export default passport;
