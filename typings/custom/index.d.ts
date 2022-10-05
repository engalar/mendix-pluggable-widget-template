declare module "cypress-image-diff-js/dist/plugin" {
    declare function getCompareSnapshotsPlugin(on, config): void;
    export = getCompareSnapshotsPlugin;
}

declare module "cypress-image-diff-js/dist/command" {
    declare function compareSnapshotCommand(): void;
    export = compareSnapshotCommand;
}
