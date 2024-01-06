import { injectable } from '@Packages';
import { AbstractMenu } from '../../abstract.menu';
import { IAbstractMenu } from '@Cli/Types';

@injectable()
export class VisualizerMenu extends AbstractMenu implements IAbstractMenu {
  public async menu(): Promise<void> {}
}
