import { AbstractTemplate } from './abstract.template';

import type { ITsconfigTemplate, NTsconfigTemplate } from '@Cli/Types';

export class TsconfigTemplate extends AbstractTemplate implements ITsconfigTemplate {
  public structure(args: NTsconfigTemplate.TemplateArgs): NTsconfigTemplate.Structure {
    const structure: NTsconfigTemplate.Structure = {
      compilerOptions: {
        target: 'ESNext',
        module: 'CommonJS',
        esModuleInterop: true,
        moduleResolution: 'Node',
        strict: true,
        outDir: './dist',
        jsx: 'preserve',
        baseUrl: './',
        rootDir: './src',
        lib: ['dom', 'dom.iterable', 'esnext'],
        allowJs: true,
        skipLibCheck: true,
        noEmit: true,
        incremental: true,
        resolveJsonModule: true,
        isolatedModules: true,
      },
      include: ['./src/**/*'],
      exclude: ['node_modules', 'dist'],
    };

    if (args.addAlias) {
      structure.compilerOptions.paths = {};
      structure.compilerOptions.paths = {
        [`~${args.application}/*`]: [`./src/${args.application}/domains/*`],
        [`~${args.application}/Types/*`]: [`./types/${args.application}/domains/*`],
      };
    }

    return structure;
  }

  public get cjsTemplate(): NTsconfigTemplate.CjsTemplate {
    return {
      extends: './tsconfig.json',
      compilerOptions: {
        target: 'ES2021',
        outDir: './dist/_cjs',
        module: 'CommonJS',
      },
    };
  }

  public get typesTemplate(): NTsconfigTemplate.TypesTemplate {
    return {
      extends: './tsconfig.json',
      compilerOptions: {
        target: 'ESNext',
        outDir: './dist/_types',
        module: 'ESNext',
        declaration: true,
        emitDeclarationOnly: true,
      },
    };
  }
}
