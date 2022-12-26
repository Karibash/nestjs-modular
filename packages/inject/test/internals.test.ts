import path from 'path';

import { describe, expect, it } from '@jest/globals';

import { getFilePaths, someTests, getInjectables } from '../src/internals';

const fixturesDirectory = path.resolve(__dirname, 'fixtures');

describe('getFilePaths', () => {
  it('absolute path', async () => {
    const paths = await getFilePaths(fixturesDirectory);

    const expected = [
      expect.stringMatching(/fixtures\/a\/ab.ts$/),
      expect.stringMatching(/fixtures\/a\/b.ts$/),
      expect.stringMatching(/fixtures\/a\/b\/abc.ts$/),
      expect.stringMatching(/fixtures\/a\/b\/c.ts$/),
      expect.stringMatching(/fixtures\/1\/2.ts$/),
    ];
    expect(paths).toEqual(expect.arrayContaining(expected));
  });

  it('glob path', async () => {
    const paths = await getFilePaths(path.resolve(fixturesDirectory, '**/a*.ts'));

    const expected = [
      expect.stringMatching(/fixtures\/a\/ab.ts$/),
      expect.stringMatching(/fixtures\/a\/b\/abc.ts$/),
    ];
    expect(paths).toEqual(expect.arrayContaining(expected));
  });

  it('file path', async () => {
    await expect(getFilePaths(path.resolve(fixturesDirectory, 'a/b.ts'))).rejects.toThrow(Error);
  });
});

describe('someTests', () => {
  it('string terms', () => {
    expect(someTests('/a/b/c', ['/a/b/c'], false)).toBe(true);
  });

  it('regex terms', () => {
    expect(someTests('/a/b/c', [/^\/a/], false)).toBe(true);
  });

  it('compound terms', () => {
    expect(someTests('/a/b/c', ['/a/b/c', /^\/a/], false)).toBe(true);
  });

  it('empty terms', () => {
    expect(someTests('', [], true)).toBe(true);
    expect(someTests('', [], false)).toBe(false);
  });
});

describe('getInjectables', () => {
  it('no options', async () => {
    const injectables = await getInjectables({
      path: fixturesDirectory,
    });

    expect(injectables).toEqual(['2', 'ab', 'b', 'abc', 'c']);
  });

  it('multiple path', async () => {
    const injectables = await getInjectables({
      path: [
        path.resolve(fixturesDirectory, '1'),
        path.resolve(fixturesDirectory, 'a'),
      ],
    });

    expect(injectables).toEqual(['2', 'ab', 'b', 'abc', 'c']);
  });

  it('with includeFileNames', async () => {
    const injectables = await getInjectables({
      path: fixturesDirectory,
      includeFileNames: ['ab'],
    });

    expect(injectables).toEqual(['ab']);
  });

  it('with excludeFileNames', async () => {
    const injectables = await getInjectables({
      path: fixturesDirectory,
      excludeFileNames: ['ab'],
    });

    expect(injectables).toEqual(['2', 'b', 'abc', 'c']);
  });

  it('with includeFileExtensions', async () => {
    const injectables = await getInjectables({
      path: fixturesDirectory,
      includeFileExtensions: ['.js'],
    });

    expect(injectables).toHaveLength(0);
  });

  it('with excludeFileExtensions', async () => {
    const injectables = await getInjectables({
      path: fixturesDirectory,
      excludeFileExtensions: ['.ts'],
    });

    expect(injectables).toHaveLength(0);
  });

  it('with includeExportNames', async () => {
    const injectables = await getInjectables({
      path: fixturesDirectory,
      includeExportNames: ['ab'],
    });

    expect(injectables).toEqual(['ab']);
  });

  it('with excludeExportNames', async () => {
    const injectables = await getInjectables({
      path: fixturesDirectory,
      excludeExportNames: ['ab'],
    });

    expect(injectables).toEqual(['2', 'b', 'abc', 'c']);
  });

  it('with injects', async () => {
    const injectables = await getInjectables({
      path: fixturesDirectory,
      injects: ['inject'],
    });

    expect(injectables).toEqual(['2', 'ab', 'b', 'abc', 'c', 'inject']);
  });
});
