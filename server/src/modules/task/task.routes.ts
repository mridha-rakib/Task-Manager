import { Router } from 'express';
import { authenticateJWT } from '@/common/jwt.strategy.ts/jwt.strategy';
import { taskController } from './task.module';

const taskRouter: Router = Router();

taskRouter.route('/create').post(authenticateJWT, taskController.createTask);

export default taskRouter;
