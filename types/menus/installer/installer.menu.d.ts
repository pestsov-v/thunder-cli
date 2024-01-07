import { NInstallCommander } from './installer.commander';

export namespace NInstallerMenu {
  export type PackageFormFields = {
    name: string;
    description?: string;
    version: string;
    platformParts: PlatformPartFields[];
    tsExtends: NInstallCommander.TsconfigBuildFormatExtends[];
    eslintPrettier: boolean;
  };

  export type PlatformPartFields =
    | 'Web-client'
    | 'Web-client with connect'
    | 'Server'
    | 'Server with connect'
    | 'Visualizer'
    | 'Visualizer with connect';

  export type PackageFormInputs = {
    PACKAGE_NAME: string;
    PACKAGE_DESCRIPTION: string;
    PACKAGE_VERSION: string;
    TYPESCRIPT_EXTENDS: NInstallCommander.TsconfigBuildFormatExtends[];
    PLATFORM_PARTS: PlatformPartFields[];
    ESLINT_WITH_PRETTIER: boolean;
  };
}
