import { browser } from "protractor";

export async function getAngularWaitState() {
    return await browser.waitForAngularEnabled();
}

export async function enableAngularWait() {
    await browser.waitForAngularEnabled(true);
}

export async function disableAngularWait() {
    await browser.waitForAngularEnabled(false);
}
