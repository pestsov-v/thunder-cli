import { execa, fse, injectable } from '@Packages';

import type { IServiceTemplate, IWebClientCommander } from '@Cli/Types';
import { container } from '@Cli/Container';
import { CliSymbols } from '@Cli/Symbols';

@injectable()
export class WebClientCommander implements IWebClientCommander {
  public async install(path: string): Promise<void> {
    try {
      await Promise.all([
        await execa('npm', ['install', '@chaminjector/web-client@latest'], {
          stdio: 'inherit',
          cwd: path,
        }),
        await execa(
          'npm',
          ['install', '--save-dev', 'next@latest', 'react@latest', 'react-dom@latest'],
          {
            stdio: 'inherit',
            cwd: path,
          }
        ),
      ]);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async build(path: string, service: string): Promise<void> {
    const engine = container.get<IServiceTemplate>(CliSymbols.ServiceTemplate);

    try {
      await fse.ensureDir(path + `/src/${service}/pages`);
      await fse.writeFile(path + `/src/${service}/pages/_app.tsx`, engine.pagesApp);
      await fse.writeFile(path + `/src/${service}/pages/_document.tsx`, engine.pagesApp);
      await fse.writeFile(path + `/src/${service}/pages/index.tsx`, engine.pagesHome);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
