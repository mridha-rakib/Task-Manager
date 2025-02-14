import express from 'express';
import authRouter from '../auth/auth.routes';

const rootRouter = express.Router();

const moduleRoutes = [{ path: '/auth', route: authRouter }];

moduleRoutes.forEach((route) => rootRouter.use(route.path, route.route));

export default rootRouter;
