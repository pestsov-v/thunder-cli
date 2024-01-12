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
        'server:dev': `NODE_ENV=development SCHEMA_PROFILE=${name} ts-node server.ts`,
        'web-client:dev': `NODE_ENV=development SCHEMA_PROFILE=${name} ts-node visualizer.ts`,
        'server:prod': `NODE_ENV=production SCHEMA_PROFILE=${name} ts-node server.ts`,
        'web-client:prod': `NODE_ENV=production SCHEMA_PROFILE=${name} ts-node visualizer.ts`,
        'build:packages':
          'rm -rf dist && tsc -p tsconfig.cjs.json && tsc -p tsconfig.types.json && cp package.json dist/package.json',
        'add:types': 'cp -r types dist/types',
        'add:imports': 'echo \'export * from "../types";\' >> ./dist/_types/index.d.ts',
        'add:package':
          'echo \'{"type": "commonjs"}\' > dist/_cjs/package.json && cp README.md dist/README.md',
        'build:dist':
          'npm run build:packages && npm run add:types && npm run add:imports && npm run add:package',
        'resolve:path':
          'tsc-alias -v --dir dist/_cjs -p tsconfig.cjs.json && tsc-alias -v --dir dist/_types -p tsconfig.types.json',
        'build:prod': 'npm run build:dist && npm run resolve:path',
        ...args.scripts,
      },
      keywords: ['@chaminjector-schema', name],
    };
  }
}
