import { Global, Module } from '@nestjs/common';
import { InjectConditions, InjectModule } from '@nestjs-modular/inject';
import path from 'path';

const isMock = process.env.APP_ENV === 'mock';

const repositories: InjectConditions = {
  path: path.resolve(__dirname, `../../infrastructures/repositories/${isMock ? 'mock' : 'inmemory'}`),
  includeFileNames: [/\.repository$/],
  includeExportNames: [/RepositoryProvider$/],
};

@Global()
@Module({
  imports: [
    InjectModule.forRootAsync({
      global: true,
      providers: repositories,
      exports: repositories,
    }),
  ],
})
export class CoreModule {}
