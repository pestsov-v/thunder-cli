import { injectable } from '@Packages';
import { AbstractTemplate } from './abstract.template';

import type { IPrettierTemplate, NPrettierTemplate } from '@Cli/Types';

@injectable()
export class PrettierTemplate extends AbstractTemplate implements IPrettierTemplate {
  public structure(): NPrettierTemplate.Structure {
    return {
      printWidth: 100,
      tabWidth: 2,
      semi: true,
      singleQuote: true,
      trailingComma: 'es5',
    };
  }

  public get prettierIgnore(): string {
    return `dist/
.eslintignore 
.gitignore
.prettierignore
package-lock.json
LICENSE`;
  }
}
