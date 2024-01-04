import {injectable, inject} from './packages'
import {IDiscoveryService, IInitiator, IManageService} from "@Cli/Types";
import {CliSymbols} from "@Cli/Symbols";

@injectable()
export class Initiator implements IInitiator {
    constructor(
        @inject(CliSymbols.DiscoveryService)
        private readonly _discoveryService: IDiscoveryService,
        @inject(CliSymbols.ManageService)
        private readonly _manageService: IManageService
    ) {
    }
    public async start(): Promise<void> {
        await this._discoveryService.start()
        await this._manageService.start()
    }
    public async stop(): Promise<void> {
        await this._manageService.stop()
        await this._discoveryService.stop()
    }
}