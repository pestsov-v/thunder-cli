import {injectable, inject} from '../packages'
import {AbstractService} from "./abstract.service";
import {IDiscoveryService, IManageService} from "@Cli/Types";
import {CliSymbols} from "@Cli/Symbols";

@injectable()
export class ManageService extends AbstractService implements IManageService {
    protected readonly _SERVICE_NAME = ManageService.name

    constructor(
        @inject(CliSymbols.DiscoveryService)
        protected readonly _discoveryService: IDiscoveryService
    ) {
        super();
    }

    protected async init(): Promise<boolean> {
        return true
    }

    protected async destroy(): Promise<void> {}
}