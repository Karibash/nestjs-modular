import { Injectable } from '@nestjs/common';

import { Task } from '../../../domains/entities/task.entity';
import { TaskRepository } from '../../../domains/repositories/task.repository';

@Injectable()
export class DeleteTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
  ) {}

  public async invoke(id: Task['id']): Promise<void> {
    const task = await this.taskRepository.findById(id);
    return await this.taskRepository.delete(task);
  }
}
