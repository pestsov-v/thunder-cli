export namespace NInstallerMenu {
  export type PackageFormFields = {
    name: string;
    description?: string;
    version: string;
  };

  export type PackageFormInputs = {
    PACKAGE_NAME: string;
    PACKAGE_DESCRIPTION: string;
    PACKAGE_VERSION: string;
  };
}
