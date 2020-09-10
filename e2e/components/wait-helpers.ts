import * as Timeouts from "./timeouts";
import { browser, ElementFinder, protractor } from "protractor";

const EC = protractor.ExpectedConditions;

/**
 * Wait for an element to be displayed
 * @param {ElementFinder} targetElement
 * @param {number} timeout
 * @param {string} message
 * @returns {Promise<>}
 */
export async function waitForElementToBeDisplayed(targetElement: ElementFinder,
                                                  timeout = Timeouts.DEFAULT_ELEMENT_WAIT_TIMEOUT,
                                                  message = " element should be displayed") {
    return await browser.wait(EC.visibilityOf(targetElement),
        timeout, targetElement.locator().toString() + message);
}

/**
 * Wait for an element to be presented
 * @param {ElementFinder} targetElement
 * @param {number} timeout
 * @param {string} message
 * @returns {Promise<>}
 */
export async function waitForElementToBePresented(targetElement: ElementFinder,
                                                  timeout = Timeouts.DEFAULT_ELEMENT_WAIT_TIMEOUT,
                                                  message = " element should be presented") {
    return await browser.wait(EC.presenceOf(targetElement),
        timeout, targetElement.locator().toString() + message);
}

/**
 * Wait for an element to be hidden
 * @param {ElementFinder} targetElement
 * @param {number} timeout
 * @param {string} message
 * @returns {Promise<>}
 */
export async function waitForElementToBeHidden(targetElement: ElementFinder,
                                               timeout = Timeouts.DEFAULT_ELEMENT_WAIT_TIMEOUT,
                                               message = " element should be hidden") {
    return await browser.wait(EC.invisibilityOf(targetElement),
        timeout, targetElement.locator().toString() + message);
}

/**
 * Wait for an element to be staled
 * @param {ElementFinder} targetElement
 * @param {number} timeout
 * @param {string} message
 * @returns {Promise<>}
 */
export async function waitForElementToBeStaled(targetElement: ElementFinder,
                                               timeout = Timeouts.DEFAULT_ELEMENT_WAIT_TIMEOUT,
                                               message = " element should be staled") {
    return await browser.wait(EC.stalenessOf(targetElement),
        timeout, targetElement.locator().toString() + message);
}

/**
 * Wait for an element to become clickable
 * @param {ElementFinder} targetElement
 * @param {number} timeout
 * @param {string} message
 * @returns {Promise<>}
 */
export async function waitForElementToBeClickable(targetElement: ElementFinder,
                                                  timeout = Timeouts.DEFAULT_ELEMENT_WAIT_TIMEOUT,
                                                  message = " element is not clickable") {
    return await browser.wait(EC.elementToBeClickable(targetElement),
        timeout, targetElement.locator().toString() + message);
}

/**
 * Wait until fn returns true
 * @param {Function} fn
 * @param {number} timeout
 * @param {string} message
 * @returns {Promise<>}
 */
export async function waitForCustomCondition(fn: Function,
                                             timeout = Timeouts.DEFAULT_ELEMENT_WAIT_TIMEOUT,
                                             message = "Failure at Custom condition") {
    return await browser.wait(async () => {
            if (await fn()) {
                return true;
            }
        }, timeout, message);
}

/**
 * Static wait for the specified time period
 * @param {number} millisecondsValue
 * @returns {Promise<>}
 */
export async function staticWait(millisecondsValue = 0) {
    return await new Promise(r => setTimeout(r, millisecondsValue ));
}
