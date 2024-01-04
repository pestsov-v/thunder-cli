import {ContainerModule} from '../packages'
import {CliSymbols} from "@Cli/Symbols";
import {Initiator} from "../initiator";

import {IInitiator} from "@Cli/Types";


export const CliModule = new ContainerModule((bind) => {
    bind<IInitiator>(CliSymbols.Initiator).to(Initiator).inRequestScope()
})