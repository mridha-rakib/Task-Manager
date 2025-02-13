import express, { type Application } from 'express';
import cookieParser from 'cookie-parser';
import { pinoLogger } from '@/middlewares/pino-logger';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(pinoLogger());

export default app;
