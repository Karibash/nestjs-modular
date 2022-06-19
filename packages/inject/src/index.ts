import { DynamicModule, Module } from '@nestjs/common';
import { readdir } from 'fs/promises';
import { parse } from 'path';
import { Type } from '@nestjs/common/interfaces/type.interface';

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

const getInjectables = async (conditions?: InjectConditions): Promise<Type[]> => {
  const mergedConditions = {
    includeFileNames: [],
    excludeFileNames: [/\.test$/, /\.d$/],
    includeFileExtensions: ['.js', '.ts'],
    excludeFileExtensions: [],
    includeExportNames: [],
    excludeExportNames: [],
    ...conditions,
  };

  if (!mergedConditions?.path) return [];

  const filePaths = await getFilePaths(mergedConditions.path);

  const modules = await Promise.all(
    filePaths
      .filter(value => {
        const parsed = parse(value);
        return (
          someTests(parsed.name, mergedConditions.includeFileNames, true) &&
          !someTests(parsed.name, mergedConditions.excludeFileNames, false) &&
          someTests(parsed.ext, mergedConditions.includeFileExtensions, true) &&
          !someTests(parsed.ext, mergedConditions.excludeFileExtensions, false)
        );
      })
      .map(value => value.replace(/\.[^/.]+$/, ''))
      .map<unknown>(async path => await import(path)),
  );

  return modules.reduce<Type[]>((previous, current) => {
    if (!current || typeof current !== 'object') return previous;

    previous.push(...Object.entries(current).reduce<Type[]>((previous, [key, value]) => {
      if (
        someTests(key, mergedConditions.includeExportNames, true) &&
        !someTests(key, mergedConditions.excludeExportNames, false)
      ) {
        previous.push(value);
      }
      return previous;
    }, []));

    return previous;
  }, []);
};

export type InjectConditions = {
  path: string;
  includeFileNames?: Array<string | RegExp>;
  excludeFileNames?: Array<string | RegExp>;
  includeFileExtensions?: Array<string | RegExp>;
  excludeFileExtensions?: Array<string | RegExp>;
  includeExportNames?: Array<string | RegExp>;
  excludeExportNames?: Array<string | RegExp>;
};

export type InjectModuleOptions = Pick<DynamicModule, 'global'> & {
  imports?: InjectConditions;
  controllers?: InjectConditions;
  providers?: InjectConditions;
  exports?: InjectConditions;
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
