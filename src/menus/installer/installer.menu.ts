import { injectable, inject, inquirer } from '@Packages';
import { CliSymbols } from '@Cli/Symbols';
import { AbstractMenu } from '../abstract.menu';

import type {
  IAbstractMenu,
  IInstallerCommander,
  IServerCommander,
  IVisualizerCommander,
  IWebClientCommander,
  NInstallerMenu,
} from '@Cli/Types';

@injectable()
export class InstallerMenu extends AbstractMenu implements IAbstractMenu {
  constructor(
    @inject(CliSymbols.InstallCommander)
    private readonly _installerCommander: IInstallerCommander,
    @inject(CliSymbols.ServerCommander)
    private readonly _serverCommander: IServerCommander,
    @inject(CliSymbols.WebClientCommander)
    private readonly _webClientCommander: IWebClientCommander,
    @inject(CliSymbols.VisualizerCommander)
    private readonly _visualizerCommander: IVisualizerCommander
  ) {
    super();
  }

  private _promptNames = {
    PROJECT_DIRECTORY_PATH: 'PROJECT_DIRECTORY_PATH',
  };

  private _promptMessages = {
    PROJECT_DIRECTORY_PATH: 'Where is install schemas project?',
  };

  public async menu(): Promise<void> {
    try {
      const { PROJECT_DIRECTORY_PATH } = await inquirer.prompt<typeof this._promptMessages>({
        type: 'input',
        name: this._promptNames.PROJECT_DIRECTORY_PATH,
        message: this._promptMessages.PROJECT_DIRECTORY_PATH,
        default: `./loc/des`,
      });

      await this._installerCommander.makeProjectDirectory(PROJECT_DIRECTORY_PATH);

      const answers = await this._installPackageForm();
      await this._installerCommander.buildPackage(PROJECT_DIRECTORY_PATH, {
        name: answers.name,
        description: answers.description,
        version: answers.version,
      });
      await this._installerCommander.buildTsconfig(PROJECT_DIRECTORY_PATH, {
        application: answers.name,
        formatExtends: answers.tsExtends,
        platformParts: answers.platformParts,
      });
      await this._installerCommander.buildEslint(PROJECT_DIRECTORY_PATH);
      await this._installerCommander.buildPrettier(PROJECT_DIRECTORY_PATH);
      await this._installerCommander.makeProjectDirectories(PROJECT_DIRECTORY_PATH, {
        server: true,
        service: answers.name,
        webClient: true,
        visualizer: true,
      });
      await this._installerCommander.makeSchemaEntryPoint(PROJECT_DIRECTORY_PATH, answers.name);

      await Promise.all([
        answers.platformParts.includes('Server')
          ? await this._serverCommander.install(PROJECT_DIRECTORY_PATH)
          : true,
        answers.platformParts.includes('Web-client')
          ? await this._webClientCommander.install(PROJECT_DIRECTORY_PATH)
          : true,
        answers.platformParts.includes('Visualizer')
          ? await this._visualizerCommander.install(PROJECT_DIRECTORY_PATH)
          : true,
      ]);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  private async _installPackageForm(): Promise<NInstallerMenu.PackageFormFields> {
    const answers = await inquirer.prompt<NInstallerMenu.PackageFormInputs>({
      PACKAGE_NAME: {
        type: 'input',
        message: 'Enter the schema name',
      },
      PACKAGE_DESCRIPTION: {
        type: 'input',
        message: 'Enter the schema description',
        default: 'Implemented "<name> @chaminjector schema" template pattern for description',
      },
      PACKAGE_VERSION: {
        type: 'input',
        message: 'Enter the schema version in x.x.x format',
        default: '0.0.1',
      },
      TYPESCRIPT_EXTENDS: {
        type: 'checkbox',
        message: 'Which compilation format to include in the project?',
        choices: ['CommonJS', 'Typescript'],
        default: ['CommonJS', 'Typescript'],
      },
      PLATFORM_PARTS: {
        type: 'checkbox',
        message: 'Choose which parts of the platform to install and which ones to connect',
        choices: ['Web-client', 'Server', 'Visualizer'],
        default: ['Web-client', 'Server', 'Visualizer'],
      },
      ESLINT_WITH_PRETTIER: {
        type: 'confirm',
        message: 'Add ESLint with prettier in schema?',
        default: true,
      },
    });

    return {
      name: answers.PACKAGE_NAME,
      description: answers.PACKAGE_DESCRIPTION.includes('<name>')
        ? undefined
        : answers.PACKAGE_DESCRIPTION,
      version: answers.PACKAGE_VERSION,
      tsExtends: answers.TYPESCRIPT_EXTENDS,
      platformParts: answers.PLATFORM_PARTS,
      eslintPrettier: answers.ESLINT_WITH_PRETTIER,
    };
  }
}
