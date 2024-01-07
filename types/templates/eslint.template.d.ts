import { IAbstractTemplate } from './abstract.template';
import { NestedObject, StringObject } from '../utility';

export interface IEslintTemplate
  extends IAbstractTemplate<NEslintTemplate.TemplateArgs, NEslintTemplate.Structure> {
  readonly eslintIgnore: string;
}

export namespace NEslintTemplate {
  export type TemplateArgs = {};

  export type Override = {
    files: string[];
    rules: StringObject;
  };
  export type Structure = {
    env: {
      es2021: boolean;
      node: boolean;
    };
    extends: string[];
    overrides?: Override[];
    parser: string;
    parserOptions: {
      project: string;
      ecmaVersion: number;
      sourceType: string;
    };
    plugins: string[];
    rules: NestedObject;
    settings: NestedObject;
  };
}
