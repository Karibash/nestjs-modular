import { Injectable } from '@nestjs/common';

import { User } from '../../../domains/entities/user.entity';
import { UserRepository } from '../../../domains/repositories/user.repository';

@Injectable()
export class GetUsersUseCase {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  public async invoke(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
