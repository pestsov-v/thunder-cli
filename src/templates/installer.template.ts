import { injectable } from '@Packages';
import type { IInstallerTemplate } from '@Cli/Types';

@injectable()
export class InstallerTemplate implements IInstallerTemplate {
  public get server(): string {
    return this._buildInstaller('server');
  }

  public get visualizer(): string {
    return this._buildInstaller('visualizer');
  }

  private _buildInstaller(part: 'server' | 'visualizer') {
    return `import {serverInitiator} from "@chaminjector/${part}";

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
});
`;
  }
}
