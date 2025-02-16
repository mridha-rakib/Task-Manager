import type { SessionDocument } from '@/database/models/session.model';
import env from '@/env';
import type { IUserDocument } from '@/modules/user/user.interface';
import jwt, { type SignOptions, type VerifyOptions } from 'jsonwebtoken';
import { calculateExpirationDate } from './date-time';

const expiresIn = env.JWT_EXPIRES_IN;
const jwtExpire = calculateExpirationDate(expiresIn);
const jwtAcsTimeStamp = new Date(jwtExpire).getTime();

const jwtRefreshExpiresIn = env.JWT_REFRESH_EXPIRES_IN;
const jwtRefreshExp = calculateExpirationDate(jwtRefreshExpiresIn);
const jwtRefreshTimeStamp = new Date(jwtRefreshExp).getTime();

console.log(jwtExpire, jwtRefreshExp);
export type AccessTPayload = {
  userId: Extract<IUserDocument['_id'], string>;
  sessionId: Extract<SessionDocument['_id'], string>;
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
  expiresIn: jwtAcsTimeStamp,
  secret: env.JWT_SECRET,
};

export const refreshTokenSignOptions: SignOptsAndSecret = {
  expiresIn: jwtRefreshTimeStamp,
  secret: env.JWT_REFRESH_SECRET,
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

export const verifyJwtToken = <TPayload extends object = AccessTPayload>(
  token: string,
  options?: VerifyOptions & { secret: string }
) => {
  try {
    const { secret = env.JWT_SECRET, ...opts } = options || {};
    console.log(opts);
    const payload = jwt.verify(token, secret, {
      ...defaults,
      ...opts,
    }) as TPayload;
    return { payload };
  } catch (err: any) {
    return {
      error: err.message,
    };
  }
};
