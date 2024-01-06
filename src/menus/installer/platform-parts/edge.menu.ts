import { injectable, inquirer } from '@Packages';
import { AbstractMenu } from '../../abstract.menu';
import { IAbstractMenu } from '@Cli/Types';

@injectable()
export class EdgeMenu extends AbstractMenu implements IAbstractMenu {
  public async menu(): Promise<void> {}
}
