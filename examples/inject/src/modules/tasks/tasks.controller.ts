import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { CreateTaskUseCase } from './usecases/create-task.usecase';
import { DeleteTaskUseCase } from './usecases/delete-task.usecase';
import { GetTaskUseCase } from './usecases/get-task.usecase';
import { GetTasksUseCase } from './usecases/get-tasks.usecase';
import { Task } from '../../domains/entities/task.entity';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
    private readonly getTaskUseCase: GetTaskUseCase,
    private readonly getTasksUseCase: GetTasksUseCase,
  ) {}

  @Get()
  public async getTasks(): Promise<Task[]> {
    return await this.getTasksUseCase.invoke();
  }

  @Post()
  public async createTask(@Body('title') title: string): Promise<Task> {
    return await this.createTaskUseCase.invoke(title);
  }

  @Get(':id')
  public async getTask(@Param('id') id: string): Promise<Task> {
    return await this.getTaskUseCase.invoke(id);
  }

  @Delete(':id')
  public async deleteTask(@Param('id') id: string): Promise<void> {
    return await this.deleteTaskUseCase.invoke(id);
  }
}
