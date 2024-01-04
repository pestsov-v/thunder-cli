import {container} from '@Cli/Container'
import {CliSymbols} from "@Cli/Symbols";

import {IInitiator} from "@Cli/Types";

const initiator = container.get<IInitiator>(CliSymbols.Initiator)

initiator.start().catch(e => console.log(e))

process.on('exit', async () => {
   await initiator.stop()
})