import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger_output.json';
import app from '@/app';
import env from './env';
import { logger } from './middlewares/pino-logger';

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

(async () => {
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
