import { Fields } from '../../core/types';

export class Task {
  public readonly id: string;
  public readonly title: string;

  constructor(props: Fields<Task>) {
    Object.assign(this, props);
  }
}
