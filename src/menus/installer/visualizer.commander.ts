import { execa, fse, injectable } from '@Packages';
import type { IServiceTemplate, IVisualizerCommander } from '@Cli/Types';
import { container } from '@Cli/Container';
import { CliSymbols } from '@Cli/Symbols';

@injectable()
export class VisualizerCommander implements IVisualizerCommander {
  public async install(path: string): Promise<void> {
    try {
      await execa('npm', ['install', '@chaminjector/visualizer@latest'], {
        stdio: 'inherit',
        cwd: path,
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async connect(path: string): Promise<void> {
    await fse.writeFile(
      path + '/visualizer.ts',
      container.get<IServiceTemplate>(CliSymbols.ServiceTemplate).visualizerConnectTemplate
    );
  }
}
