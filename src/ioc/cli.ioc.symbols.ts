export const CliSymbols = {
  // Services
  DiscoveryService: Symbol('DiscoveryService'),
  ManageService: Symbol('ManageService'),

  // templates
  PackageTemplate: Symbol('PackageTemplate'),
  TsconfigTemplate: Symbol('TsconfigTemplate'),

  // Menus
  EdgeMenu: Symbol('EdgeMenu'),
  ServerMenu: Symbol('ServerMenu'),
  ServerCommander: Symbol('ServerCommander'),
  VisualizerMenu: Symbol('VisualizerMenu'),
  InstallCommander: Symbol('InstallCommander'),
  InstallerMenu: Symbol('InstallerMenu'),
  ManageCommander: Symbol('ManageCommander'),
  ManageMenu: Symbol('ManageMenu'),

  // Initiator
  Initiator: Symbol('Initiator'),
} as const;
