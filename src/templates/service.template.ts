import { injectable } from '@Packages';
import type { IServiceTemplate } from '@Cli/Types';

@injectable()
export class ServiceTemplate implements IServiceTemplate {
  public getServiceServerEntry(service: string): string {
    return `export * from './${service}/${service}.server.app'`;
  }

  public getServiceWebClientEntry(service: string): string {
    return `export * from './${service}/${service}.web-client.app'`;
  }

  public getServiceServer(service: string): string {
    return `import {setApplication} from "@chaminjector/server";
import {ServiceName} from "../services";

export const SysAdminApplication = setApplication(ServiceName.${service}, [])`;
  }

  public getServiceWebClient(service: string): string {
    return `import {setApplication} from "@chaminjector/web-client";
import {ServiceName} from "../services";

export const SysAdminApplication = setApplication(ServiceName.${service}, [])`;
  }

  public getServices(service: string): string {
    return `export const ServiceName = {
  ${service}: '${service}',
} as const;`;
  }

  public get serverConnectTemplate(): string {
    return this._abstractConnectTemplate('@chaminjector/server');
  }

  public get visualizerConnectTemplate(): string {
    return this._abstractConnectTemplate('@chaminjector/visualizer');
  }

  private _abstractConnectTemplate(
    pack: '@chaminjector/server' | '@chaminjector/visualizer'
  ): string {
    return `import {serverInitiator} from "${pack}";

const startServer = async () => {
    await serverInitiator.start();

};

const stopServer = async () => {
    await serverInitiator.stop();
    process.removeAllListeners();
    process.exit(0);
};

process.on('SIGTERM', stopServer);
process.on('SIGINT', stopServer);
process.on('SIGHUP', stopServer);
process.on('uncaughtException', (e) => {
    console.error(e);
    serverInitiator.stop().then(() => {
        process.exit(1);
    });
});
process.on('unhandledRejection', (reason, parameter) => {
    parameter.catch((e) => {
        console.error(e);
        serverInitiator.stop().then(() => {
            process.exit(1);
        });
    });
});

startServer().catch((e) => {
    console.log('Server end with error: ', e);
});`;
  }
}