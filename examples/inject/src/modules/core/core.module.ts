import { Global, Module } from '@nestjs/common';
import { InjectModule } from '@nestjs-modular/inject';
import path from 'path';

const isMock = process.env.APP_ENV === 'mock';
const repositoryType = isMock ? 'mock' : 'inmemory';

@Global()
@Module({
  imports: [
    InjectModule.forRootAsync({
      global: true,
      providers: {
        path: path.resolve(__dirname, `../../infrastructures/repositories/${repositoryType}`),
        includeFileNames: [/\.repository$/],
        includeExportNames: [/RepositoryProvider$/],
      },
      exports: {
        path: path.resolve(__dirname, `../../infrastructures/repositories/${repositoryType}`),
        includeFileNames: [/\.repository$/],
        includeExportNames: [/RepositoryProvider$/],
      },
    }),
  ],
})
export class CoreModule {}
