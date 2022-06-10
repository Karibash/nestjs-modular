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

const someTests = (value: string, terms: Array<string | RegExp>, _default: boolean): boolean => {
  if (terms.length <= 0) return _default;
  return terms.some(term => {
    if (typeof term === 'string') {
      return term === value;
    }
    return term.test(value);
  });
};

export type ProviderModuleOptions = Pick<DynamicModule, 'global'> & {
  path: string;
  needsExport?: boolean;
  includeFileNames?: Array<string | RegExp>;
  excludeFileNames?: Array<string | RegExp>;
  includeFileExtensions?: Array<string | RegExp>;
  excludeFileExtensions?: Array<string | RegExp>;
  includeExportNames?: Array<string | RegExp>;
  excludeExportNames?: Array<string | RegExp>;
};

@Module({})
export class ProviderModule {
  static async forRootAsync({
    path,
    global = false,
    needsExport = false,
    includeFileNames = [],
    excludeFileNames = [/\.test$/, /\.d$/],
    includeFileExtensions = ['.js', '.ts'],
    excludeFileExtensions = [],
    includeExportNames = [],
    excludeExportNames = [],
  }: ProviderModuleOptions): Promise<DynamicModule> {
    const filePaths = await getFilePaths(path);

    const modules = await Promise.all(
      filePaths
        .filter(value => {
          const parsed = parse(value);
          return (
            someTests(parsed.name, includeFileNames, true) &&
            !someTests(parsed.name, excludeFileNames, false) &&
            someTests(parsed.ext, includeFileExtensions, true) &&
            !someTests(parsed.ext, excludeFileExtensions, false)
          );
        })
        .map(value => value.replace(/\.[^/.]+$/, ''))
        .map<unknown>(async path => await import(path)),
    );

    const providers = modules.reduce<Provider[]>((previous, current) => {
      if (!current || typeof current !== 'object') return previous;

      previous.push(...Object.entries(current).reduce<Provider[]>((previous, [key, value]) => {
        if (
          someTests(key, includeExportNames, true) &&
          !someTests(key, excludeExportNames, false)
        ) {
          previous.push(value);
        }
        return previous;
      }, []));

      return previous;
    }, []);

    return {
      global,
      module: ProviderModule,
      providers: providers,
      exports: (needsExport && providers) || undefined,
    };
  }
}
