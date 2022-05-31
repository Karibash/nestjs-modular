import { DynamicModule, Module, Provider } from '@nestjs/common';
import fs from 'fs/promises';

export type ProviderModuleOptions = Pick<DynamicModule, 'global'> & {
  path: string;
  needsExport?: boolean;
  fileNameRegExp?: RegExp;
  exportNameRegExp?: RegExp;
};

@Module({})
export class ProviderModule {
  static async forRootAsync(options: ProviderModuleOptions): Promise<DynamicModule> {
    const fileNames = await fs.readdir(options.path);

    const modules = await Promise.all(
      fileNames
        .filter(name => options.fileNameRegExp?.test(name) ?? true)
        .map(name => `${options.path}/${name.replace(/.(js|ts)$/, '')}`)
        .map<unknown>(async path => await import(path)),
    );

    const providers = modules.reduce<Provider[]>((previous, current) => {
      if (!current || typeof current !== 'object') return previous;

      previous.push(...Object.entries(current).reduce<Provider[]>((previous, [key, value]) => {
        if (options.exportNameRegExp?.test(key) ?? true) {
          previous.push(value);
        }
        return previous;
      }, []));

      return previous;
    }, []);

    return {
      ...options,
      module: ProviderModule,
      providers: providers,
      exports: ((options.needsExport ?? false) && providers) || undefined,
    };
  }
}
