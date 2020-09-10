import {browser, protractor} from "protractor";
import {logger} from "codelyzer/util/logger";

/**
 * Alert helper for general utility
 */
export class AlertHelper {

    private static readonly DEFAULT_TIMEOUT = 10000;
    private static readonly EC = protractor.ExpectedConditions;

    /**
     * Wait for an alert to appear
     * @param {number} timeout in milliseconds
     * @param {string} message
     */
    public static async waitForAlertToBePresent( timeout: number = AlertHelper.DEFAULT_TIMEOUT,
                                                 message: string = "Alert is not present") {
        return await browser.wait(this.EC.alertIsPresent(), timeout, message);
    }

    /**
     * Accept javascript"s alert
     * @param {number} timeout in milliseconds
     * @param {string} message
     */
    public static async acceptAlert( timeout: number = AlertHelper.DEFAULT_TIMEOUT,
                                     message: string = "Alert is not present") {
        await this.waitForAlertToBePresent(timeout, message);
        return await browser.switchTo().alert().accept();
    }

    /**
     * Cancel javascript's alert
     * @param {number} timeout in milliseconds
     * @param {string} message
     */
    public static async cancelAlert( timeout: number = AlertHelper.DEFAULT_TIMEOUT,
                                     message: string = "Alert is not present") {
        await this.waitForAlertToBePresent(timeout, message);
        return await browser.switchTo().alert().dismiss();
    }

    public static async closeAlertIfExists() {
       await browser.driver.switchTo().alert().then(function (alert: any) {
            alert.accept();
        }, function (error: any) {
            logger.error(error);
            // Here we can handle the exception if we want
        });
    }
}
