import { Module } from '@nestjs/common';

import { YupController } from './yup.controller';

@Module({
  controllers: [
    YupController,
  ],
})
export class YupModule {}
