import { Module } from '@nestjs/common';

import { RuntypesController } from './runtypes.controller';

@Module({
  controllers: [
    RuntypesController,
  ],
})
export class RuntypesModule {}
