import type { NInstallerMenu } from './installer.menu';

export interface ITypescriptCommander {
  install(path: string): Promise<void>;
  build(path: string, options: NTypescriptCommander.Options): Promise<void>;
}

export namespace NTypescriptCommander {
  export type BuildFormat = 'CommonJS' | 'Typescript';
  export type Options = {
    application: string;
    formatExtends: BuildFormat[];
    platformParts: NInstallerMenu.PlatformPartFields[];
  };
}
