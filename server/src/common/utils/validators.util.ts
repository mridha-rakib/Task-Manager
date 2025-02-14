import { formatZodError } from '@/middlewares/error-handler.middleware';
import { type AnyZodObject, ZodError, z, ZodEffects } from 'zod';
import type { Response } from 'express';

export async function zParse<T extends AnyZodObject | ZodEffects<AnyZodObject>>(
  schema: T,
  data: any,
  res: Response
): Promise<z.infer<T>> {
  try {
    return await schema.parseAsync(data);
  } catch (error) {
    if (error instanceof ZodError) {
      throw formatZodError(res, error);
    }
    throw error;
  }
}
