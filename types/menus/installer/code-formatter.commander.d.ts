export interface ICodeFormatterCommander {
  install(path: string): Promise<void>;
  build(path: string): Promise<void>;
}
