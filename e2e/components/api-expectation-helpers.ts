import { StepLogger } from "../loggers/step-logger";

import * as ExpectationHelpers from "./expectation-helpers";

/**
 * Verify whether response status code is equal to expected value or not
 * @param {number} actualCode
 * @param {number} expectedCode
 * @param {string} message
 * @returns {Promise<void>}
 */
export async function verifyResponseHasCode(actualCode: number, expectedCode: number, message: string) {
    StepLogger.subVerification(`Verify that code "${expectedCode}" is returned`);
    await ExpectationHelpers.verifyValueEquality(actualCode, expectedCode, true, message);
}

/**
 * Verify whether response body contains string or not
 * @param {string} bodyText
 * @param {string} expectedText
 * @returns {Promise<void>}
 */
export async function verifyResponseBodyContains(bodyText: string, expectedText: string) {
    StepLogger.subVerification(`Verify that response body contains "${expectedText}"`);
    await ExpectationHelpers.verifyObjectContains(bodyText, expectedText);
}

export async function verifyResponseHasCodeAndBodyContains(actualCode: number, expectedCode: number,
                                                           actualText: string, expectedValuesArray: string[], message: string) {
    await this.verifyResponseHasCode(actualCode, expectedCode, message);

    for (const expectedValue of expectedValuesArray) {
        await this.verifyResponseBodyContains(actualText, expectedValue);
    }
}

/**
 * Verify whether response object contains key or not
 * @param {any} object
 * @param {string} expectedKey
 * @param {boolean} expectedState
 * @returns {Promise<void>}
 */
export async function verifyResponseObjectContainsKey(object: any, expectedKey: string, expectedState = true) {
    const verb = expectedState ? "contains" : "doesn't contain";
    StepLogger.subVerification(`Verify that response body ${verb} "${expectedKey}" key`);
    await ExpectationHelpers.verifyObjectContainsKey(object, expectedKey, expectedState);
}

export async function verifyResponseHasCodeAndBodyContainsKeys(actualCode: number, expectedCode: number,
                                                               body: any, expectedKeys: string[],
                                                               message = "Response status code") {
    await this.verifyResponseHasCode(actualCode, expectedCode, message);

    for (const expectedKey of expectedKeys) {
        await this.verifyResponseObjectContainsKey(body, expectedKey);
    }
}
