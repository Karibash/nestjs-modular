# @nestjs-modular/provider

[![npm version][npm-version-badge]][npm-version-link]
[![codecov][coverage-badge]][coverage-link]
[![license][license-badge]][license-link]
[![Github][github-follower-badge]][github-follower-link]
[![Twitter][twitter-follower-badge]][twitter-follower-link]

This module provides the ability to collectively inject providers residing in a specified directory.

This reduces the need to manually inject providers that may be used throughout a project, such as a repository, each time.

## 🗒 Examples

- [REST API Server](../../examples/provider)

## 🚀 Installation

```
$ npm install @nestjs-modular/provider
```

## 👏 Getting Started

You can provide repositories at once by writing as follows.

```ts
@Global()
@Module({
  imports: [
    ProviderModule.forRootAsync({
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
ProviderModule.forRootAsync({
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

This project is [```MIT```](https://github.com/Karibash/nestjs-modular/blob/main/packages/provider/LICENSE) licensed.

[npm-version-badge]: https://badge.fury.io/js/@nestjs-modular%2Fprovider.svg
[npm-version-link]: https://www.npmjs.com/package/@nestjs-modular/provider
[coverage-badge]: https://codecov.io/gh/Karibash/nestjs-modular/branch/master/graph/badge.svg?flag=provider
[coverage-link]: https://codecov.io/gh/Karibash/nestjs-modular/tree/master/packages/provider
[license-badge]: https://img.shields.io/npm/l/@nestjs-modular%2Fprovider.svg
[license-link]: https://github.com/Karibash/nestjs-modular/blob/main/packages/provider/LICENSE
[github-follower-badge]: https://img.shields.io/github/followers/Karibash?label=Follow&logo=github&style=social
[github-follower-link]: https://github.com/Karibash?tab=followers
[twitter-follower-badge]: https://img.shields.io/twitter/follow/Karibash?label=Follow&style=social
[twitter-follower-link]: https://twitter.com/intent/follow?screen_name=Karibash
