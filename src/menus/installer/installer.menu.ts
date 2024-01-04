import {injectable} from '../../packages'
import {AbstractMenu} from "../abstract.menu";

import {IAbstractMenu} from "@Cli/Types";

@injectable()
export class InstallerMenu extends AbstractMenu implements IAbstractMenu {
    public async menu(): Promise<void> {}
}