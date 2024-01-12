import { IAbstractTemplate } from './abstract.template';

export interface ITsconfigTemplate
  extends IAbstractTemplate<NTsconfigTemplate.TemplateArgs, NTsconfigTemplate.Structure> {
  readonly cjsTemplate: NTsconfigTemplate.CjsTemplate;
  readonly typesTemplate: NTsconfigTemplate.TypesTemplate;
}

export namespace NTsconfigTemplate {
  export type TemplateArgs = {
    server?: boolean;
    webClient?: boolean;
    application: string;
    addAlias?: boolean;
  };

  export type CompilerOptions = {
    target: string;
    module: string;
    esModuleInterop?: boolean;
    moduleResolution: string;
    strict?: boolean;
    outDir?: string;
    baseUrl?: string;
    paths?: Record<string, string[]>;
    rootDir?: string;
    jsx?: string;
    declaration?: boolean;
    lib?: string[];
    allowJs?: boolean;
    skipLibCheck?: boolean;
    noEmit?: boolean;
    incremental?: boolean;
    resolveJsonModule?: boolean;
    isolatedModules?: boolean;
    emitDeclarationOnly?: boolean;
  };
  export type Structure = {
    compilerOptions: CompilerOptions;
    include: string[];
    exclude: string[];
  };

  export type CjsTemplate = {
    extends: string;
    compilerOptions: {
      target: CompilerOptions['target'];
      module: CompilerOptions['module'];
      outDir: CompilerOptions['outDir'];
    };
  };

  export type TypesTemplate = {
    extends: string;
    compilerOptions: {
      target: CompilerOptions['target'];
      outDir: CompilerOptions['outDir'];
      module: CompilerOptions['module'];
      declaration: CompilerOptions['declaration'];
      emitDeclarationOnly: CompilerOptions['emitDeclarationOnly'];
    };
  };
}
