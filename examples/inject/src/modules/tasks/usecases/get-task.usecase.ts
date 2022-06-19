import { Injectable } from '@nestjs/common';

import { Task } from '../../../domains/entities/task.entity';
import { TaskRepository } from '../../../domains/repositories/task.repository';

@Injectable()
export class GetTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
  ) {}

  public async invoke(id: Task['id']): Promise<Task> {
    return await this.taskRepository.findById(id);
  }
}
