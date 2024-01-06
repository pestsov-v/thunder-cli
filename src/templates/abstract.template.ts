import { injectable } from '@Packages';
import { NestedObject } from '@Cli/Types';

@injectable()
export abstract class AbstractTemplate<ARGS = any, T extends NestedObject = NestedObject> {
  public abstract structure(args: ARGS): T;
}
