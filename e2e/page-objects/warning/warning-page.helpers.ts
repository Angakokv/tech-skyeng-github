import { WarningPage } from "./warning-page.po";

export async function verifyPageIsOpenedAndContainsText(expectedText: string) {
    await WarningPage.verifyPageIsOpened();
    await WarningPage.verifyPageContainsText(expectedText);
}

