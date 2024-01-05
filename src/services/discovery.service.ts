import {AbstractDiscoveryService, IAbstractDiscoveryService} from '@chaminjector/seeds-discovery-service'
import {injectable} from '../packages'
import {AbstractService} from "./abstract.service";
import {IDiscoveryService} from "@Cli/Types";


@injectable()
export class DiscoveryService extends AbstractService implements IDiscoveryService {
    protected _SERVICE_NAME = DiscoveryService.name
    protected _discoveryService = this
    private readonly _absDiscoveryService: IAbstractDiscoveryService

    constructor() {
        super();
        this._absDiscoveryService = new AbstractDiscoveryService()
    }

    public async init(): Promise<boolean> {
        return this._absDiscoveryService.init()
    }

    public async destroy(): Promise<void> {
        await this._absDiscoveryService.destroy()
    }

    public get nodeEnv() {
        return this._absDiscoveryService.nodeEnv
    }

    public get serverTag() {
        return this._absDiscoveryService.serverTag
    }

    public getMandatory<T>(name: string): T {
        return this._absDiscoveryService.getMandatory(name)
    }

    public getString(name: string, def: string): string {
        return this._absDiscoveryService.getString(name, def)
    }

    public getNumber(name: string, def: number): number {
        return this._absDiscoveryService.getNumber(name, def)
    }

    public getBoolean(name: string, def: boolean): boolean {
        return this._absDiscoveryService.getBoolean(name,def)
    }

    public getArray<T>(name: string, def: Array<T>): Array<T> {
        return this._absDiscoveryService.getArray(name, def)
    }

    public async getCertificateBuffer(path: string): Promise<Buffer> {
        return this._absDiscoveryService.getCertificateBuffer(path)
    }
    public async getCertificateString(path: string): Promise<string> {
        return this._absDiscoveryService.getCertificateString(path)
    }
}