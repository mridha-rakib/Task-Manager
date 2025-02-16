import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
  },
  shared: {
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),
    PORT: z.coerce.number().default(5050),
    BASE_PATH: z.string().default('/api/v1'),
    APP_ORIGIN: z.string().url(),
    RESEND_API_KEY: z.string(),
    JWT_EXPIRES_IN: z.string().default('15m'),
    JWT_SECRET: z.string(),
    JWT_REFRESH_SECRET: z.string(),
    JWT_REFRESH_EXPIRES_IN: z.string().default('30d'),
    MAILER_SENDER: z.string(),
    LOG_LEVEL: z
      .enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'])
      .default('info'),
  },
  runtimeEnv: process.env,
});

export default env;
