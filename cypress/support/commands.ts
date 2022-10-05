import compareSnapshotCommand from "cypress-image-diff-js/dist/command";
require("cypress-terminal-report/src/installLogsCollector")();

compareSnapshotCommand();

Cypress.Commands.add<any>("dragAndDrop", (subject: string, target: string, dragIndex: number, dropIndex: number) => {
    cy.get(subject).should("be.visible", { timeout: 20000 });
    Cypress.log({
        name: "DRAGNDROP",
        message: `Dragging element ${subject} to ${target}`,
        consoleProps: () => {
            return {
                subject: subject,
                target: target
            };
        }
    });
    const BUTTON_INDEX = 0;
    const SLOPPY_CLICK_THRESHOLD = 10;
    cy.get(target)
        .eq(dropIndex)
        .then($target => {
            const coordsDrop = $target[0].getBoundingClientRect();
            cy.get(subject)
                .eq(dragIndex)
                .then(subject => {
                    const coordsDrag = subject[0].getBoundingClientRect();
                    cy.wrap(subject)
                        .trigger("mousedown", {
                            button: BUTTON_INDEX,
                            clientX: coordsDrag.x,
                            clientY: coordsDrag.y,
                            force: true
                        })
                        .trigger("mousemove", {
                            button: BUTTON_INDEX,
                            clientX: coordsDrag.x + SLOPPY_CLICK_THRESHOLD,
                            clientY: coordsDrag.y,
                            force: true
                        })
                        .wait(1000);
                    cy.get("body")
                        .trigger("mousemove", {
                            button: BUTTON_INDEX,
                            clientX: coordsDrop.x,
                            clientY: coordsDrop.y,
                            force: true
                        })
                        .trigger("mouseup");
                });
        });
});

const logCommand = ({ options, originalOptions }: any): void => {
    if (options.log) {
        options.logger({
            name: options.description,
            message: options.customMessage,
            consoleProps: () => originalOptions
        });
    }
};
const logCommandCheck = ({ result, options, originalOptions }: any) => {
    if (!options.log || !options.verbose) return;

    const message = [result];
    if (options.customCheckMessage) {
        message.unshift(options.customCheckMessage);
    }
    options.logger({
        name: options.description,
        message,
        consoleProps: () => originalOptions
    });
};

const waitUntil = (subject: string, checkFunction: Function, originalOptions = {}): any => {
    if (!(checkFunction instanceof Function)) {
        throw new Error("`checkFunction` parameter should be a function. Found: " + checkFunction);
    }

    const defaultOptions = {
        // base options
        interval: 200,
        timeout: 5000,
        errorMsg: "Timed out retrying",

        // log options
        description: "waitUntil",
        log: true,
        customMessage: undefined,
        logger: Cypress.log,
        verbose: false,
        customCheckMessage: undefined,
        throwError: true
    };
    const options: any = { ...defaultOptions, ...originalOptions };

    // filter out a falsy passed "customMessage" value
    options.customMessage = [options.customMessage, originalOptions].filter(Boolean);

    let retries = Math.floor(options.timeout / options.interval);

    logCommand({ options, originalOptions });

    const check = (result: any) => {
        logCommandCheck({ result, options, originalOptions });
        if (result) {
            return result;
        }
        if (retries < 1) {
            const msg = options.errorMsg instanceof Function ? options.errorMsg(result, options) : options.errorMsg;
            if (options.throwError) {
                throw new Error(msg);
            }
            return false;
        }
        cy.wait(options.interval, { log: false }).then(() => {
            retries--;
            return resolveValue();
        });
    };

    const resolveValue = () => {
        const result = checkFunction(subject);

        const isAPromise = Boolean(result && result.then);
        if (isAPromise) {
            return result.then(check);
        } else {
            return check(result);
        }
    };

    return resolveValue();
};

Cypress.Commands.add<any>("waitUntil", { prevSubject: "optional" } as any, waitUntil);
