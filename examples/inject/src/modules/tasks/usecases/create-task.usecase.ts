import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { Task } from '../../../domains/entities/task.entity';
import { TaskRepository } from '../../../domains/repositories/task.repository';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
  ) {}

  public async invoke(title: string): Promise<Task> {
    return await this.taskRepository.save(new Task({
      id: randomUUID(),
      title: title,
    }));
  }
}
