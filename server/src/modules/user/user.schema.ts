import { z } from 'zod';

export const userGeneric = z.object({
  name: z.string({ required_error: 'Name is required' }).min(1).max(255),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address' })
    .min(1)
    .max(255),
  isEmailVerified: z.boolean().default(false),
  password: z
    .string({ required_error: 'Password must be at least 6 characters long' })
    .trim()
    .min(6),
  confirmPassword: z
    .string({ required_error: 'Password must be at least 6 characters long' })
    .trim()
    .min(6),
  avatar: z
    .string({ required_error: 'Invalid URL for avatar' })
    .url()
    .optional(),
  bio: z.string().default('I am a new user.').optional(),
  role: z.enum(['user', 'admin']).default('user'),
});

export const verificationCodeSchema = z
  .string({ required_error: 'Code is required' })
  .trim()
  .min(1)
  .max(25);

export const createUserSchema = z
  .object({
    body: userGeneric.pick({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
      bio: true,
    }),
  })
  .refine((val) => val.body['password'] === val.body['confirmPassword'], {
    message: 'Password does not match',
    path: ['confirmPassword'],
  });

export const verificationEmailSchema = z.object({
  code: verificationCodeSchema,
});

export const emailSchema = z.object({
  body: userGeneric.pick({
    email: true,
  }),
});
