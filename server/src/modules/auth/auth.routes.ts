import { Router } from 'express';
import { authController } from './auth.module';
import { authenticateJWT } from '@/common/jwt.strategy.ts/jwt.strategy';

const authRouter: Router = Router();

authRouter.route('/register').post(authController.register);
authRouter.route('/login').post(authController.login);
authRouter.route('/verify/email').post(authController.verifyEmail);
authRouter.route('/password/forgot').post(authController.forgotPassword);
authRouter.route('/password/reset').post(authController.resetPassword);
authRouter.route('/logout').post(authenticateJWT, authController.logout);
authRouter.route('/refresh').post(authController.refreshToken);

export default authRouter;
