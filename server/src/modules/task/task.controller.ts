import { asyncHandler } from '@/middlewares/asyncHandler';
import type { TaskRepository } from './task.repository';
import { zParse } from '@/common/utils/validators.util';
import { createTaskSchema } from './task.schema';
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
    console.log(response);

    res.status(HTTPSTATUS.CREATED).json({
      message: 'Task create successfully',
      response,
    });
  });
}
