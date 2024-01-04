import {injectable } from '../packages'

@injectable()
export abstract class AbstractMenu {
    public abstract menu(): Promise<void>
}