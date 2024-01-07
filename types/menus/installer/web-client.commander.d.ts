export interface IWebClientCommander {
  install(path: string): Promise<void>;
  connect(path: string, service: string): Promise<void>;
}
