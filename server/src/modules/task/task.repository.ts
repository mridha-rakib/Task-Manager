import {
  BadRequestException,
  InternalServerException,
  NotFoundException,
  UnauthorizedException,
} from '@/common/utils/catch-errors';
import SessionModel from '@/database/models/session.model';
import TaskModel from '@/database/models/TaskModel';
import type { IUpdateTask } from './task.interface';
import mongoose from 'mongoose';
import {
  isAuthorized,
  validateSession,
  validateTask,
} from '@/common/utils/helperFn';

export class TaskRepository {
  public async createTask({ data, sessionId }: any) {
    const { title, description, dueDate, status } = data;

    const session = await SessionModel.findById(sessionId)
      .populate('userId')
      .select('-expiresAt');

    if (!session) {
      throw new NotFoundException('Session not found');
    }
    const { userId: user } = session;

    const newTask = await TaskModel.create({
      title,
      description,
      dueDate,
      status,
      user: user._id,
    });

    return {
      newTask,
    };
  }

  public async getTasks(sessionId: string) {
    const session = await SessionModel.findById(sessionId)
      .populate('userId')
      .select('-expiresAt');

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    const { userId: user } = session;
    const tasks = await TaskModel.find({ user: user._id });

    return tasks;
  }

  public async getTask({
    sessionId,
    taskId,
  }: {
    sessionId: string;
    taskId: string;
  }) {
    const session = await validateSession(sessionId);
    const { userId: user } = session;
    const user_id = user._id.toString();
    const result = await TaskModel.find({
      _id: new mongoose.Types.ObjectId(taskId),
    });

    const task = await TaskModel.findById(taskId);

    await validateTask(taskId, user_id);

    return task;
  }

  public async updateTask({ sessionId, taskId, data }: IUpdateTask) {
    const session = await validateSession(sessionId);
    const { userId: user } = session;

    const task = await TaskModel.findById(taskId);
    await validateTask(taskId, user._id.toString());

    const user_id = user._id.toString();
    const tUserId = task?.user?.toString();

    if (!isAuthorized(tUserId, user_id)) {
      throw new UnauthorizedException(
        'User not authorized to update this task'
      );
    }

    const updatedTask = await TaskModel.findByIdAndUpdate(taskId, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      throw new InternalServerException('Failed to update task');
    }

    return updatedTask;
  }
}
