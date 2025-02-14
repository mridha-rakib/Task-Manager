import type { VerificationEnum } from '@/common/enums/verification-code.enum';
import { generateUniqueCode } from '@/common/utils/uuid';
import mongoose, { Schema, model } from 'mongoose';

import type { TDocument } from '@/modules/user/user.interface';

export interface VerificationCodeDocument extends TDocument {
  userId: mongoose.Types.ObjectId;
  code: string;
  type: VerificationEnum;
  expiresAt: Date;
}

const verificationCodeSchema = new Schema<VerificationCodeDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true,
  },
  code: {
    type: String,
    unique: true,
    required: true,
    default: generateUniqueCode,
  },
  type: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

const VerificationCodeModel = mongoose.model<VerificationCodeDocument>(
  'VerificationCode',
  verificationCodeSchema,
  'verification_codes'
);

export default VerificationCodeModel;
