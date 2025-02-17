import { Router } from 'express';
import { authenticateJWT } from '@/common/jwt.strategy.ts/jwt.strategy';
import { taskController } from './task.module';

const taskRouter: Router = Router();

taskRouter.route('/create').post(authenticateJWT, taskController.createTask);
taskRouter.route('/').post(authenticateJWT, taskController.getTasks);
taskRouter.route('/:id').put(authenticateJWT, taskController.updateTask);
taskRouter.route('/:id').post(authenticateJWT, taskController.getTask);

export default taskRouter;
