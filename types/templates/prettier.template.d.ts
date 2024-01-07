import { IAbstractTemplate } from './abstract.template';

export interface IPrettierTemplate
  extends IAbstractTemplate<NPrettierTemplate.TemplateArgs, NPrettierTemplate.Structure> {
  readonly prettierIgnore: string;
}

export namespace NPrettierTemplate {
  export type TemplateArgs = {};

  export type Structure = {
    printWidth: number;
    tabWidth: number;
    semi: boolean;
    singleQuote: boolean;
    trailingComma: string;
  };
}
