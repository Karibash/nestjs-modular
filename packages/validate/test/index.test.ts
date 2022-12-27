import { describe, expect, it } from '@jest/globals';

import { createIncomingDto, IncomingValidatePipe } from '../src';
import { resolverSymbol } from '../src/internals';

import type { Resolver } from '@valivali/core';

const stringResolver: Resolver<string> = value => {
  if (typeof value === 'string') return value;
  throw Error('invalid value');
};

describe('createIncomingDto', () => {
  it('A class holding the resolver is generated', () => {
    const dto = createIncomingDto(stringResolver);

    expect(resolverSymbol in dto).toBe(true);
    // @ts-ignore
    expect(dto[resolverSymbol]).toBe(stringResolver);
  });
});

describe('IncomingValidatePipe', () => {
  it('Pass valid value', () => {
    const pipe = new IncomingValidatePipe();
    const dto = createIncomingDto(stringResolver);

    const value = pipe.transform('string', { type: 'custom', metatype: dto });
    expect(value).toBe('string');
  });

  it('Pass invalid value', () => {
    const pipe = new IncomingValidatePipe();
    const dto = createIncomingDto(stringResolver);

    expect(() => pipe.transform(0, { type: 'custom', metatype: dto })).toThrow();
  });

  it('Override exceptionFactory', () => {
    const pipe = new IncomingValidatePipe({ exceptionFactory: () => 'error' });
    const dto = createIncomingDto(stringResolver);

    expect(() => pipe.transform(0, { type: 'custom', metatype: dto })).toThrow('error');
  });
});
