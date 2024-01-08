import { injectable, inject, inquirer } from '@Packages';
import { CliSymbols } from '@Cli/Symbols';
import { AbstractMenu } from '../abstract.menu';

import type {
  IAbstractMenu,
  ICodeFormatterCommander,
  IInstallerCommander,
  IServerCommander,
  ITypescriptCommander,
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
    private readonly _visualizerCommander: IVisualizerCommander,
    @inject(CliSymbols.CodeFormatterCommander)
    private readonly _codeFormatterCommander: ICodeFormatterCommander,
    @inject(CliSymbols.TypescriptCommander)
    private readonly _typescriptCommander: ITypescriptCommander
  ) {
    super();
  }

  private _promptNames = {
    PROJECT_DIRECTORY_PATH: 'PROJECT_DIRECTORY_PATH',
    PACKAGE_NAME: 'PACKAGE_NAME',
    PACKAGE_DESCRIPTION: 'PACKAGE_DESCRIPTION',
    PACKAGE_VERSION: 'PACKAGE_VERSION',
    TYPESCRIPT_EXTENDS: 'TYPESCRIPT_EXTENDS',
    PLATFORM_PARTS: 'PLATFORM_PARTS',
    ESLINT_WITH_PRETTIER: 'ESLINT_WITH_PRETTIER',
  };

  private _promptMessages = {
    PROJECT_DIRECTORY_PATH: 'Where is install schemas project?',
    PACKAGE_NAME: 'Enter the schema name',
    PACKAGE_DESCRIPTION: 'Enter the schema description',
    PACKAGE_VERSION: 'Enter the schema version in x.x.x format',
    TYPESCRIPT_EXTENDS: 'Which compilation format to include in the project?',
    PLATFORM_PARTS: 'Choose which parts of the platform to install and which ones to connect',
    ESLINT_WITH_PRETTIER: 'Add ESLint with prettier in schema?',
  };

  private _platformParts = {
    WEB_CLIENT: 'Web-client',
    SERVER: 'Server',
    VISUALIZER: 'Visualizer',
  };

  private _typescriptExtends = {
    COMMON_JS: 'CommonJS',
    TYPESCRIPT: 'Typescript',
  };

  public async menu(): Promise<void> {
    try {
      const { PROJECT_DIRECTORY_PATH } = await inquirer.prompt<typeof this._promptMessages>({
        type: 'input',
        name: this._promptNames.PROJECT_DIRECTORY_PATH,
        message: this._promptMessages.PROJECT_DIRECTORY_PATH,
        default: `./test_project`,
      });

      const answers = await this._installPackageForm();

      await this._installerCommander.build(PROJECT_DIRECTORY_PATH, {
        service: answers.name,
        description: answers.description,
        version: answers.version,
      });
      await this._typescriptCommander.build(PROJECT_DIRECTORY_PATH, {
        application: answers.name,
        formatExtends: answers.tsExtends,
        platformParts: answers.platformParts,
      });
      await this._webClientCommander.build(PROJECT_DIRECTORY_PATH, answers.name);
      await this._codeFormatterCommander.build(PROJECT_DIRECTORY_PATH);

      await this.install(PROJECT_DIRECTORY_PATH, answers);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  private async _installPackageForm(): Promise<NInstallerMenu.PackageFormFields> {
    const answers = await inquirer.prompt<NInstallerMenu.PackageFormInputs>({
      [this._promptNames.PACKAGE_NAME]: {
        type: 'input',
        message: this._promptMessages.PACKAGE_NAME,
      },
      [this._promptNames.PACKAGE_DESCRIPTION]: {
        type: 'input',
        message: this._promptMessages.PACKAGE_DESCRIPTION,
        default: 'Implemented "<name> @chaminjector schema" template pattern for description',
      },
      [this._promptNames.PACKAGE_VERSION]: {
        type: 'input',
        message: this._promptMessages.PACKAGE_VERSION,
        default: '0.0.1',
      },
      [this._promptNames.TYPESCRIPT_EXTENDS]: {
        type: 'checkbox',
        message: this._promptMessages.TYPESCRIPT_EXTENDS,
        choices: [this._typescriptExtends.COMMON_JS, this._typescriptExtends.TYPESCRIPT],
        default: [this._typescriptExtends.COMMON_JS, this._typescriptExtends.TYPESCRIPT],
      },
      [this._promptNames.PLATFORM_PARTS]: {
        type: 'checkbox',
        message: this._promptNames.PLATFORM_PARTS,
        choices: [
          this._platformParts.WEB_CLIENT,
          this._platformParts.SERVER,
          this._platformParts.VISUALIZER,
        ],
        default: [
          this._platformParts.WEB_CLIENT,
          this._platformParts.SERVER,
          this._platformParts.VISUALIZER,
        ],
      },
      [this._promptNames.ESLINT_WITH_PRETTIER]: {
        type: 'confirm',
        message: this._promptMessages.ESLINT_WITH_PRETTIER,
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

  private async install(path: string, answers: NInstallerMenu.PackageFormFields): Promise<void> {
    try {
      await Promise.all([
        answers.platformParts.includes('Server') ? await this._serverCommander.install(path) : true,
        answers.platformParts.includes('Web-client')
          ? await this._webClientCommander.install(path)
          : true,
        answers.platformParts.includes('Visualizer')
          ? await this._visualizerCommander.install(path)
          : true,
        answers.eslintPrettier ? await this._codeFormatterCommander.install(path) : true,
        await this._typescriptCommander.install(path),
      ]);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
