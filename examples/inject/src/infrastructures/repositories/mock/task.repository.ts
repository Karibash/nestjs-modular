import { Task } from '../../../domains/entities/task.entity';
import { TaskRepository } from '../../../domains/repositories/task.repository';

export class MockTaskRepository extends TaskRepository {
  public async save(task: Task): Promise<Task> {
    return task;
  }

  public async delete(task: Task): Promise<void> {
  }

  public async findAll(): Promise<Task[]> {
    return [
      new Task({ id: 'task-1', title: 'task-1' }),
      new Task({ id: 'task-2', title: 'task-2' }),
    ];
  }

  public async findById(id: Task['id']): Promise<Task> {
    return new Task({ id: id, title: id });
  }
}

export const taskRepositoryProvider = {
  provide: TaskRepository,
  useClass: MockTaskRepository,
};
