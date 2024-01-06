import { injectable, inject, inquirer } from '@Packages';
import { CliSymbols } from '@Cli/Symbols';
import { AbstractMenu } from '../abstract.menu';

import type { IAbstractMenu } from '@Cli/Types';

@injectable()
export class InstallerMenu extends AbstractMenu implements IAbstractMenu {
  constructor(
    @inject(CliSymbols.ServerMenu)
    private readonly _serverMenu: IAbstractMenu,
    @inject(CliSymbols.EdgeMenu)
    private readonly _edgeMenu: IAbstractMenu,
    @inject(CliSymbols.VisualizerMenu)
    private readonly _visualizerMenu: IAbstractMenu
  ) {
    super();
  }

  private _promptNames = {
    INSTALL_SERVER: 'INSTALL_SERVER',
    EDGE: 'EDGE',
    VISUALIZER: 'VISUALIZER',
  };

  private _promptMessages = {
    INSTALL_SERVER: 'Install compute server core?',
    EDGE: 'Install edge web client core?',
    VISUALIZER: 'Install visualizer web client core?',
  };

  public async menu(): Promise<void> {
    const { INSTALL_SERVER } = await inquirer.prompt<typeof this._promptMessages>({
      type: 'confirm',
      name: this._promptNames.INSTALL_SERVER,
      message: this._promptMessages.INSTALL_SERVER,
    });
    if (INSTALL_SERVER) await this._serverMenu.menu();

    const { EDGE } = await inquirer.prompt<typeof this._promptMessages>({
      type: 'confirm',
      name: this._promptNames.EDGE,
      message: this._promptMessages.EDGE,
    });
    if (EDGE) await this._edgeMenu.menu();

    const { VISUALIZER } = await inquirer.prompt<typeof this._promptMessages>({
      type: 'confirm',
      name: this._promptNames.VISUALIZER,
      message: this._promptMessages.VISUALIZER,
    });
    if (VISUALIZER) await this._visualizerMenu.menu();
  }
}
