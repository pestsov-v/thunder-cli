import { injectable, fse } from '@Packages';

import { IInstallerCommander, IPackageTemplate, NInstallCommander } from '@Cli/Types';
import { container } from '@Cli/Container';
import { CliSymbols } from '@Cli/Symbols';

@injectable()
export class InstallerCommander implements IInstallerCommander {
  public async makeProjectDirectory(path: string): Promise<void> {
    try {
      const exists = await fse.pathExists(path);
      if (!exists) {
        await fse.ensureDir(path);
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async buildPackageJson(
    path: string,
    options: NInstallCommander.PackageOptions
  ): Promise<void> {
    const template = container.get<IPackageTemplate>(CliSymbols.PackageTemplate).structure({
      name: options.name,
      description: options.description ?? `${options.name} @chaminjector schema.`,
      typesVersions: {
        '>=4.2': {
          '*': ['_types/*', 'types/*'],
        },
      },
      version: '0.0.1',
    });

    try {
      await fse.writeJSON(path + '/package.json', template);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
