import { Module } from '@nestjs/common';
import { InjectModule } from '@nestjs-modular/inject';
import path from 'path';

import { TasksController } from './tasks.controller';

@Module({
  imports: [
    InjectModule.forRootAsync({
      providers: {
        path: path.resolve(__dirname, './usecases'),
        includeFileNames: [/\.usecase$/],
        includeExportNames: [/UseCase$/],
      },
      exports: {
        path: path.resolve(__dirname, './usecases'),
        includeFileNames: [/\.usecase$/],
        includeExportNames: [/UseCase$/],
      },
    }),
  ],
  controllers: [
    TasksController,
  ],
})
export class TasksModule {}
