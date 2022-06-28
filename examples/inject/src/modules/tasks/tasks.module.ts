import { Module } from '@nestjs/common';
import { InjectConditions, InjectModule } from '@nestjs-modular/inject';
import path from 'path';

import { TasksController } from './tasks.controller';

const useCases: InjectConditions = {
  path: path.resolve(__dirname, './usecases'),
  includeFileNames: [/\.usecase$/],
  includeExportNames: [/UseCase$/],
};

@Module({
  imports: [
    InjectModule.forRootAsync({
      providers: useCases,
      exports: useCases,
    }),
  ],
  controllers: [
    TasksController,
  ],
})
export class TasksModule {}
