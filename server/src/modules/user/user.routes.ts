import { Router } from 'express';
import { authenticateJWT } from '@/common/jwt.strategy.ts/jwt.strategy';
import { userController } from './user.module';

const userRouter: Router = Router();

userRouter.route('/').get(authenticateJWT, userController.findUser);

export default userRouter;
