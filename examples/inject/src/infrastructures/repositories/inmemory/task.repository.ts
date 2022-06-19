import { Task } from '../../../domains/entities/task.entity';
import { TaskRepository } from '../../../domains/repositories/task.repository';

export class InMemoryTaskRepository extends TaskRepository {
  private readonly store: Record<string, Task> = {};

  public async save(task: Task): Promise<Task> {
    this.store[task.id] = task;
    return task;
  }

  public async delete(task: Task): Promise<void> {
    delete this.store[task.id];
  }

  public async findAll(): Promise<Task[]> {
    return Object.values(this.store);
  }

  public async findById(id: Task['id']): Promise<Task> {
    return this.store[id];
  }
}

export const taskRepositoryProvider = {
  provide: TaskRepository,
  useClass: InMemoryTaskRepository,
};
