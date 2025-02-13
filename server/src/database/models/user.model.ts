import { compareValue, hashValue } from '@/common/utils/bcrypt';
import { Schema, model } from 'mongoose';
import type {
  IUserDocument,
  IUserMethods,
  IUserModel,
} from '@/modules/user/user.interface';

const userSchema = new Schema<IUserDocument, IUserModel, IUserMethods>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: 'https://avatars.githubusercontent.com/u/19819005?v=4',
    },
    bio: {
      type: String,
      default: 'I am a new user.',
    },
    role: {
      type: String,
      required: true,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {},
    collation: { locale: 'en' },
  }
);

userSchema.index({ name: 'text', email: 'text' });

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hashValue(this.password);
  }
  next();
});

userSchema.methods.comparePassword = async function (password: string) {
  return compareValue(password, this.password);
};

userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.userPreferences.twoFactorSecret;
    return ret;
  },
});

const UserModel = model<IUserDocument>('User', userSchema);
export default UserModel;
