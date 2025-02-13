import type { CallbackWithoutResultAndOptionalError } from 'mongoose';
import type {
  IUserDocument,
  IUserMethods,
} from '@/modules/user/user.interface';

export const preSaveUserHook = async function (
  this: IUserDocument & IUserMethods,
  next: CallbackWithoutResultAndOptionalError
) {
  const user = this;
  if (!user.isModified('password') || !user.isNew) return next();
  user.password = await user.generatePasswordHash(user.password);
  return next();
};
