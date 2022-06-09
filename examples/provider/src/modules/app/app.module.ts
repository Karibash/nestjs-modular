import { Module } from '@nestjs/common';
import { ProviderModule } from '@nestjs-modular/provider';
import path from 'path';

import { AppController } from './app.controller';

@Module({
  imports: [
    ProviderModule.forRootAsync({
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
