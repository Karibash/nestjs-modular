import { stat } from 'fs/promises';
import { parse } from 'path';
import { promisify } from 'util';

import glob from 'glob';

import type { InjectOptions } from './types';

const asyncGlob = promisify(glob);

export const getFilePaths = async (path: string): Promise<string[]> => {
  if (glob.hasMagic(path)) return await asyncGlob(path);

  const stats = await stat(path);
  if (stats.isDirectory()) {
    return await asyncGlob(`${path}/**/*`);
  }

  throw Error('The path must be a directory');
};

export const someTests = (value: string, terms: Array<string | RegExp>, _default: boolean): boolean => {
  if (terms.length <= 0) return _default;
  return terms.some(term => {
    if (typeof term === 'string') {
      return term === value;
    }
    return term.test(value);
  });
};

export const getInjectables = async <T>(conditions?: InjectOptions<T[]>): Promise<T[]> => {
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

  const filePaths = typeof mergedConditions.path === 'string'
    ? await getFilePaths(mergedConditions.path)
    : await Promise.all(mergedConditions.path.map(async path => await getFilePaths(path))).then(paths => paths.flat());

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
        previous.push(value as T);
      }
      return previous;
    }, []));

    return previous;
  }, []);

  return [...injectables, ...mergedConditions.injects];
};
