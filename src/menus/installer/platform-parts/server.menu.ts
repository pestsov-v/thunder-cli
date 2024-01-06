import { injectable, inject } from '@Packages';
import { AbstractMenu } from '../../abstract.menu';
import { IAbstractMenu, IServerCommander } from '@Cli/Types';
import { CliSymbols } from '@Cli/Symbols';

@injectable()
export class ServerMenu extends AbstractMenu implements IAbstractMenu {
  constructor(
    @inject(CliSymbols.ServerCommander)
    private readonly _serverCommander: IServerCommander
  ) {
    super();
  }
  public async menu(): Promise<void> {
    await this._serverCommander.install();
  }
}
