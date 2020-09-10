import { browser } from "protractor";

// Known issue for chrome, direct maximize window doesn't work
export async function maximizeWindow() {
    class Size {
        width: number;
        height: number;
    }

    const windowSize = await this.executeScript(function () {
        return {
            width: window.screen.availWidth,
            height: window.screen.availHeight
        };
    });

    const result = windowSize as Size;

    return this.setWindowSize(result.width, result.height);
}

/**
 * Set window size
 * @param {number} width
 * @param {number} height
 */
export async function setWindowSize(width: number, height: number) {
    return browser.driver
        .manage()
        .window()
        .setSize(width, height);
}

/**
 * Wrapper for executing javascript code
 * @param {string | Function} script
 * @param varAargs
 * @returns {promise.Promise<any>}
 */
export async function executeScript(script: string | Function,
                           ...varAargs: any[]) {
    return browser.driver.executeScript(script, varAargs);
}
