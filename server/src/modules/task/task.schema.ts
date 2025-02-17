import { z } from 'zod';

export const taskSchemaGeneric = z.object({
  user: z
    .string({ required_error: 'User id required' })
    .min(1, 'User ID is required')
    .optional(),
  title: z.string().min(1, 'Please provide a title'),
  description: z.string().default('No description'),
  dueDate: z.preprocess(
    (arg) =>
      typeof arg === 'string' || arg instanceof Date
        ? new Date(arg)
        : undefined,
    z.date().default(new Date())
  ),
  status: z.enum(['pending', 'complete']).default('pending'),
  completed: z.boolean().default(false),
});

const params = {
  params: z.object({
    id: z.string({
      required_error: 'Task Id is required',
    }),
  }),
};

export const createTaskSchema = z.object({
  body: taskSchemaGeneric,
});

export const updateTaskSchema = z.object({
  ...params,
  body: taskSchemaGeneric.partial(),
});

export const getTaskSchema = z.object({
  ...params,
});
