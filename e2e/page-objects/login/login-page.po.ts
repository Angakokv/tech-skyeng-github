import { element, By } from "protractor";

import {
    LOGIN_WITH_APPLE_OPTION_NAME,
    SOCIAL_BAR_LIST_NAME
} from "./login-page.constants";

import * as ExpectationHelpers from "../../components/expectation-helpers";

export class LoginPage {
    static readonly socialBarList =
        element(By.css("ul[class*=\"SocialBarList\"]"));
    static readonly loginWithAppleContainer =
        element(By.css("div#login-with-apple"));

    static async verifyPageIsOpened() {
        await ExpectationHelpers.verifyDisplayStatus(this.socialBarList,
            SOCIAL_BAR_LIST_NAME);
    }

    static async verifyLoginWithAppleOptionIsDisplayed() {
        await ExpectationHelpers.verifyDisplayStatus(this.loginWithAppleContainer,
            LOGIN_WITH_APPLE_OPTION_NAME);
    }
}
