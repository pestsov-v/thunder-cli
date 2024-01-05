import {container} from '@Cli/Container'
import {CliSymbols} from "@Cli/Symbols";

import {IInitiator} from "@Cli/Types";

const nodeVersion = Number(process.versions.node.split('.')[0]);

if (nodeVersion < 14) {
    console.error(`You are running Node ${nodeVersion}. Cli requires Node 14 or higher. Please update your version of Node.`);
    process.exit(1);
}

const initiator = container.get<IInitiator>(CliSymbols.Initiator)
initiator.start().catch(e => console.log(e))
