# @nestjs-modular/inject

[![npm version][npm-version-badge]][npm-version-link]
[![codecov][coverage-badge]][coverage-link]
[![license][license-badge]][license-link]
[![Github][github-follower-badge]][github-follower-link]
[![Twitter][twitter-follower-badge]][twitter-follower-link]

This module provides the ability to inject features in bulk by specifying a directory.

This reduces the need to manually inject every time you create a class that may be used throughout a project, such as a repository.

## 🗒 Examples

- [REST API Server](../../examples/inject)

## 🚀 Installation

```
$ npm install @nestjs-modular/inject
```

## 👏 Getting Started

You can provide repositories at once by writing as follows.

```ts
@Global()
@Module({
  imports: [
    InjectModule.forRootAsync({
      global: true,
      needsExport: true,
      path: path.resolve(__dirname, './repositories'),
      includeFileNames: [/\.repository$/],
      includeExportNames: [/Repository$/],
    }),
  ],
})
export class GlobalModule {}
```

## 🔧 Configurations

The default values for the optional settings are as follows.

```ts
InjectModule.forRootAsync({
  global: false,
  needsExport: false,
  includeFileNames: [],
  excludeFileNames: [/\.test$/, /\.d$/],
  includeFileExtensions: ['.js', '.ts'],
  excludeFileExtensions: [],
  includeExportNames: [],
  excludeExportNames: [],
})
```

### Options

| Name                    | Description                                                                           | Type                        | Default Value         |
|-------------------------|---------------------------------------------------------------------------------------|-----------------------------|-----------------------|
| `path`                  | The absolute path to the directory where the classes you want to provide are stored.  | string                      |                       |
| `global`                | If set to true, the module is registered in the global scope.                         | boolean                     | `false`               |
| `needsExport`           | If set to true, the provider will be exported.                                        | boolean                     | `false`               |
| `includeFileNames`      | Specify an array of strings or regular expressions of file names to be included.      | Array<string &#124; RegExp> | `[]`                  |
| `excludeFileNames`      | Specify an array of strings or regular expressions of file names to be excluded.      | Array<string &#124; RegExp> | `[/\.test$/, /\.d$/]` |
| `includeFileExtensions` | Specify an array of strings or regular expressions of file extensions to be included. | Array<string &#124; RegExp> | `['.js', '.ts']`      |
| `excludeFileExtensions` | Specify an array of strings or regular expressions of file extensions to be excluded. | Array<string &#124; RegExp> | `[]`                  |
| `includeExportNames`    | Specify an array of strings or regular expressions of export names to be included.    | Array<string &#124; RegExp> | `[]`                  |
| `excludeExportNames`    | Specify an array of strings or regular expressions of export names to be excluded.    | Array<string &#124; RegExp> | `[]`                  |

## 🤝 Contributing

Contributions, issues and feature requests are welcome.

Feel free to check [issues page](https://github.com/Karibash/nestjs-modular/issues) if you want to contribute.

## 📝 License

Copyright © 2020 [@Karibash](https://twitter.com/karibash).

This project is [```MIT```](https://github.com/Karibash/nestjs-modular/blob/main/packages/inject/LICENSE) licensed.

[npm-version-badge]: https://badge.fury.io/js/@nestjs-modular%2Finject.svg
[npm-version-link]: https://www.npmjs.com/package/@nestjs-modular/inject
[coverage-badge]: https://codecov.io/gh/Karibash/nestjs-modular/branch/master/graph/badge.svg?flag=inject
[coverage-link]: https://codecov.io/gh/Karibash/nestjs-modular/tree/master/packages/inject
[license-badge]: https://img.shields.io/npm/l/@nestjs-modular%2Finject.svg
[license-link]: https://github.com/Karibash/nestjs-modular/blob/main/packages/inject/LICENSE
[github-follower-badge]: https://img.shields.io/github/followers/Karibash?label=Follow&logo=github&style=social
[github-follower-link]: https://github.com/Karibash?tab=followers
[twitter-follower-badge]: https://img.shields.io/twitter/follow/Karibash?label=Follow&style=social
[twitter-follower-link]: https://twitter.com/intent/follow?screen_name=Karibash
