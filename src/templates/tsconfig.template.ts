import { AbstractTemplate } from './abstract.template';
import { ITsconfigTemplate, NTsconfigTemplate } from '@Cli/Types';

export class TsconfigTemplate extends AbstractTemplate implements ITsconfigTemplate {
  public structure(args: NTsconfigTemplate.TemplateArgs): NTsconfigTemplate.Structure {
    return {};
  }
}
