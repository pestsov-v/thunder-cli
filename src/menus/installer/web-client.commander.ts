import { execa, fse, injectable } from '@Packages';

import type { IWebClientCommander } from '@Cli/Types';

@injectable()
export class WebClientCommander implements IWebClientCommander {
  public async install(path: string): Promise<void> {
    try {
      await execa('npm', ['install', '@chaminjector/web-client@latest'], {
        stdio: 'inherit',
        cwd: path,
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async connect(path: string, service: string): Promise<void> {
    // await fse.writeFile(path + `/src/pages/${service}/pages/_app.tsx`, '');
  }
}
