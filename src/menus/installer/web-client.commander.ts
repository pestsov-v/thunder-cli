import { execa, fse, injectable } from '@Packages';
import { container } from '@Cli/Container';
import { CliSymbols } from '@Cli/Symbols';

import type { IServiceTemplate, IWebClientCommander } from '@Cli/Types';

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
          [
            'install',
            '--save-dev',
            'next@latest',
            'react@latest',
            'react-dom@latest',
            '@types/react',
          ],
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
      await fse.ensureDir(path + `/src/pages`);
      await fse.writeFile(path + `/src/pages/_app.tsx`, engine.pagesApp);
      await fse.writeFile(path + `/src/pages/_document.tsx`, engine.pagesDocument);
      await fse.writeFile(path + `/src/pages/index.tsx`, engine.pagesHome);
      await fse.writeFile(path + `/src/pages/globals.css`, '');
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
