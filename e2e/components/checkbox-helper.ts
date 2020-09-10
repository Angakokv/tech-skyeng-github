import { ElementFinder } from "protractor";

import * as WaitHelpers from "./wait-helpers";

export class CheckboxHelper {
    static async isCheckboxChecked(locator: ElementFinder) {
        await WaitHelpers.waitForElementToBeDisplayed(locator);
        return locator.isSelected();
    }

    static async markCheckbox(elementt: ElementFinder, markChecked: boolean) {
        await WaitHelpers.waitForElementToBeClickable(elementt);

        const isSelected = await elementt.isSelected();
        if (isSelected !== markChecked) {
            await elementt.click();
        }
        return;
    }
}
