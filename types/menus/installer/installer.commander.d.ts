import { NInstallerMenu } from './installer.menu';

export interface IInstallerCommander {
  makeProjectDirectory(path: string): Promise<void>;
  buildPackage(path: string, options: NInstallCommander.PackageOptions): Promise<void>;
  buildTsconfig(path: string, options: NInstallCommander.TsconfigOptions): Promise<void>;
  buildEslint(path: string): Promise<void>;
  buildPrettier(path: string): Promise<void>;
  makeProjectDirectories(
    path: string,
    options: NInstallCommander.DirectoriesOptions
  ): Promise<void>;
  makeSchemaEntryPoint(path: string, application: string): Promise<void>;
}

export namespace NInstallCommander {
  export type Packages =
    | 'chaminjector/server@latest'
    | 'chaminjector/web-client@latest'
    | 'chaminjector/visualizer@latest';

  export type PackageOptions = {
    name: string;
    description?: string;
    version: string;
  };

  export type TsconfigBuildFormatExtends = 'CommonJS' | 'Typescript';
  export type TsconfigOptions = {
    application: string;
    formatExtends: TsconfigBuildFormatExtends[];
    platformParts: NInstallerMenu.PlatformPartFields[];
  };

  export type DirectoriesOptions = {
    service: string;
    server: boolean;
    webClient: boolean;
    visualizer: boolean;
  };
}
