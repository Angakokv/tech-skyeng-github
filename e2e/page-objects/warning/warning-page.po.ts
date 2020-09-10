import { element, By } from "protractor";

import { WARNING_PAGE_NAME } from "./warning-page.constants";

import * as ElementHelpers from "../../components/element-helpers";
import * as ExpectationHelpers from "../../components/expectation-helpers";

export class WarningPage {
    static readonly warningTemplateContainer =
        element(By.css("div[class*=\"WarningTemplate\"][data-component]"));
    static readonly continueButton =
        element(By.buttonText("Продолжить"));

    static async clickContinueButton() {
        await ElementHelpers.click(this.continueButton);
    }

    static async verifyPageIsOpened() {
        await ExpectationHelpers.verifyDisplayStatus(this.warningTemplateContainer,
            WARNING_PAGE_NAME);
    }

    static async verifyPageIsPresented(expectedState = true) {
        await ExpectationHelpers.verifyPresentStatus(this.warningTemplateContainer,
            WARNING_PAGE_NAME, expectedState);
    }

    static async verifyPageContainsText(expectedText: string) {
        const actualText = await ElementHelpers.getText(this.warningTemplateContainer);

        await ExpectationHelpers.verifyObjectContains(actualText, expectedText);
    }
}
