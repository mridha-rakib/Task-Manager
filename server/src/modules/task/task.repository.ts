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
import type { PipelineStage } from 'mongoose';

interface SearchCriteria {
  dueDate?: Date;
  status?: 'pending' | 'complete';
}

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

  public async getTasks(sessionId: string, searchCriteria: SearchCriteria) {
    const session = await SessionModel.findById(sessionId)
      .populate('userId')
      .select('-expiresAt');

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    const { userId: user } = session;

    // const pipeline: PipelineStage[] = [
    //   {
    //     $match: {
    //       user: user._id,
    //       ...(filters.dueDate && { dueDate: { $gte: filters.dueDate } }),
    //       ...(filters.status && { status: filters.status }),
    //     },
    //   },
    //   {
    //     $sort: { dueDate: 1 },
    //   },
    // ];

    const searchPipeline = this.buildSearchPipeline(searchCriteria);
    searchPipeline.unshift({
      $match: {
        user: user._id,
      },
    });

    const tasks = await TaskModel.aggregate(searchPipeline);

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

  public async deleteTask({
    sessionId,
    taskId,
  }: {
    sessionId: string;
    taskId: string;
  }) {
    const session = await validateSession(sessionId);
    const { userId: user } = session;
    const user_id = user._id.toString();

    const task = await TaskModel.findById(taskId);

    await validateTask(taskId, user_id);

    const response = await TaskModel.findByIdAndDelete(taskId);
    return response;
  }

  private async buildSearchPipeline(
    criteria: SearchCriteria
  ): Promise<PipelineStage[]> {
    const pipeline: PipelineStage[] = [];

    if (criteria.dueDate) {
      pipeline.push({
        $match: {
          dueDate: criteria.dueDate,
        },
      });
    }

    if (criteria.status) {
      pipeline.push({
        $match: {
          status: criteria.status,
        },
      });
    }

    return pipeline;
  }
}
