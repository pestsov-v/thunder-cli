export interface IVisualizerCommander {
  install(path: string): Promise<void>;
  build(path: string): Promise<void>;
}
