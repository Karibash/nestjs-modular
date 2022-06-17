import { Module } from '@nestjs/common';
import { InjectModule } from '@nestjs-modular/inject';
import path from 'path';

import { AppController } from './app.controller';

@Module({
  imports: [
    InjectModule.forRootAsync({
      providers: {
        path: path.resolve(__dirname, '../../services'),
        includeFileNames: [/\.service$/],
        includeExportNames: [/Service$/],
      },
      exports: {
        path: path.resolve(__dirname, '../../services'),
        includeFileNames: [/\.service$/],
        includeExportNames: [/Service$/],
      },
    }),
  ],
  controllers: [
    AppController,
  ],
})
export class AppModule {}
