export interface IAbstractPlatformPartCommander {
    install(): Promise<void>
}

export namespace NAbstractPlatformPartCommander {
    export type Package = '@chaminjector/server@latest' | '@chaminjector/visualizer@latest' | '@chaminjector/web-client@latest'
}