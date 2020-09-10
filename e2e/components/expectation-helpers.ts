import { ElementFinder } from "protractor";
import { BACKGROUND_COLOR } from "./css-properties";

import * as ElementHelpers from "./element-helpers";
import * as ValidationTextHelpers from "./validation-text-helpers";
import * as HtmlAttributes from "./html-attributes";

/**
 * Verify whether an element is displayed or not
 * @param{ElementFinder} targetElement
 * @param {string} elementName
 * @param {boolean} expectedState
 * @returns {Promise<void>}
 */
export async function verifyDisplayStatus(targetElement: ElementFinder, elementName: string, expectedState = true) {
    await expect(await ElementHelpers.isDisplayed(targetElement, expectedState))
        .toBe(expectedState,
            expectedState ? ValidationTextHelpers.getDisplayedValidationText(elementName) :
                ValidationTextHelpers.getNotDisplayedValidationText(elementName));
}

/**
 * Verify whether an element is presented or not
 * @param {ElementFinder} targetElement
 * @param {string} elementName
 * @param {boolean} expectedState
 * @returns {Promise<void>}
 */
export async function verifyPresentStatus(targetElement: ElementFinder, elementName: string, expectedState = false) {
    await expect(await ElementHelpers.isPresented(targetElement, expectedState))
        .toBe(expectedState,
            expectedState ? ValidationTextHelpers.getPresentedValidationText(elementName) :
                ValidationTextHelpers.getNotPresentedValidationText(elementName));
}

/**
 * Verify whether an element is enabled or not
 * @param{ElementFinder} targetElement
 * @param {string} elementName
 * @param {boolean} expectedState
 * @returns {Promise<void>}
 */
export async function verifyEnabledStatus(targetElement: ElementFinder, elementName: string, expectedState = true) {
    await expect(await ElementHelpers.isEnabled(targetElement))
        .toBe(expectedState,
            expectedState ? ValidationTextHelpers.getEnabledValidationText(elementName) :
                ValidationTextHelpers.getNotEnabledValidationText(elementName));
}

/**
 * Verify whether object contains element or not
 * @param {any} object
 * @param {any} element
 * @param {boolean} expectedState
 * @returns {Promise<void>}
 */
export async function verifyObjectContains(object: any, element: any, expectedState = true) {
    await expect(object).toContain(element,
        expectedState ? ValidationTextHelpers.getContainsValidationText(object, element) :
            ValidationTextHelpers.getDoesntContainValidationText(object, element));
}

/**
 * Verify whether object contains key or not
 * @param {any} object
 * @param {string} key
 * @param {boolean} expectedState
 * @returns {Promise<void>}
 */
export async function verifyObjectContainsKey(object: any, key: string, expectedState = true) {
    await expect(object.hasOwnProperty(key)).toBe(expectedState,
        expectedState ? ValidationTextHelpers.getContainsValidationText(object, key) :
            ValidationTextHelpers.getDoesntContainValidationText(object, key));
}

/**
 * Verify whether TextBox value is equal to expected value or not
 * @param {ElementFinder} targetElement
 * @param {string} expectedValue
 * @param {boolean} expectedState
 * @returns {Promise<void>}
 */
export async function verifyTextBoxValueEquality(targetElement: ElementFinder, expectedValue: string,
                                                 expectedState = true) {
    const actualValue = await ElementHelpers.getAttributeValue(targetElement, HtmlAttributes.VALUE);

    expectedState ?
        await expect(actualValue).toEqual(expectedValue,
            ValidationTextHelpers.getEqualToValidationText(actualValue, expectedValue)) :
        await expect(actualValue).not.toEqual(expectedValue,
            ValidationTextHelpers.getNotEqualToValidationText(actualValue, expectedValue));
}

/**
 * Verify whether an element has css class or not
 * @param {ElementFinder} targetElement
 * @param {string} elementName
 * @param {string} className
 * @param {boolean} expectedState
 * @returns {Promise<void>}
 */
export async function verifyHasClass(targetElement: ElementFinder, elementName: string,
                                     className: string, expectedState: boolean) {
    await expect(await ElementHelpers.hasClass(targetElement, className))
        .toBe(expectedState,
            expectedState ? ValidationTextHelpers.getHasClassValidationText(elementName, className) :
                ValidationTextHelpers.getHasntClassValidationText(elementName, className));
}

/**
 * Verify whether an element has css background color or not
 * @param {ElementFinder} targetElement
 * @param {string} elementName
 * @param {boolean} expectedState
 * @returns {Promise<void>}
 */
export async function verifyHasCssBackgroundColor(targetElement: ElementFinder, elementName: string,
                                                  expectedState: boolean) {
    const colorValue = await ElementHelpers.getCssValue(targetElement, BACKGROUND_COLOR);

    expectedState ?
        await expect(colorValue).not.toEqual("rgba(0, 0, 0, 0)",
            ValidationTextHelpers.getHasCssPropertyValidationText(elementName, BACKGROUND_COLOR)) :
        await expect(colorValue).toEqual("rgba(0, 0, 0, 0)",
            ValidationTextHelpers.getHasntCssPropertyValidationText(elementName, BACKGROUND_COLOR));
}

/**
 * Verify that actual value is greater than expected value
 * @param {number} actualValue
 * @param {number} expectedValue
 * @param {string} message
 * @returns {Promise<void>}
 */
export async function verifyValueGreaterThan(actualValue: number, expectedValue: number,
                                             message = "") {
    await expect(actualValue).toBeGreaterThan(expectedValue,
        ValidationTextHelpers.getGreaterThanValidationText(actualValue, expectedValue, message));
}

/**
 * Verify that actual value is greater than expected value by difference
 * @param {number} actualValue
 * @param {number} expectedValue
 * @param {number} expectedDifferenceValue
 * @returns {Promise<void>}
 */
export async function verifyValueGreaterThanBy(actualValue: number, expectedValue: number,
                                               expectedDifferenceValue: number) {
    const actualDifferenceValue = Math.abs(actualValue - expectedValue);
    await expect(actualDifferenceValue).toEqual(expectedDifferenceValue,
        ValidationTextHelpers.getGreaterThanByValidationText(actualValue, expectedValue, expectedDifferenceValue));
}

/**
 * Verify that actual value is greater than or equal to expected value
 * @param {number} actualValue
 * @param {number} expectedValue
 * @param {string} message
 * @returns {Promise<void>}
 */
export async function verifyValueGreaterThanOrEqual(actualValue: number, expectedValue: number, message = "") {
    await expect(actualValue).toBeGreaterThanOrEqual(expectedValue,
        ValidationTextHelpers.getGreaterThanOrEqualValidationText(actualValue, expectedValue, message));
}

/**
 * Verify that actual value is less than or equal to expected value
 * @param {number} actualValue
 * @param {number} expectedValue
 * @param {string} message
 * @returns {Promise<void>}
 */
export async function verifyValueLessThanOrEqual(actualValue: number, expectedValue: number, message = "") {
    await expect(actualValue).toBeLessThanOrEqual(expectedValue,
        ValidationTextHelpers.getLessThanOrEqualValidationText(actualValue, expectedValue, message));
}

/**
 * Verify that object length is greater than expected value
 * @param {string} objectName
 * @param {number} length
 * @param {number} expectedValue
 * @returns {Promise<void>}
 */
export async function verifyObjectLengthGreaterThan(objectName: string, length: number, expectedValue: number) {
    await expect(length).toBeGreaterThan(expectedValue,
        ValidationTextHelpers.getObjectLengthGreaterThanValidationText(objectName, length, expectedValue));
}

/**
 * Verify whether actual value is equal to expected value or not
 * @param {number} actualValue
 * @param {number} expectedValue
 * @param {boolean} expectedState
 * @param {string} message
 * @returns {Promise<void>}
 */
export async function verifyValueEquality(actualValue: any, expectedValue: any,
                                          expectedState = true, message = "") {
    expectedState ?
        await expect(actualValue).toEqual(expectedValue,
            ValidationTextHelpers.getEqualToValidationText(actualValue, expectedValue, message)) :
        await expect(actualValue).not.toEqual(expectedValue,
            ValidationTextHelpers.getNotEqualToValidationText(actualValue, expectedValue, message));
}

/**
 * Verify whether actual value is truthy or falsy
 * @param {number} actualValue
 * @param {string} statementText
 * @param {boolean} expectedState
 * @returns {Promise<void>}
 */
export async function verifyValueTruthiness(actualValue: boolean, statementText: string,
                                            expectedState = true) {
    expectedState ?
        await expect(actualValue).toBeTruthy(
            ValidationTextHelpers.getIsTruthyValidationText(actualValue, statementText)) :
        await expect(actualValue).toBeFalsy(
            ValidationTextHelpers.getIsFalsyValidationText(actualValue, statementText));
}
