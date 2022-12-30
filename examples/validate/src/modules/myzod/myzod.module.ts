import { Module } from '@nestjs/common';

import { MyzodController } from './myzod.controller';

@Module({
  controllers: [
    MyzodController,
  ],
})
export class MyzodModule {}
