import { NestedObject } from '../utility';

export interface IAbstractTemplate<
  ARGS = Record<string, unknown>,
  T extends NestedObject = NestedObject
> {
  structure(args: ARGS): T;
}
