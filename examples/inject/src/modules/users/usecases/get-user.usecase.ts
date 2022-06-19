import { Injectable } from '@nestjs/common';

import { User } from '../../../domains/entities/user.entity';
import { UserRepository } from '../../../domains/repositories/user.repository';

@Injectable()
export class GetUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  public async invoke(id: User['id']): Promise<User> {
    return await this.userRepository.findById(id);
  }
}
