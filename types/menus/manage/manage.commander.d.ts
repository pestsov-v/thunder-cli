export interface IManageCommander {
    services(): Promise<void>
    help(): Promise<void>
    exit(): Promise<void>
}