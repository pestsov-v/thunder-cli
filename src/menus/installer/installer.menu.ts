import {injectable, inject, inquirer} from '../../packages'
import {AbstractMenu} from "../abstract.menu";

import {IAbstractMenu, IInstallerCommander} from "@Cli/Types";
import {CliSymbols} from "@Cli/Symbols";

@injectable()
export class InstallerMenu extends AbstractMenu implements IAbstractMenu {
    constructor(
        @inject(CliSymbols.InstallerCommander)
        private readonly _installerCommander: IInstallerCommander
    ) {
        super();
    }

    private _charmInjectorParts = {
        COMPUTE_SERVER: 'Compute server',
        VISUALIZER: 'Visualizer web-client',
        EDGE: "Edge web-client"
    }

    private _prompts = {
        CHARM_INJECTOR_PARTS: ['Compute server', 'Visualizer web-client', "Edge web-client"]
    }



    public async menu(): Promise<void> {
        const {CHARM_INJECTOR_PARTS} = await inquirer.prompt<typeof this._prompts>({
            type: 'checkbox',
            name: Object.keys(this._prompts)[0],
            choices: [
                this._charmInjectorParts.COMPUTE_SERVER,
                this._charmInjectorParts.VISUALIZER,
                this._charmInjectorParts.EDGE
            ],
        })

        for (const index in CHARM_INJECTOR_PARTS) {
            const part = CHARM_INJECTOR_PARTS[index]
            if (part === this._charmInjectorParts.COMPUTE_SERVER) {
                await this._installerCommander.installComputeServer()
            }
            if (part === this._charmInjectorParts.COMPUTE_SERVER) {
                await this._installerCommander.installVisualizerWebClient()
            }
            if (part === this._charmInjectorParts.COMPUTE_SERVER) {
                await this._installerCommander.installEdgeWebClient()
            }
        }
    }
}