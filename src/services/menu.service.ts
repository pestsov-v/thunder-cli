import { injectable, inject } from '@Packages';
import { CliSymbols } from '@Cli/Symbols';
import { AbstractService } from './abstract.service';

import type { IAbstractMenu, IDiscoveryService, IMenuService } from '@Cli/Types';

@injectable()
export class MenuService extends AbstractService implements IMenuService {
  protected readonly _SERVICE_NAME = MenuService.name;

  constructor(
    @inject(CliSymbols.DiscoveryService)
    protected readonly _discoveryService: IDiscoveryService,
    @inject(CliSymbols.ManageMenu)
    private readonly _manageMenu: IAbstractMenu,
    @inject(CliSymbols.InstallerMenu)
    private readonly _installerMenu: IAbstractMenu
  ) {
    super();
  }

  protected async init(): Promise<boolean> {
    await this._installerMenu.menu();
    return true;
  }

  protected async destroy(): Promise<void> {}
}