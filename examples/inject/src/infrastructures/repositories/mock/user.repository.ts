import { User } from '../../../domains/entities/user.entity';
import { UserRepository } from '../../../domains/repositories/user.repository';

export class MockUserRepository extends UserRepository {
  public async save(user: User): Promise<User> {
    return user;
  }

  public async delete(user: User): Promise<void> {
  }

  public async findAll(): Promise<User[]> {
    return [
      new User({ id: 'user-1', name: 'user-1' }),
      new User({ id: 'user-2', name: 'user-2' }),
    ];
  }

  public async findById(id: User['id']): Promise<User> {
    return new User({ id: id, name: id });
  }
}

export const userRepositoryProvider = {
  provide: UserRepository,
  useClass: MockUserRepository,
};
