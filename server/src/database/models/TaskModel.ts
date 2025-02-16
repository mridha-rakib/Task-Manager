import { aggregatePaginatePlugin } from '@/config/paginate.config';
import type {
  ITaskDocument,
  ITaskMethods,
  ITaskModel,
  ITaskPaginateModel,
} from '@/modules/task/task.interface';
import { model, Schema } from 'mongoose';

const TaskSchema = new Schema<ITaskDocument, ITaskModel, ITaskMethods>(
  {
    user: {
      type: Schema.ObjectId as unknown as typeof Schema.Types.Mixed,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      unique: true,
    },
    description: {
      type: String,
      default: 'No description',
    },
    dueDate: {
      type: Date,
      default: Date.now(),
    },
    status: {
      type: String,
      enum: ['pending', 'complete'],
      default: 'pending',
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, collation: { locale: 'en' } }
);

TaskSchema.plugin(aggregatePaginatePlugin);

TaskSchema.index({ name: 'text', description: 'text' });

const TaskModel = model<ITaskDocument, ITaskPaginateModel>('Task', TaskSchema);

export default TaskModel;
