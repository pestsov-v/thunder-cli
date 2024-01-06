import { injectable } from '@Packages';
import { AbstractTemplate } from './abstract.template';

import type { IPackageTemplate, NPackageTemplate } from '@Cli/Types';

@injectable()
export class PackageTemplate extends AbstractTemplate implements IPackageTemplate {
  public structure(args: NPackageTemplate.TemplateArgs): NPackageTemplate.Structure {
    const { name, description, version, typesVersions } = args;

    return {
      name: name,
      description: description,
      version: version,
      typesVersions: typesVersions,
      main: 'index.ts',
      types: 'index.ts',
      scripts: {
        'start:dev': 'ts-node ./src/index.ts',
        ...args.scripts,
      },
      keywords: ['@chaminjector-schema', name],
    };
  }
}
