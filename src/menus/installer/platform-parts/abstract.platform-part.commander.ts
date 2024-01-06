import {execa, injectable} from '@Packages'
import {
    IAbstractPlatformPartCommander, NAbstractPlatformPartCommander
} from "@Cli/Types";

@injectable()
export abstract class AbstractPlatformPartCommander implements IAbstractPlatformPartCommander {
    public abstract install(): Promise<void>

    protected async _install(pack: NAbstractPlatformPartCommander.Package): Promise<void> {
        try {
            await execa('npm', ['install', pack], { stdio: 'inherit' });
        } catch (error) {
            console.error(error);
        }
    }
}