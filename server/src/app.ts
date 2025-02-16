import express, {
  type Application,
  type Request,
  type Response,
  type NextFunction,
} from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { pinoLogger } from '@/middlewares/pino-logger';
import {
  errorHandler,
  notFountHandler,
} from './middlewares/error-handler.middleware';
import rootRouter from './modules/routes/index.route';
import env from './env';
import passport from '@/middlewares/passport';
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: env.APP_ORIGIN,
    credentials: true,
  })
);

app.use(passport.initialize());
app.use(pinoLogger());
app.use(env.BASE_PATH, rootRouter);
app.use(errorHandler);
app.use(notFountHandler);
app.use((req, res, next) => {
  console.error(`Content-Length: ${req.headers['content-length']}`);
  console.error(
    `Request Body Size: ${req.body ? Buffer.byteLength(JSON.stringify(req.body)) : 0}`
  );
  next();
});

export default app;
