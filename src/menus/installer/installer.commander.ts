import {injectable} from '../../packages'
import {IInstallerCommander} from "@Cli/Types";

@injectable()
export class InstallerCommander implements IInstallerCommander {
    public async installComputeServer(): Promise<void> {}

    public async installVisualizerWebClient(): Promise<void> {}
    public async installEdgeWebClient(): Promise<void> {}
}