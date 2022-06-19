import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { User } from '../../../domains/entities/user.entity';
import { UserRepository } from '../../../domains/repositories/user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  public async invoke(name: string): Promise<User> {
    return await this.userRepository.save(new User({
      id: randomUUID(),
      name: name
    }));
  }
}
