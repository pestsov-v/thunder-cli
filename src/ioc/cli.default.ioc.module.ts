import {ContainerModule} from '../packages'
import {CliSymbols} from "@Cli/Symbols";
import {Initiator} from "../initiator";
import {DiscoveryService, ManageService} from "../services";
import {InstallerCommander, InstallerMenu, ManageCommander, ManageMenu} from "../menus";

import {
    IAbstractMenu,
    IDiscoveryService,
    IInitiator,
    IInstallerCommander,
    IManageCommander,
    IManageService
} from "@Cli/Types";


export const CliModule = new ContainerModule((bind) => {
    // Services
    bind<IDiscoveryService>(CliSymbols.DiscoveryService).to(DiscoveryService).inSingletonScope()
    bind<IManageService>(CliSymbols.ManageService).to(ManageService).inSingletonScope()

    // Menus
    bind<IInstallerCommander>(CliSymbols.InstallerCommander).to(InstallerCommander).inSingletonScope()
    bind<IAbstractMenu>(CliSymbols.InstallerMenu).to(InstallerMenu).inTransientScope()
    bind<IManageCommander>(CliSymbols.ManageCommander).to(ManageCommander).inSingletonScope()
    bind<IAbstractMenu>(CliSymbols.ManageMenu).to(ManageMenu).inTransientScope()


    // Initiator
    bind<IInitiator>(CliSymbols.Initiator).to(Initiator).inRequestScope()
})