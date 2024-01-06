import {injectable } from '@Packages'

@injectable()
export abstract class AbstractMenu {
    public abstract menu(): Promise<void>
}