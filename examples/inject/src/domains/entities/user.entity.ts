import { Fields } from '../../core/types';

export class User {
  public readonly id: string;
  public readonly name: string;

  constructor(props: Fields<User>) {
    Object.assign(this, props);
  }
}
