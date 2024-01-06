import { IAbstractTemplate } from './abstract.template';
import { StringObject, UnknownObject } from '../utility';

export interface IPackageTemplate
  extends IAbstractTemplate<NPackageTemplate.TemplateArgs, NPackageTemplate.Structure> {}

export namespace NPackageTemplate {
  export type TemplateArgs = {
    name: Structure['name'];
    description: Structure['description'];
    version: Structure['version'];
    typesVersions: Structure['typesVersions'];
    scripts?: StringObject;
  };
  export type Structure = {
    name: string;
    description: string;
    version: string;
    typesVersions: UnknownObject;
    main: 'index.ts';
    types: 'index.ts';
    scripts: {
      'start:dev': string;
    } & StringObject;
    keywords: string[];
  };
}
