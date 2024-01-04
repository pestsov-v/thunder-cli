import {ContainerModule} from '../packages'
import {CliSymbols} from "@Cli/Symbols";
import {Initiator} from "../initiator";

import {DiscoveryService} from "../services/discovery.service";
import {ManageService} from "../services/manage.service";

import {IDiscoveryService, IInitiator, IManageService} from "@Cli/Types";


export const CliModule = new ContainerModule((bind) => {
    // Services
    bind<IDiscoveryService>(CliSymbols.DiscoveryService).to(DiscoveryService).inSingletonScope()
    bind<IManageService>(CliSymbols.ManageService).to(ManageService).inSingletonScope()


    // Initiator
    bind<IInitiator>(CliSymbols.Initiator).to(Initiator).inRequestScope()
})