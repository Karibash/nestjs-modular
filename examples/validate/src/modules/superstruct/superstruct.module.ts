import { Module } from '@nestjs/common';

import { SuperstructController } from './superstruct.controller';

@Module({
  controllers: [
    SuperstructController,
  ],
})
export class SuperstructModule {}
