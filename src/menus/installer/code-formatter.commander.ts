import { execa, fse, injectable } from '@Packages';

import type { ICodeFormatterCommander, IEslintTemplate, IPrettierTemplate } from '@Cli/Types';
import { container } from '@Cli/Container';
import { CliSymbols } from '@Cli/Symbols';

@injectable()
export class CodeFormatterCommander implements ICodeFormatterCommander {
  public async install(path: string): Promise<void> {
    try {
      await execa(
        'npm',
        [
          'install',
          '--save-dev',
          'eslint@8.34.0',
          'eslint-config-airbnb-base@15.0.0',
          'eslint-config-prettier@8.6.0',
          'eslint-import-resolver-typescript@3.5.3',
          'eslint-plugin-eslint-comments@3.2.0',
          'eslint-plugin-import@2.27.5',
          'eslint-plugin-prettier@4.2.1',
          'eslint-plugin-promise@6.1.1',
          'eslint-plugin-unused-imports@2.0.0',
          'prettier@2.8.7',
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

  public async build(path: string): Promise<void> {
    const eslint = container.get<IEslintTemplate>(CliSymbols.EslintTemplate);
    const prettier = container.get<IPrettierTemplate>(CliSymbols.PrettierTemplate);

    try {
      await fse.writeJSON(path + '/.eslintrc.json', eslint.structure({}));
      await fse.writeFile(path + '/.eslintignore', eslint.eslintIgnore);

      await fse.writeJSON(path + '/.prettierrc', prettier.structure({}));
      await fse.writeFile(path + '/.prettierignore', prettier.prettierIgnore);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
