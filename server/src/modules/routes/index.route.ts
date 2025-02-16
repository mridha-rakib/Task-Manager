import express from 'express';
import authRouter from '../auth/auth.routes';
import sessionRouter from '../session/session.routes';
import userRouter from '../user/user.routes';
import taskRouter from '../task/task.routes';

const rootRouter = express.Router();

const moduleRoutes = [
  { path: '/auth', route: authRouter },
  {
    path: '/session',
    route: sessionRouter,
  },
  {
    path: '/user',
    route: userRouter,
  },
  {
    path: '/task',
    route: taskRouter,
  },
];

moduleRoutes.forEach((route) => rootRouter.use(route.path, route.route));

export default rootRouter;
