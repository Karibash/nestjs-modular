import { User } from '../../../domains/entities/user.entity';
import { UserRepository } from '../../../domains/repositories/user.repository';

export class InMemoryUserRepository extends UserRepository {
  private readonly store: Record<string, User> = {};

  public async save(user: User): Promise<User> {
    this.store[user.id] = user;
    return user;
  }

  public async delete(user: User): Promise<void> {
    delete this.store[user.id];
  }

  public async findAll(): Promise<User[]> {
    return Object.values(this.store);
  }

  public async findById(id: User['id']): Promise<User> {
    return this.store[id];
  }
}

export const userRepositoryProvider = {
  provide: UserRepository,
  useClass: InMemoryUserRepository,
};
