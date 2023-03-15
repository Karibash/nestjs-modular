import { BadRequestException, Optional } from '@nestjs/common';
import { valivali } from '@valivali/core';

import { resolverSymbol } from './internals';

import type { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import type { Resolver } from '@valivali/core';

export interface IncomingDto<T> {
  new (): T;
}

export const createIncomingDto = <T>(resolver: Resolver<T>) => {
  class Dto {
    public static [resolverSymbol] = resolver;
  }
  return Dto as unknown as IncomingDto<T>;
};

export interface IncomingValidatePipeOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exceptionFactory?: (error: unknown) => any;
}

export class IncomingValidatePipe implements PipeTransform {
  constructor(
    @Optional() private readonly options?: IncomingValidatePipeOptions,
  ) {}

  public transform(value: unknown, { metatype }: ArgumentMetadata) {
    if (!metatype) return value;
    if (!(resolverSymbol in metatype)) return value;

    const resolver = metatype[resolverSymbol] as Resolver<unknown>;
    try {
      return valivali(resolver, value);
    } catch (error) {
      if (error instanceof Error) {
        if (this.options?.exceptionFactory) {
          throw this.options?.exceptionFactory?.(error);
        }

        throw new BadRequestException('Bad Request', { cause: error });
      }

      throw error;
    }
  }
}
