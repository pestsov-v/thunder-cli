export interface IInstallerCommander {
  makeProjectDirectory(path: string): Promise<void>;
  buildPackageJson(path: string, options: NInstallCommander.PackageOptions): Promise<void>;
}

export namespace NInstallCommander {
  export type PackageOptions = {
    name: string;
    description?: string;
    version: string;
  };
}
