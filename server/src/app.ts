import express, {
  type Application,
  type Request,
  type Response,
  type NextFunction,
} from 'express';
import cookieParser from 'cookie-parser';
import { pinoLogger } from '@/middlewares/pino-logger';
import {
  errorHandler,
  notFountHandler,
} from './middlewares/error-handler.middleware';
import rootRouter from './modules/routes/index.route';
import env from './env';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(pinoLogger());
app.use(env.BASE_PATH, rootRouter);
app.use(errorHandler);
app.use(notFountHandler);

export default app;
