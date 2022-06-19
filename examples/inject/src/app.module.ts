import { Module } from '@nestjs/common';
import { InjectModule } from '@nestjs-modular/inject';
import path from 'path';

@Module({
  imports: [
    InjectModule.forRootAsync({
      imports: {
        path: path.resolve(__dirname, './modules'),
        includeFileNames: [/\.module$/],
        includeExportNames: [/Module$/],
      },
    }),
  ],
})
export class AppModule {}
