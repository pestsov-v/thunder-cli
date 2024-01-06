import {injectable} from '@Packages'

import type {IManageCommander} from "@Cli/Types";
@injectable()
export class ManageCommander implements IManageCommander {

    public async services(): Promise<void> {}
    public async help(): Promise<void> {}
    public async exit(): Promise<void> {}
}