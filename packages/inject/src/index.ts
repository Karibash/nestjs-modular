import { Module } from '@nestjs/common';

import { getInjectables } from './internals';

import type { InjectOptions } from './types';
import type { DynamicModule, ModuleMetadata } from '@nestjs/common';

export * from './types';

export type InjectModuleOptions = Pick<DynamicModule, 'global'> & {
  imports?: InjectOptions<Exclude<ModuleMetadata['imports'], undefined>>;
  controllers?: InjectOptions<Exclude<ModuleMetadata['controllers'], undefined>>;
  providers?: InjectOptions<Exclude<ModuleMetadata['providers'], undefined>>;
  exports?: InjectOptions<Exclude<ModuleMetadata['exports'], undefined>>;
};

@Module({})
export class InjectModule {
  static async forRootAsync({
    global,
    imports: importsConditions,
    controllers: controllersConditions,
    providers: providersConditions,
    exports: exportsConditions,
  }: InjectModuleOptions): Promise<DynamicModule> {
    const [
      imports,
      controllers,
      providers,
      exports,
    ] = await Promise.all([
      getInjectables(importsConditions),
      getInjectables(controllersConditions),
      getInjectables(providersConditions),
      getInjectables(exportsConditions),
    ]);

    return {
      global,
      imports,
      controllers,
      providers,
      exports,
      module: InjectModule,
    };
  }
}
