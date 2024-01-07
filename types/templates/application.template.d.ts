export interface IServiceTemplate {
  readonly serverConnectTemplate: string;
  readonly visualizerConnectTemplate: string;

  getServiceServerEntry(app: string): string;
  getServiceWebClientEntry(app: string): string;
  getServiceServer(app: string): string;
  getServiceWebClient(app: string): string;
  getServices(app: string): string;
}
