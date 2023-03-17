import { Module } from '@nestjs/common';

import { TypiaController } from './typia.controller';

@Module({
  controllers: [
    TypiaController,
  ],
})
export class TypiaModule {}
