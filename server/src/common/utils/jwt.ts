import type { SessionDocument } from '@/database/models/session.model';
import env from '@/env';
import type { IUserDocument } from '@/modules/user/user.interface';
import jwt, { type SignOptions, type VerifyOptions } from 'jsonwebtoken';

export type AccessTPayload = {
  userId: IUserDocument['_id'];
  sessionId: SessionDocument['_id'];
};

export type RefreshTPayload = {
  sessionId: SessionDocument['_id'];
};

type SignOptsAndSecret = SignOptions & {
  secret: string;
};

const defaults: SignOptions = {
  audience: ['user'],
};

export const accessTokenSignOptions: SignOptsAndSecret = {
  expiresIn: env.JWT_EXPIRES_IN,
  secret: env.JWT_SECRET,
};

export const refreshTokenSignOptions: SignOptsAndSecret = {
  expiresIn: env.JWT_EXPIRES_IN,
  secret: env.JWT_SECRET,
};

export const signJwtToken = (
  payload: AccessTPayload | RefreshTPayload,
  options?: SignOptsAndSecret
) => {
  const { secret, ...opts } = options || accessTokenSignOptions;
  return jwt.sign(payload, secret, {
    ...defaults,
    ...opts,
  });
};
