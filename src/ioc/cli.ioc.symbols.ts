export const CliSymbols = {
    // Services
    DiscoveryService: Symbol('DiscoveryService'),
    ManageService: Symbol('ManageService'),

    // Menus
    EdgeMenu: Symbol('EdgeMenu'),
    ServerMenu: Symbol('ServerMenu'),
    ServerCommander: Symbol('ServerCommander'),
    VisualizerMenu: Symbol('VisualizerMenu'),
    InstallerMenu: Symbol('InstallerMenu'),
    ManageCommander: Symbol('ManageCommander'),
    ManageMenu: Symbol('ManageMenu'),

    // Initiator
    Initiator: Symbol('Initiator')
} as const