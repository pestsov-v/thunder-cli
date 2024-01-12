export const CliSymbols = {
  // Services
  DiscoveryService: Symbol('DiscoveryService'),
  ManageService: Symbol('ManageService'),

  // templates
  PrettierTemplate: Symbol('PrettierTemplate'),
  EslintTemplate: Symbol('EslintTemplate'),
  PackageTemplate: Symbol('PackageTemplate'),
  TsconfigTemplate: Symbol('TsconfigTemplate'),
  ServiceTemplate: Symbol('ServiceTemplate'),
  InstallerTemplate: Symbol('InstallerTemplate'),

  // Menus
  ServerCommander: Symbol('ServerCommander'),
  WebClientCommander: Symbol('WebClientCommander'),
  VisualizerCommander: Symbol('VisualizerCommander'),
  CodeFormatterCommander: Symbol('CodeFormatterCommander'),
  TypescriptCommander: Symbol('TypescriptCommander'),
  InstallCommander: Symbol('InstallCommander'),
  InstallerMenu: Symbol('InstallerMenu'),
  ManageCommander: Symbol('ManageCommander'),
  ManageMenu: Symbol('ManageMenu'),

  // Initiator
  Initiator: Symbol('Initiator'),
} as const;
