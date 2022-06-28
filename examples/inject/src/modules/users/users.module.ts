import { Module } from '@nestjs/common';
import { InjectConditions, InjectModule } from '@nestjs-modular/inject';
import path from 'path';

import { UsersController } from './users.controller';

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
    UsersController,
  ],
})
export class UsersModule {}
