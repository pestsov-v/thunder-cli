export interface IWebClientCommander {
  install(path: string): Promise<void>;
  build(path: string, service: string): Promise<void>;
}
