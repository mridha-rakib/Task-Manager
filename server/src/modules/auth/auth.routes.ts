import { Router } from 'express';
import { authController } from './auth.modules';

const authRouter: Router = Router();

authRouter.route('/register').post(authController.register);
authRouter.route('/login').post(authController.login);

export default authRouter;
