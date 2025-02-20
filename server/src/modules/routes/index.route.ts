import express from 'express';
import authRouter from '../auth/auth.routes';
import sessionRouter from '../session/session.routes';
import userRouter from '../user/user.routes';
import taskRouter from '../task/task.routes';
import swaggerUi from 'swagger-ui-express';
// import  from '../../swagger_output.json
const swaggerFile = require('../../swagger_output.json');

const rootRouter = express.Router();
rootRouter.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
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
