import path from 'path';

import { describe, expect, it } from '@jest/globals';

import { getFilePaths } from '../src/internals';

const fixturesDirectory = path.resolve(__dirname, 'fixtures');

describe('getFilePaths', () => {
  it('absolute path', async () => {
    const paths = await getFilePaths(fixturesDirectory);

    const expected = [
      expect.stringMatching(/fixtures\/a\/b.js$/),
      expect.stringMatching(/fixtures\/a\/b.ts$/),
      expect.stringMatching(/fixtures\/a\/b\/c.js$/),
      expect.stringMatching(/fixtures\/a\/b\/c.ts$/),
    ];
    expect(paths).toEqual(expect.arrayContaining(expected));
  });

  it('glob path', async () => {
    const paths = await getFilePaths(path.resolve(fixturesDirectory, '**/*.ts'));

    const expected = [
      expect.stringMatching(/fixtures\/a\/b.ts$/),
      expect.stringMatching(/fixtures\/a\/b\/c.ts$/),
    ];
    expect(paths).toEqual(expect.arrayContaining(expected));
  });

  it('file path', async () => {
    await expect(getFilePaths(path.resolve(fixturesDirectory, 'a/b.ts'))).rejects.toThrow(Error);
  });
});
