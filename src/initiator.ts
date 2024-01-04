import {injectable} from './packages'
import {IInitiator} from "@Cli/Types";

@injectable()
export class Initiator implements IInitiator {
    public async start(): Promise<void> {
        console.log('222')
    }
    public async stop(): Promise<void> {}
}