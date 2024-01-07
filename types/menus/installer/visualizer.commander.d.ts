export interface IVisualizerCommander {
  install(path: string): Promise<void>;
  connect(path: string): Promise<void>;
}
