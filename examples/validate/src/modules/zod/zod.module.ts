import { Module } from '@nestjs/common';

import { ZodController } from './zod.controller';

@Module({
  controllers: [
    ZodController,
  ],
})
export class ZodModule {}
