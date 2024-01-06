import { ContainerModule } from '@Packages';
import { CliSymbols } from '@Cli/Symbols';
import { Initiator } from '../initiator';
import { DiscoveryService, ManageService } from '../services';
import {
  InstallerCommander,
  InstallerMenu,
  ManageCommander,
  ManageMenu,
  EdgeMenu,
  VisualizerMenu,
  ServerMenu,
  ServerCommander,
} from '../menus';
import { PackageTemplate, TsconfigTemplate } from '../templates';

import type {
  IAbstractMenu,
  IDiscoveryService,
  IInitiator,
  IManageCommander,
  IManageService,
  IPackageTemplate,
  IServerCommander,
  ITsconfigTemplate,
} from '@Cli/Types';

export const CliModule = new ContainerModule((bind) => {
  // Services
  bind<IDiscoveryService>(CliSymbols.DiscoveryService).to(DiscoveryService).inSingletonScope();
  bind<IManageService>(CliSymbols.ManageService).to(ManageService).inSingletonScope();

  // Templates
  bind<IPackageTemplate>(CliSymbols.PackageTemplate).to(PackageTemplate).inTransientScope();
  bind<ITsconfigTemplate>(CliSymbols.TsconfigTemplate).to(TsconfigTemplate).inTransientScope();

  // Menus
  bind<IAbstractMenu>(CliSymbols.ServerMenu).to(ServerMenu).inTransientScope();
  bind<IServerCommander>(CliSymbols.ServerCommander).to(ServerCommander).inSingletonScope();
  bind<IAbstractMenu>(CliSymbols.EdgeMenu).to(EdgeMenu).inTransientScope();
  bind<IAbstractMenu>(CliSymbols.VisualizerMenu).to(VisualizerMenu).inTransientScope();
  bind(CliSymbols.InstallCommander).to(InstallerCommander).inSingletonScope();
  bind<IAbstractMenu>(CliSymbols.InstallerMenu).to(InstallerMenu).inTransientScope();
  bind<IManageCommander>(CliSymbols.ManageCommander).to(ManageCommander).inSingletonScope();
  bind<IAbstractMenu>(CliSymbols.ManageMenu).to(ManageMenu).inTransientScope();

  // Initiator
  bind<IInitiator>(CliSymbols.Initiator).to(Initiator).inRequestScope();
});
