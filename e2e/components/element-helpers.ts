import { browser, ElementArrayFinder, ElementFinder } from "protractor";

import { DEFAULT_ELEMENT_WAIT_TIMEOUT } from "./timeouts";

import * as AngularHelpers from "./angular-helpers";
import * as WaitHelpers from "./wait-helpers";

/**
 * Checks whether an element is displayed on page or not
 * @param {ElementFinder} targetElement
 * @param {boolean} toWait
 * @param {boolean} expectedState
 * @param {number} timeout
 * @returns {Promise<boolean>}
 */
export async function isDisplayed(targetElement: ElementFinder, expectedState: boolean,
                                  toWait = true, timeout = DEFAULT_ELEMENT_WAIT_TIMEOUT) {
    let caughtException = false;
    if (toWait) {
        expectedState ?
            await WaitHelpers.waitForElementToBeDisplayed(targetElement, timeout)
                .catch(() => caughtException = true) :
            await WaitHelpers.waitForElementToBeHidden(targetElement, timeout)
                .catch(() => caughtException = true);
    }

    return !caughtException && await targetElement.isDisplayed();
}

/**
 * Checks whether an element is presented on page or not
 * @param {ElementFinder} targetElement
 * @param {boolean} expectedState
 * @param {boolean} toWait
 * @param {number} timeout
 * @returns {Promise<boolean>}
 */
export async function isPresented(targetElement: ElementFinder, expectedState: boolean,
                                  toWait = true, timeout = DEFAULT_ELEMENT_WAIT_TIMEOUT) {
    let caughtException = false;
    if (toWait) {
        expectedState ?
            await WaitHelpers.waitForElementToBePresented(targetElement, timeout)
                .catch(() => caughtException = true) :
            await WaitHelpers.waitForElementToBeStaled(targetElement, timeout)
                .catch(() => caughtException = true);
    }

    return !caughtException && await targetElement.isPresent();
}

/**
 * Checks whether an element is enabled or not
 * @param {ElementFinder} targetElement
 * @param {boolean} toWait
 * @param {number} timeout
 * @returns {Promise<boolean>}
 */
export async function isEnabled(targetElement: ElementFinder, toWait = true, timeout = DEFAULT_ELEMENT_WAIT_TIMEOUT) {
    if (toWait) {
        await WaitHelpers.waitForElementToBeDisplayed(targetElement, timeout);
    }

    return await targetElement.isEnabled();
}

export async function actionHoverOver(targetElement: ElementFinder, toWait = false) {
    const isAngularWaitEnabled = await AngularHelpers.getAngularWaitState();

    if ((isAngularWaitEnabled && toWait) || !isAngularWaitEnabled) {

        await WaitHelpers.waitForElementToBeDisplayed(targetElement);
    }

    return await browser.actions()
        .mouseMove(targetElement)
        .perform();
}

export async function actionHoverOverAndClick(hoverOverLocator: ElementFinder, clickLocator: ElementFinder,
                                              toWait = false) {
    const isAngularWaitEnabled = await AngularHelpers.getAngularWaitState();

    if ((isAngularWaitEnabled && toWait) || !isAngularWaitEnabled) {
        await WaitHelpers.waitForElementToBeDisplayed(hoverOverLocator);
    }

    return await browser.actions()
        .mouseMove(hoverOverLocator)
        .click(clickLocator)
        .perform();
}

/**
 * Clicks on the element
 * @param {ElementFinder} targetElement
 * @param {boolean} toWait
 * @returns {Promise<void>}
 */
export async function click(targetElement: ElementFinder, toWait = false) {
    const isAngularWaitEnabled = await AngularHelpers.getAngularWaitState();

    if ((isAngularWaitEnabled && toWait) || !isAngularWaitEnabled) {
        await WaitHelpers.waitForElementToBeClickable(targetElement);
    }

    return await targetElement.click();
}

/**
 * Calls Javascript .click() method for the element without wait
 * @param {ElementFinder} targetElement
 * @returns {Promise<void>}
 */
export async function clickUsingJsWoWait(targetElement: ElementFinder) {
    return await browser.executeScript("arguments[0].click();", targetElement.getElementFinder());
}

/**
 * Calls Javascript .click() method for the element
 * @param {ElementFinder} targetElement
 * @returns {Promise<void>}
 */
export async function clickUsingJs(targetElement: ElementFinder) {
    await WaitHelpers.waitForElementToBeClickable(targetElement);

    return this.clickUsingJsWoWait(targetElement);
}

/**
 * Gets value of the given attribute of the element
 * @param {ElementFinder} targetElement
 * @param {string} attributeName
 * @returns {Promise<string>}
 */
export async function getAttributeValue(targetElement: ElementFinder, attributeName: string) {
    const attributeValue = await targetElement.getAttribute(attributeName);

    return attributeValue.trim();
}

/**
 * Gets the computed style of an element
 * @param {ElementFinder} targetElement
 * @param {string} cssStyleProperty
 * @returns {Promise<string>}
 */
export async function getCssValue(targetElement: ElementFinder, cssStyleProperty: string) {
    await WaitHelpers.waitForElementToBeDisplayed(targetElement);
    const propertyValue = await targetElement.getCssValue(cssStyleProperty);

    return propertyValue.trim();
}

/**
 * Gets visible text of the element
 * @param {ElementFinder} targetElement
 * @param {boolean} toWait
 * @returns {Promise<string>}
 */
export async function getText(targetElement: ElementFinder, toWait = true) {
    if (toWait) {
        await WaitHelpers.waitForElementToBeDisplayed(targetElement);
    }
    const text = await targetElement.getText();

    return text.trim();
}

/**
 * Gets visible texts of the elements array
 * @param {ElementArrayFinder} targetElementArray
 * @returns {Promise<string[]>}
 */
export async function getTexts(targetElementArray: ElementArrayFinder) {
    return await targetElementArray.getText();
}

/**
 * Checks whether an element has css class or not
 * @param {ElementFinder} targetElement
 * @param {string} className
 * @returns {Promise<boolean>}
 */
export async function hasClass(targetElement: ElementFinder, className: string) {
    const classes = await targetElement.getAttribute("class");
    return classes && classes.split(" ").indexOf(className) !== -1;
}

/**
 * Scroll page to the specified element
 * @param {ElementFinder} targetElement
 * @param {boolean} alignToTop
 *                  If true, the top of the element will be aligned to the top of the visible area of the scrollable
 *                  ancestor. If false, the bottom of the element will be aligned to the bottom of the visible area of
 *                  the scrollable ancestor.
 * @returns {Promise<boolean>}
 */
export async function scrollToElement(targetElement: ElementFinder, alignToTop = true) {
    await WaitHelpers.waitForElementToBePresented(targetElement);
    await browser.executeScript("arguments[0].scrollIntoView(" + alignToTop + ");", targetElement);
}
