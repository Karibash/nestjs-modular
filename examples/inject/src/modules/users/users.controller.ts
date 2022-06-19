import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { CreateUserUseCase } from './usecases/create-user.usecase';
import { DeleteUserUseCase } from './usecases/delete-user.usecase';
import { GetUserUseCase } from './usecases/get-user.usecase';
import { GetUsersUseCase } from './usecases/get-users.usecase';
import { User } from '../../domains/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly getUsersUseCase: GetUsersUseCase,
  ) {}

  @Get()
  public async getUsers(): Promise<User[]> {
    return await this.getUsersUseCase.invoke();
  }

  @Post()
  public async createUser(@Body('title') title: string): Promise<User> {
    return await this.createUserUseCase.invoke(title);
  }

  @Get(':id')
  public async getUser(@Param('id') id: string): Promise<User> {
    return await this.getUserUseCase.invoke(id);
  }

  @Delete(':id')
  public async deleteUser(@Param('id') id: string): Promise<void> {
    return await this.deleteUserUseCase.invoke(id);
  }
}
