import { Module } from '@nestjs/common';
import { InjectModule } from '@nestjs-modular/inject';
import path from 'path';

import { AppController } from './app.controller';

@Module({
  imports: [
    InjectModule.forRootAsync({
      path: path.resolve(__dirname, '../../services'),
      needsExport: true,
      includeFileNames: [/\.service$/],
      includeExportNames: [/Service$/],
    }),
  ],
  controllers: [
    AppController,
  ],
})
export class AppModule {}
