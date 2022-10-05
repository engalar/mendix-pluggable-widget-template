import { defineConfig } from "cypress";
import getCompareSnapshotsPlugin from "cypress-image-diff-js/dist/plugin";
import installLogsPrinter from "cypress-terminal-report/src/installLogsPrinter";

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
            getCompareSnapshotsPlugin(on, config);
            installLogsPrinter(on, {
                printLogsToConsole: "onFail"
            });
        },
        baseUrl: "http://localhost:8080",
        retries: 2,
        video: false,
        videoUploadOnPasses: false,
        viewportHeight: 1080,
        viewportWidth: 1280,
        chromeWebSecurity: false,
        specPattern: "cypress/integration/**/*.ts",
        supportFile: "cypress/support/e2e.ts"
    }
});
