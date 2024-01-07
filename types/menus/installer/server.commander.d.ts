export interface IServerCommander {
  install(path: string): Promise<void>;
  connect(path: string): Promise<void>;
}
