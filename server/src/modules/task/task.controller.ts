import { asyncHandler } from '@/middlewares/asyncHandler';
import type { TaskRepository } from './task.repository';
import { zParse } from '@/common/utils/validators.util';
import {
  createTaskSchema,
  getTaskSchema,
  updateTaskSchema,
} from './task.schema';
import { NotFoundException } from '@/common/utils/catch-errors';
import { HTTPSTATUS } from '@/config/http-config';

export class TaskController {
  private taskRepository: TaskRepository;
  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  public createTask = asyncHandler(async (req, res) => {
    const { body: data } = await zParse(createTaskSchema, req, res);

    const sessionId = req.sessionId;
    if (!sessionId) {
      throw new NotFoundException('Session is invalid.');
    }

    const response = await this.taskRepository.createTask({
      data,
      sessionId,
    });

    res.status(HTTPSTATUS.CREATED).json({
      message: 'Task create successfully',
      response,
    });
  });

  public getTasks = asyncHandler(async (req, res) => {
    const sessionId = req.sessionId;
    if (!sessionId) {
      throw new NotFoundException('Session is invalid.');
    }

    const tasks = await this.taskRepository.getTasks(sessionId);
    res.status(HTTPSTATUS.CREATED).json(tasks);
  });

  public updateTask = asyncHandler(async (req, res) => {
    const {
      body: data,
      params: { id: taskId },
    } = await zParse(updateTaskSchema, req, res);
    const sessionId = req.sessionId;
    if (!sessionId) {
      throw new NotFoundException('Session is invalid.');
    }

    const updatedTask = await this.taskRepository.updateTask({
      sessionId,
      taskId,
      data,
    });

    res.status(HTTPSTATUS.OK).json(updatedTask);
  });

  public getTask = asyncHandler(async (req, res) => {
    const {
      params: { id: taskId },
    } = await zParse(getTaskSchema, req, res);

    const sessionId = req.sessionId;
    if (!sessionId) {
      throw new NotFoundException('Session is invalid.');
    }

    const task = await this.taskRepository.getTask({ sessionId, taskId });
    res.status(HTTPSTATUS.OK).json(task);
  });
}
