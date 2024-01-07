export interface IServiceTemplate {
  readonly serverConnectTemplate: string;
  readonly visualizerConnectTemplate: string;
  readonly pagesApp: string;
  readonly pagesDocument: string;
  readonly pagesHome: string;

  getServiceServerEntry(app: string): string;
  getServiceWebClientEntry(app: string): string;
  getServiceServer(app: string): string;
  getServiceWebClient(app: string): string;
  getServices(app: string): string;
}
