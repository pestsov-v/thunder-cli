import { injectable } from '@Packages';
import { AbstractPlatformPartCommander } from './abstract.platform-part.commander';

@injectable()
export class ServerCommander extends AbstractPlatformPartCommander {
  constructor() {
    super();
  }
  public async install(): Promise<void> {
    try {
      await this._install('@chaminjector/server@latest');
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
