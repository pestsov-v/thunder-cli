export interface IInstallerCommander {
    installComputeServer(): Promise<void>
    installVisualizerWebClient(): Promise<void>
    installEdgeWebClient(): Promise<void>
}