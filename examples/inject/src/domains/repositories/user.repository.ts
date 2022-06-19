import { User } from '../entities/user.entity';

export abstract class UserRepository {
  public abstract save(user: User): Promise<User>;
  public abstract delete(user: User): Promise<void>;
  public abstract findAll(): Promise<User[]>;
  public abstract findById(id: User['id']): Promise<User>;
}
