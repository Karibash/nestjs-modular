import { IncomingValidatePipe } from '@nestjs-modular/validate';
import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

import { MyzodModule } from './modules/myzod/myzod.module';
import { RuntypesModule } from './modules/runtypes/runtypes.module';
import { SuperstructModule } from './modules/superstruct/superstruct.module';
import { YupModule } from './modules/yup/yup.module';
import { ZodModule } from './modules/zod/zod.module';

@Module({
  imports: [
    MyzodModule,
    RuntypesModule,
    SuperstructModule,
    YupModule,
    ZodModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: IncomingValidatePipe,
    },
  ],
})
export class AppModule {}
