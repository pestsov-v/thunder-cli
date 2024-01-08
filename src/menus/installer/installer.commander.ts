import { injectable, fse } from '@Packages';
import { container } from '@Cli/Container';
import { CliSymbols } from '@Cli/Symbols';

import type {
  IServiceTemplate,
  IInstallerCommander,
  NInstallerCommander,
  IPackageTemplate,
} from '@Cli/Types';

@injectable()
export class InstallerCommander implements IInstallerCommander {
  public async build(path: string, options: NInstallerCommander.PackageOptions): Promise<void> {
    await this._makeProjectDirectory(path);
    await this._makeProjectDirectories(path, options.service);
    await this._makeSchemaEntryPoint(path, options.service);
    await this._makePackage(path, {
      service: options.service,
      description: options.description,
      version: options.version,
    });
  }

  private async _makeProjectDirectory(path: string): Promise<void> {
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

  private async _makeProjectDirectories(path: string, service: string): Promise<void> {
    try {
      await fse.ensureDir(path + '/configs');
      await fse.ensureDir(path + `/src/${service}/domains`);
      await fse.ensureDir(path + `/types/${service}/domains`);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  private async _makeSchemaEntryPoint(path: string, service: string): Promise<void> {
    const engine = container.get<IServiceTemplate>(CliSymbols.ServiceTemplate);
    const appPath = path + `/src/${service}/${service}`;

    try {
      await fse.writeFile(path + '/configs/web-client.development.config.json', '');
      await fse.writeFile(path + '/configs/server.development.config.json', '');

      await fse.writeFile(path + '/src/services.ts', engine.getServices(service));
      await fse.writeFile(path + `/src/server.ts`, engine.getServiceServerEntry(service));
      await fse.writeFile(path + `/src/web-client.ts`, engine.getServiceWebClientEntry(service));
      await fse.writeFile(`${appPath}.server.app.ts`, engine.getServiceServer(service));
      await fse.writeFile(`${appPath}.web-client.app.ts`, engine.getServiceWebClient(service));
    } catch (e) {
      throw e;
    }
  }

  private async _makePackage(
    path: string,
    options: NInstallerCommander.PackageOptions
  ): Promise<void> {
    const template = container.get<IPackageTemplate>(CliSymbols.PackageTemplate).structure({
      name: options.service,
      description: options.description ?? `${options.service} @chaminjector schema.`,
      typesVersions: {
        '>=4.2': {
          '*': ['_types/*', 'types/*'],
        },
      },
      version: options.version ?? '0.0.1',
    });

    try {
      await fse.writeJSON(path + '/package.json', template);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
