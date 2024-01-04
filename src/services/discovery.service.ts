import {injectable} from '../packages'
import {AbstractService} from "./abstract.service";
import {IDiscoveryService} from "@Cli/Types";
@injectable()
export class DiscoveryService extends AbstractService implements IDiscoveryService {
    protected _SERVICE_NAME = DiscoveryService.name
    protected _discoveryService = this

    protected async init(): Promise<boolean> {
        return true
    }

    protected async destroy(): Promise<void> {}
}