import express from 'express';

const rootRouter = express.Router();

const moduleRoutes = [{ path: '/auth', route: '' }];

moduleRoutes.forEach((route) => rootRouter.use(route.path, route.router));
