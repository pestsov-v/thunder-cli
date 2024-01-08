export interface IServerCommander {
  install(path: string): Promise<void>;
  build(path: string): Promise<void>;
}
