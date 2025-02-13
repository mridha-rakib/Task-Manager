import env from '@/env';
import mongoose from 'mongoose';
import { logger } from '@/middlewares/pino-logger';

const connectDB = async (retries = 3, retryDelay = 5000) => {
  if (!env.DATABASE_URL) {
    logger.error('DATABASE_URL is not defined in the environment variables.');
    process.exit(1);
  }
  let attempt = 0;

  const connectWithRetry = async () => {
    try {
      await mongoose.connect(env.DATABASE_URL);
      logger.info('Connected to MongoDB database');
    } catch (error) {
      attempt++;

      if (attempt < retries) {
        logger.warn(
          `Attempt ${attempt} failed. Retrying in ${retryDelay / 1000} seconds...`
        );
        setTimeout(connectWithRetry, retryDelay);
      } else {
        logger.error('Error connecting to MongoDB database:', error);
        process.exit(1);
      }
    }
  };

  mongoose.connection.on('connected', () => {
    logger.info('Mongoose connected to DB');
  });

  mongoose.connection.on('error', (err) => {
    logger.error(`Mongoose connection error: ${err}`);
  });

  mongoose.connection.on('disconnected', () => {
    logger.warn('Mongoose disconnected from DB');
  });

  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    logger.info('Mongoose connection closed due to app termination');
    process.exit(0);
  });

  await connectWithRetry();
};

export { connectDB };
