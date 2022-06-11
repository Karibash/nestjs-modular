import { Injectable } from '@nestjs/common';

@Injectable()
export class FooService {
  public invoke(): string {
    return 'FooService';
  }
}
