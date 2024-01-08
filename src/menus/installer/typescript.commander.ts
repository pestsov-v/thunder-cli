import { execa, fse, injectable } from '@Packages';
import { container } from '@Cli/Container';
import { CliSymbols } from '@Cli/Symbols';

import { ITsconfigTemplate, ITypescriptCommander, NTypescriptCommander } from '@Cli/Types';

@injectable()
export class TypescriptCommander implements ITypescriptCommander {
  public async install(path: string): Promise<void> {
    try {
      await execa('npm', ['install', 'ts-node', 'tsc-alias', 'tsconfig-paths', 'typescript'], {
        stdio: 'inherit',
        cwd: path,
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async build(path: string, options: NTypescriptCommander.Options): Promise<void> {
    const engine = container.get<ITsconfigTemplate>(CliSymbols.TsconfigTemplate);

    const baseTemplate = engine.structure({
      application: options.application,
      webClient: true,
      server: true,
      addAlias: true,
    });

    try {
      await fse.writeJSON(path + '/tsconfig.json', baseTemplate);
      if (options.formatExtends.length > 0) {
        for (const index in options.formatExtends) {
          const format = options.formatExtends[index];
          switch (format) {
            case 'CommonJS':
              await fse.writeJSON(path + '/tsconfig.cjs.json', engine.cjsTemplate);
              break;
            case 'Typescript':
              await fse.writeJSON(path + '/tsconfig.types.json', engine.typesTemplate);
              break;
          }
        }
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
