import express from 'express';
import authRouter from '../auth/auth.routes';
import sessionRouter from '../session/session.routes';

const rootRouter = express.Router();

const moduleRoutes = [
  { path: '/auth', route: authRouter },
  {
    path: '/session',
    route: sessionRouter,
  },
];

moduleRoutes.forEach((route) => rootRouter.use(route.path, route.route));

export default rootRouter;
