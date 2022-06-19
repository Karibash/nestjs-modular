import { Injectable } from '@nestjs/common';

import { User } from '../../../domains/entities/user.entity';
import { UserRepository } from '../../../domains/repositories/user.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  public async invoke(id: User['id']): Promise<void> {
    const user = await this.userRepository.findById(id);
    return await this.userRepository.delete(user);
  }
}
