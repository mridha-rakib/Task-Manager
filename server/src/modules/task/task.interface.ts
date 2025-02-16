import { Document, Model, type AggregatePaginateModel } from 'mongoose';

import type { TDocument } from '@/common/utils/common.type';

export interface ITask extends TDocument {
  user?: string;
  title: string;
  description?: string;
  dueDate: Date;
  status: 'pending' | 'complete';
  completed?: boolean;
}

export interface ITaskDocument extends ITask, Document<string> {}
export interface ITaskModel extends Model<ITaskDocument> {}
export interface ITaskMethods extends ITaskDocument {}
export interface ITaskPaginateModel
  extends AggregatePaginateModel<ITaskDocument> {}
