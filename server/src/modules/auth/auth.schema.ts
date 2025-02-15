import { z } from 'zod';
import { userGeneric, verificationCodeSchema } from '../user/user.schema';

export const authGeneric = z.object({
  email: userGeneric.shape.email,
  password: userGeneric.shape.password,
  userAgent: z.string().optional(),
});

export const loginAuthSchema = z.object({
  body: authGeneric,
});

export const resetPasswordSchema = z.object({
  password: userGeneric.shape.password,
  verificationCode: verificationCodeSchema,
});

export type TAuthLogin = z.infer<typeof loginAuthSchema>['body'];
