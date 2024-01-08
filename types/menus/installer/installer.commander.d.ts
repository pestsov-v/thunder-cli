import type { UnknownObject } from '../../utility';

export interface IInstallerCommander {
  build(path: string, options: NInstallerCommander.PackageOptions): Promise<void>;
}

export namespace NInstallerCommander {
  export type Packages =
    | 'chaminjector/server@latest'
    | 'chaminjector/web-client@latest'
    | 'chaminjector/visualizer@latest';

  export type Options = {
    service: string;
    description?: string;
    version: string;
    server: boolean;
    webClient: boolean;
    visualizer: boolean;
  };

  export type PackageOptions = {
    service: Options['service'];
    description?: Options['description'];
    version: Options['version'];
  };

  export type TsconfigBuildFormatExtends = 'CommonJS' | 'Typescript';

  export type DirectoriesOptions = {
    service: Options['service'];
  };
}
