import {injectable, inject, inquirer} from '@Packages'
import {CliSymbols} from "@Cli/Symbols";
import {AbstractMenu} from "../abstract.menu";

import {IManageCommander, NManageMenu} from "@Cli/Types";

@injectable()
export class ManageMenu extends AbstractMenu {
    private readonly _commands = {
        SERVICES: 'Services',
        HELP: 'Help',
        EXIT: 'Exit'
    }

    constructor(
        @inject(CliSymbols.ManageCommander)
        private readonly _manageCommander: IManageCommander
    ) {
        super();
    }

    public async menu(): Promise<void> {
        const {MANAGE_MENU_KIND} = await inquirer.prompt<NManageMenu.Kind>([
            {
                type: 'list',
                name: 'MANAGE_MENU_KIND',
                choices: [
                    this._commands.SERVICES,
                    this._commands.HELP,
                    this._commands.EXIT
                ]
            }
        ])

        switch (MANAGE_MENU_KIND) {
            case this._commands.SERVICES:
                await this._manageCommander.services()
                await this.menu()
                break
            case this._commands.HELP:
                await this._manageCommander.help()
                await this.menu()
                break
            case this._commands.EXIT:
                await this._manageCommander.exit()
                break
            default:
                throw new Error('Unsupported menu interface command.')
        }
    }
}