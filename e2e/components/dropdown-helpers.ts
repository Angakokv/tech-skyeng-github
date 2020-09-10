import {
    By,
    element,
    ElementFinder
} from "protractor";

export async function selectOptionByValue(locator: ElementFinder, optionValue: string) {
    const optionLocator = `option[value="${optionValue}"]`;

    return locator.element(By.css(optionLocator)).click();
}

export async function selectOptionByText(optionText: string) {
    const optionSelector = `//option[normalize-space(.)="${optionText}"]`;

    return element(By.xpath(optionSelector)).click();
}

