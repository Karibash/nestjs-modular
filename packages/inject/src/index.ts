import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';
import { stat } from 'fs/promises';
import { parse } from 'path';
import { promisify } from 'util';
import glob from 'glob';

const asyncGlob = promisify(glob);

const getFilePaths = async (path: string): Promise<string[]> => {
  if (glob.hasMagic(path)) return await asyncGlob(path);

  const stats = await stat(path);
  if (stats.isDirectory()) {
    return await asyncGlob(`${path}/**/*`);
  }

  throw Error('The path must be a directory');
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

const getInjectables = async <T>(conditions?: InjectOptions<T[]>): Promise<T[]> => {
  const mergedConditions = {
    injects: [],
    includeFileNames: [],
    excludeFileNames: [/\.test$/, /\.d$/],
    includeFileExtensions: ['.js', '.ts'],
    excludeFileExtensions: [],
    includeExportNames: [],
    excludeExportNames: [],
    ...conditions,
  };

  if (!mergedConditions?.path) return mergedConditions.injects;

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

  const injectables = modules.reduce<T[]>((previous, current) => {
    if (!current || typeof current !== 'object') return previous;

    previous.push(...Object.entries(current).reduce<T[]>((previous, [key, value]) => {
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

  return [...injectables, ...mergedConditions.injects];
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

export type InjectOptions<T> = InjectConditions & {
  injects?: T;
};

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
