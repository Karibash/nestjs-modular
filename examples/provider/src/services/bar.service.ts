import { Injectable } from '@nestjs/common';

@Injectable()
export class BarService {
  public invoke(): string {
    return 'BarService';
  }
}
