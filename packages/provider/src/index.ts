import { DynamicModule, Module, Provider } from '@nestjs/common';
import { readdir } from 'fs/promises';
import { parse } from 'path';

const getFilePaths = async (path: string): Promise<string[]> => {
  const dirents = await readdir(path, { withFileTypes: true });
  const files = await Promise.all(dirents.map(dirent => {
    const result = `${path}/${dirent.name}`;
    return dirent.isDirectory() ? getFilePaths(result) : result;
  }));
  return files.flat();
};

export type ProviderModuleOptions = Pick<DynamicModule, 'global'> & {
  path: string;
  needsExport?: boolean;
  fileNameRegExp?: RegExp;
  fileExtensionRegExp?: RegExp;
  exportNameRegExp?: RegExp;
};

@Module({})
export class ProviderModule {
  static async forRootAsync({
    path,
    needsExport = false,
    fileNameRegExp = /^(?!.*\.(test|d)$).+$/,
    fileExtensionRegExp = /^\.(js|ts)$/,
    exportNameRegExp,
    ...options
  }: ProviderModuleOptions): Promise<DynamicModule> {
    const filePaths = await getFilePaths(path);

    const modules = await Promise.all(
      filePaths
        .filter(value => {
          const parsed = parse(value);
          return (
            (fileNameRegExp?.test(parsed.name) ?? true) &&
            (fileExtensionRegExp?.test(parsed.ext) ?? true)
          );
        })
        .map(value => value.replace(/\.[^/.]+$/, ''))
        .map<unknown>(async path => await import(path)),
    );

    const providers = modules.reduce<Provider[]>((previous, current) => {
      if (!current || typeof current !== 'object') return previous;

      previous.push(...Object.entries(current).reduce<Provider[]>((previous, [key, value]) => {
        if (exportNameRegExp?.test(key) ?? true) {
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
      exports: (needsExport && providers) || undefined,
    };
  }
}
