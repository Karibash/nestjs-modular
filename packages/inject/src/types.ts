export type InjectConditions = {
  path: string | string[];
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
