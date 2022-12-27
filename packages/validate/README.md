# @nestjs-modular/validate

[![npm version][npm-version-badge]][npm-version-link]
[![codecov][coverage-badge]][coverage-link]
[![license][license-badge]][license-link]
[![Github][github-follower-badge]][github-follower-link]
[![Twitter][twitter-follower-badge]][twitter-follower-link]

This module provides a pipe to validate incoming requests using schema validation such as Zod or Yup.

This simplifies validation of incoming requests.

## 🗒 Examples

- [REST API Server](../../examples/validate)

## 🚀 Installation

```
$ npm install @nestjs-modular/validate
```

Install the schema validation library of your choice.
The following is an example of using zod.

```
$ npm install @valivali/zod zod
```

## 👏 Getting Started

The following is a simple example of using zod.

```ts
import { createIncomingDto } from '@nestjs-modular/validate';
import { Body, Controller, Param, Post } from '@nestjs/common';
import { resolver } from '@valivali/zod';
import { z } from 'zod';

class ParamDto extends createIncomingDto(resolver(z.object({
  id: z.string(),
}))) {}

class BodyDto extends createIncomingDto(resolver(z.object({
  title: z.string(),
  content: z.string(),
}))) {}

@Controller('zod')
export class ZodController {
  @Post(':id')
  public endpoint(
    @Param() param: ParamDto,
    @Body() body: BodyDto,
  ): void {
    console.log({ param, body });
  }
}
```

## 🤝 Contributing

Contributions, issues and feature requests are welcome.

Feel free to check [issues page](https://github.com/Karibash/nestjs-modular/issues) if you want to contribute.

## 📝 License

Copyright © 2020 [@Karibash](https://twitter.com/karibash).

This project is [```MIT```](https://github.com/Karibash/nestjs-modular/blob/main/packages/validate/LICENSE) licensed.

[npm-version-badge]: https://badge.fury.io/js/@nestjs-modular%2Fvalidate.svg
[npm-version-link]: https://www.npmjs.com/package/@nestjs-modular/validate
[coverage-badge]: https://codecov.io/gh/Karibash/nestjs-modular/branch/master/graph/badge.svg?flag=validate
[coverage-link]: https://codecov.io/gh/Karibash/nestjs-modular/tree/master/packages/validate
[license-badge]: https://img.shields.io/npm/l/@nestjs-modular%2Fvalidate.svg
[license-link]: https://github.com/Karibash/nestjs-modular/blob/main/packages/validate/LICENSE
[github-follower-badge]: https://img.shields.io/github/followers/Karibash?label=Follow&logo=github&style=social
[github-follower-link]: https://github.com/Karibash?tab=followers
[twitter-follower-badge]: https://img.shields.io/twitter/follow/Karibash?label=Follow&style=social
[twitter-follower-link]: https://twitter.com/intent/follow?screen_name=Karibash
