export const CliSymbols = {
    // Services
    DiscoveryService: Symbol('DiscoveryService'),
    ManageService: Symbol('ManageService'),

    // Menus
    InstallerCommander: Symbol('InstallerCommander'),
    InstallerMenu: Symbol('InstallerMenu'),
    ManageCommander: Symbol('ManageCommander'),
    ManageMenu: Symbol('ManageMenu'),

    // Initiator
    Initiator: Symbol('Initiator')
} as const