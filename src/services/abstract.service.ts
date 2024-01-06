import { injectable } from '@Packages';
import { IAbstractService, IDiscoveryService } from '@Cli/Types';

@injectable()
export abstract class AbstractService implements IAbstractService {
  protected abstract _SERVICE_NAME: string;
  protected abstract _discoveryService: IDiscoveryService;
  protected abstract init(): Promise<boolean>;
  protected abstract destroy(): Promise<void>;

  public async start(): Promise<void> {
    try {
      if (await this.init()) {
        console.log(`Service "${this._SERVICE_NAME}" has started.`);
      } else {
        console.warn(`Service "${this._SERVICE_NAME}" not enabled`);
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  public async stop(): Promise<void> {
    try {
      await this.destroy();
      console.log(`Service "${this._SERVICE_NAME}" has stopped.`);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
