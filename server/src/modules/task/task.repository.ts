import {
  BadRequestException,
  NotFoundException,
} from '@/common/utils/catch-errors';
import SessionModel from '@/database/models/session.model';
import TaskModel from '@/database/models/TaskModel';

export class TaskRepository {
  public async createTask({ data, sessionId }: any) {
    const { title, description, dueDate, status } = data;

    if (!title || title.trim() === '') {
      throw new BadRequestException('Title is required.');
    }
    if (!description || description.trim() === '') {
      throw new BadRequestException('Description is required.');
    }

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
}
