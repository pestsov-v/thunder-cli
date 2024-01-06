import { IAbstractTemplate } from './abstract.template';

export interface ITsconfigTemplate
  extends IAbstractTemplate<NTsconfigTemplate.TemplateArgs, NTsconfigTemplate.Structure> {}

export namespace NTsconfigTemplate {
  export type TemplateArgs = {};
  export type Structure = {};
}
