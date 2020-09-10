import {
    browser,
    ElementFinder
} from "protractor";

import {
    DEFAULT_ELEMENT_WAIT_TIMEOUT,
    TIMEOUT_2,
    TIMEOUT_10
} from "../../components/timeouts";

import { StepLogger } from "../../loggers/step-logger";
import { CommonPage } from "./common-page.po";

import * as AngularHelpers from "../../components/angular-helpers";
import * as ElementHelpers from "../../components/element-helpers";
import * as ExpectationHelpers from "../../components/expectation-helpers";
import * as WaitHelpers from "../../components/wait-helpers";

export async function refreshPage() {
    await browser.navigate().refresh();
}

export async function navigateBack() {
    await browser.navigate().back();
}

export async function navigateTo(url: string) {
    await AngularHelpers.disableAngularWait();
    return await browser.get(url, DEFAULT_ELEMENT_WAIT_TIMEOUT);
}

export async function navigateToMainPage() {
    const url = browser.baseUrl;
    StepLogger.subStep(`Перейти на главную страницу: ${url}`);
    return await this.navigateTo(url);
}

export async function forceLogout() {
    await browser.executeScript("window.sessionStorage.clear();");
    await browser.executeScript("window.localStorage.clear();");
}

export async function verifyElementTextContainsStrings(element: ElementFinder, stringsArray: string[]) {
    const elementTextValue = await ElementHelpers.getText(element);

    for (const stringValue of stringsArray) {
        await ExpectationHelpers.verifyObjectContains(elementTextValue, stringValue);
    }
}

export async function verifyDisplayAndEnabledStatus(targetElement: ElementFinder, elementName: string,
                                                    displayExpectedState: boolean, enabledExpectedState: boolean) {
    await ExpectationHelpers.verifyDisplayStatus(targetElement,
        elementName, displayExpectedState);
    await ExpectationHelpers.verifyEnabledStatus(targetElement,
        elementName, enabledExpectedState);
}

export async function waitForFirstSearchResultToBeDisplayed(searchedText: string) {
    return await WaitHelpers.waitForCustomCondition(async () => {
        return await ElementHelpers.isDisplayed(
                CommonPage.searchAutocompleteFirstItemByText(searchedText), true, true, TIMEOUT_2);
        }, TIMEOUT_10, `"Результат со строкой "${searchedText}" не отображается`
    );
}

export async function verifySearchAutocompleteIsntEmpty(searchedText: string) {
    await CommonPage.verifySearchAutocompleteIsDisplayed();
    await this.waitForFirstSearchResultToBeDisplayed(searchedText)
    await CommonPage.verifySearchAutocompleteIsntEmpty();
}
