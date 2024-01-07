import { ContainerModule } from '@Packages';
import { CliSymbols } from '@Cli/Symbols';
import { Initiator } from '../initiator';
import { DiscoveryService, ManageService } from '../services';
import {
  EslintTemplate,
  PackageTemplate,
  PrettierTemplate,
  TsconfigTemplate,
  ServiceTemplate,
} from '../templates';
import {
  CodeFormatterCommander,
  InstallerCommander,
  InstallerMenu,
  ManageCommander,
  ManageMenu,
  ServerCommander,
  TypescriptCommander,
  VisualizerCommander,
  WebClientCommander,
} from '../menus';

import type {
  IAbstractMenu,
  IDiscoveryService,
  IEslintTemplate,
  IInitiator,
  IManageCommander,
  IManageService,
  IPackageTemplate,
  IPrettierTemplate,
  IServerCommander,
  ITsconfigTemplate,
  IServiceTemplate,
  IInstallerCommander,
  IWebClientCommander,
  IVisualizerCommander,
  ICodeFormatterCommander,
  ITypescriptCommander,
} from '@Cli/Types';

export const CliModule = new ContainerModule((bind) => {
  // Services
  bind<IDiscoveryService>(CliSymbols.DiscoveryService).to(DiscoveryService).inSingletonScope();
  bind<IManageService>(CliSymbols.ManageService).to(ManageService).inSingletonScope();

  // Templates
  bind<IPrettierTemplate>(CliSymbols.PrettierTemplate).to(PrettierTemplate).inTransientScope();
  bind<IEslintTemplate>(CliSymbols.EslintTemplate).to(EslintTemplate).inTransientScope();
  bind<IPackageTemplate>(CliSymbols.PackageTemplate).to(PackageTemplate).inTransientScope();
  bind<ITsconfigTemplate>(CliSymbols.TsconfigTemplate).to(TsconfigTemplate).inTransientScope();
  bind<IServiceTemplate>(CliSymbols.ServiceTemplate).to(ServiceTemplate).inTransientScope();

  // Menus
  bind<IServerCommander>(CliSymbols.ServerCommander).to(ServerCommander).inSingletonScope();
  bind<IWebClientCommander>(CliSymbols.WebClientCommander)
    .to(WebClientCommander)
    .inSingletonScope();
  bind<IVisualizerCommander>(CliSymbols.VisualizerCommander)
    .to(VisualizerCommander)
    .inSingletonScope();
  bind<ICodeFormatterCommander>(CliSymbols.CodeFormatterCommander)
    .to(CodeFormatterCommander)
    .inSingletonScope();
  bind<ITypescriptCommander>(CliSymbols.TypescriptCommander)
    .to(TypescriptCommander)
    .inSingletonScope();
  bind<IInstallerCommander>(CliSymbols.InstallCommander).to(InstallerCommander).inSingletonScope();
  bind<IAbstractMenu>(CliSymbols.InstallerMenu).to(InstallerMenu).inTransientScope();
  bind<IManageCommander>(CliSymbols.ManageCommander).to(ManageCommander).inSingletonScope();
  bind<IAbstractMenu>(CliSymbols.ManageMenu).to(ManageMenu).inTransientScope();

  // Initiator
  bind<IInitiator>(CliSymbols.Initiator).to(Initiator).inRequestScope();
});
