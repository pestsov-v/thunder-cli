import { injectable, inject, inquirer } from '@Packages';
import { CliSymbols } from '@Cli/Symbols';
import { AbstractMenu } from '../abstract.menu';

import type { IAbstractMenu, IInstallerCommander, NInstallerMenu } from '@Cli/Types';

@injectable()
export class InstallerMenu extends AbstractMenu implements IAbstractMenu {
  constructor(
    @inject(CliSymbols.InstallCommander)
    private readonly _installerCommander: IInstallerCommander
  ) {
    super();
  }

  private _promptNames = {
    PROJECT_DIRECTORY_PATH: 'PROJECT_DIRECTORY_PATH',
    INSTALL_SERVER: 'INSTALL_SERVER',
    EDGE: 'EDGE',
    VISUALIZER: 'VISUALIZER',
    SRC_FOLDER_EXISTS: 'SRC_FOLDER_EXISTS',
  };

  private _promptMessages = {
    PROJECT_DIRECTORY_PATH: 'Where is install schemas project?',
    INSTALL_SERVER: 'Install compute server core?',
    EDGE: 'Install edge web client core?',
    VISUALIZER: 'Install visualizer web client core?',
    SRC_FOLDER_EXISTS:
      'The "src" folder already exists. Do you confirm the deletion of the previous one for the subsequent installation of project files?`',
  };

  public async menu(): Promise<void> {
    const { PROJECT_DIRECTORY_PATH } = await inquirer.prompt<typeof this._promptMessages>({
      type: 'input',
      name: this._promptNames.PROJECT_DIRECTORY_PATH,
      message: this._promptMessages.PROJECT_DIRECTORY_PATH,
      default: `./loc/des`,
    });

    // const { INSTALL_SERVER } = await inquirer.prompt<typeof this._promptMessages>({
    //   type: 'confirm',
    //   name: this._promptNames.INSTALL_SERVER,
    //   message: this._promptMessages.INSTALL_SERVER,
    // });
    //
    // const { EDGE } = await inquirer.prompt<typeof this._promptMessages>({
    //   type: 'confirm',
    //   name: this._promptNames.EDGE,
    //   message: this._promptMessages.EDGE,
    // });
    //
    // const { VISUALIZER } = await inquirer.prompt<typeof this._promptMessages>({
    //   type: 'confirm',
    //   name: this._promptNames.VISUALIZER,
    //   message: this._promptMessages.VISUALIZER,
    // });

    await this._installerCommander.makeProjectDirectory(PROJECT_DIRECTORY_PATH);

    const answers = await this._installPackageForm();
    await this._installerCommander.buildPackageJson(PROJECT_DIRECTORY_PATH, answers);
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
    });

    return {
      name: answers.PACKAGE_NAME,
      description: answers.PACKAGE_DESCRIPTION.includes('<name>')
        ? undefined
        : answers.PACKAGE_DESCRIPTION,
      version: answers.PACKAGE_VERSION,
    };
  }
}
