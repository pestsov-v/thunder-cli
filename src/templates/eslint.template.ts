import { injectable } from '@Packages';
import { AbstractTemplate } from './abstract.template';

import type { IEslintTemplate, NEslintTemplate } from '@Cli/Types';

@injectable()
export class EslintTemplate extends AbstractTemplate implements IEslintTemplate {
  public structure(): NEslintTemplate.Structure {
    return {
      env: {
        es2021: true,
        node: true,
      },
      extends: ['plugin:import/typescript', 'prettier'],
      overrides: [
        {
          files: ['**/*'],
          rules: {
            'brace-style': 'off',
          },
        },
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2021,
        sourceType: 'module',
      },
      plugins: ['@typescript-eslint', 'eslint-comments', 'promise', 'import', 'prettier'],
      rules: {},
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.d.ts'],
        },
        'import/resolver': {
          node: {
            extensions: ['.js', '.ts', '.d.ts'],
            paths: ['.'],
            moduleDirectory: ['.', 'node_modules'],
          },
          typescript: {
            alwaysTryTypes: true,
            extensions: ['.js', '.ts'],
            project: './tsconfig.json',
            paths: './tsconfig.json',
          },
        },
      },
    };
  }

  public get eslintIgnore(): string {
    return `dist/
node_modules/
.eslintignore
.gitignore
.prettierignore
package.json
package-lock.json
README.md`;
  }
}
