import { Module } from '@nestjs/common';
import { InjectModule } from '@nestjs-modular/inject';
import path from 'path';

import { UsersController } from './users.controller';

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
    UsersController,
  ],
})
export class UsersModule {}
