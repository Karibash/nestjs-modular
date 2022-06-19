import { Injectable } from '@nestjs/common';

import { Task } from '../../../domains/entities/task.entity';
import { TaskRepository } from '../../../domains/repositories/task.repository';

@Injectable()
export class GetTasksUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
  ) {}

  public async invoke(): Promise<Task[]> {
    return await this.taskRepository.findAll();
  }
}
