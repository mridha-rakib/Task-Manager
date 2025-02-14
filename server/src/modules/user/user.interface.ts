import { Document, Model } from 'mongoose';

import type { SchemaTimestampsConfig } from 'mongoose';

export type TDocument = Pick<Document<string>, '_id'> &
  Omit<SchemaTimestampsConfig, 'currentTime'>;

export interface IUser extends TDocument {
  name: string;
  email: string;
  isEmailVerified: boolean;
  avatar?: string;
  password: string;
  bio: string;
  role: 'user' | 'admin';
}

export interface IUserDocument extends IUser, Document<string>, IUserMethods {}
export interface IUserModel extends Model<IUserDocument> {}
export interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
}
