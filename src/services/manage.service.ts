import {injectable, inject} from '../packages'
import {AbstractService} from "./abstract.service";
import {IAbstractMenu, IDiscoveryService, IManageService} from "@Cli/Types";
import {CliSymbols} from "@Cli/Symbols";

@injectable()
export class ManageService extends AbstractService implements IManageService {
    protected readonly _SERVICE_NAME = ManageService.name

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
        await this._installerMenu.menu()
        return true
    }

    protected async destroy(): Promise<void> {}
}