import { Injectable } from '@nestjs/common';

@Injectable()
export class BazService {
  public invoke(): string {
    return 'BazService';
  }
}
