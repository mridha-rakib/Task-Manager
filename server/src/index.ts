import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger-output.json';
import app from '@/app';
import env from './env';
import { logger } from './middlewares/pino-logger';
import { connectDB } from './database/database.conn';

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

(async () => {
  await connectDB();
  app.listen(env.PORT, () => {
    logger.info(`Server running on port ${env.PORT}`);
  });

  app.on('error', (error) => {
    logger.error(`❌ Server error: ${error}`);
  });

  process.on('unhandledRejection', (error) => {
    logger.error(`❌ Unhandled rejection: ${error}`);
  });

  process.on('uncaughtException', (error) => {
    logger.error(`❌ Uncaught exception: ${error}`);
  });

  process.on('exit', () => {
    logger.warn('👋 Bye bye!');
  });

  process.on('SIGINT', () => {
    logger.warn('👋 Bye bye!');
  });

  process.on('SIGTERM', () => {
    logger.warn('👋 Bye bye!');
  });
})();
