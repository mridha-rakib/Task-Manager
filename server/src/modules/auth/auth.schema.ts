import { z } from 'zod';
import { userGeneric } from '../user/user.schema';

export const authGeneric = z.object({
  email: userGeneric.shape.email,
  password: userGeneric.shape.password,
  userAgent: z.string().optional(),
});

export const loginAuthSchema = z.object({
  body: authGeneric,
});
