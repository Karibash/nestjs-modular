import { IncomingValidatePipe } from '@nestjs-modular/validate';
import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

import { TypiaModule } from './modules/typia/typia.module';

@Module({
  imports: [
    TypiaModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: IncomingValidatePipe,
    },
  ],
})
export class AppModule {}
