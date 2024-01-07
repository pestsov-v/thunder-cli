import { execa, fse, injectable } from '@Packages';
import { CliSymbols } from '@Cli/Symbols';
import { container } from '@Cli/Container';

import type { IServerCommander, IServiceTemplate } from '@Cli/Types';

@injectable()
export class ServerCommander implements IServerCommander {
  public async install(path: string): Promise<void> {
    try {
      await execa(
        'npm',
        [
          'install',
          '@chaminjector/server@latest',
          '@chaminjector/web-client@latest',
          '@chaminjector/visualizer@latest',
        ],
        {
          stdio: 'inherit',
          cwd: path,
        }
      );
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async connect(path: string): Promise<void> {
    await fse.writeFile(
      path + '/server.ts',
      container.get<IServiceTemplate>(CliSymbols.ServiceTemplate).serverConnectTemplate
    );
  }
}
