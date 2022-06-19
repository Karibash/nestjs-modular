import { Task } from '../entities/task.entity';

export abstract class TaskRepository {
  public abstract save(task: Task): Promise<Task>;
  public abstract delete(task: Task): Promise<void>;
  public abstract findAll(): Promise<Task[]>;
  public abstract findById(id: Task['id']): Promise<Task>;
}
