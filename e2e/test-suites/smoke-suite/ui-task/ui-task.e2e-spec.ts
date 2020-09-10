import { SMOKE_TEST_SUITE } from "../../../components/suite-names";

import { StepLogger } from "../../../loggers/step-logger";
import { CommonPage } from "../../../page-objects/common/common-page.po";
import { HomePage } from "../../../page-objects/home/home-page.po";
import { LoginPage } from "../../../page-objects/login/login-page.po";
import { WarningPage } from "../../../page-objects/warning/warning-page.po";
import { ProductPage } from "../../../page-objects/product/product-page.po";

import * as CommonPageHelpers from "../../../page-objects/common/common-page.helpers";
import * as WarningPageHelpers from "../../../page-objects/warning/warning-page.helpers";

describe(SMOKE_TEST_SUITE, () => {
    it("[TC1] Поиск и добавление игры 'Red Dead Redemption 2' - [1001]", async () => {
        StepLogger.caseId = 1001;

        StepLogger.stepId(1);
        StepLogger.step("Открыть страницу: https://www.epicgames.com/store/ru/");
        await CommonPageHelpers.navigateToMainPage();
        StepLogger.verification("Страница открыта успешно");
        await HomePage.verifyPageIsOpened();

        StepLogger.stepId(2);
        StepLogger.step("Ввести в поле \"Поиск\" текст \"Red\"");
        const searchedText = "Red";
        await CommonPage.inputSearchedValue(searchedText);
        StepLogger.verification("Убедиться, что появились предлагаемые поисковые результаты");
        await CommonPageHelpers.verifySearchAutocompleteIsntEmpty(searchedText);

        StepLogger.stepId(3);
        StepLogger.step("Очистить текст (любым способом)");
        await CommonPage.clearSearchedValue();
        StepLogger.verification("Убедиться, что предлагаемые результаты скрылись");
        await CommonPage.verifySearchAutocompleteIsPresented(false);

        StepLogger.stepId(4);
        StepLogger.step("Снова ввести в поле \"Поиск\" текст \"Red\"");
        await CommonPage.inputSearchedValue(searchedText);
        StepLogger.verification("Убедиться, что появились предлагаемые поисковые результаты");
        await CommonPageHelpers.verifySearchAutocompleteIsntEmpty(searchedText);

        StepLogger.stepId(5);
        StepLogger.step("Нажать на пункт \"Red Dead Redemption 2\"");
        const itemText = "Red Dead Redemption 2";
        await CommonPage.clickOnSearchAutocompleteItem(itemText);
        StepLogger.verification("Убедиться, что выпадашка исчезла из DOM страницы и " +
            "открылась страница с возраcтным ограничением");
        await CommonPage.verifySearchAutocompleteIsPresented(false);
        await WarningPageHelpers.verifyPageIsOpenedAndContainsText("для людей старше");

        StepLogger.stepId(6);
        StepLogger.step("В окне возрастного ограничения нажать на \"Продолжить\"");
        await WarningPage.clickContinueButton();
        StepLogger.verification("Убедиться, что это окно стало невидимым (исчезло с экрана)");
        await WarningPage.verifyPageIsPresented(false);

        StepLogger.stepId(7);
        StepLogger.step("Нажать на \"Добавить в список желаемого\" напротив версии " +
            "\"Red Dead Redemption 2: Special Edition\"");
        const editionName = "Red Dead Redemption 2:  Special Edition";
        await ProductPage.clickWishButton(editionName);

        StepLogger.stepId(8);
        StepLogger.step("Убедиться, что открылась форма авторизации с возможностью логина с помощью Apple ID");
        await LoginPage.verifyPageIsOpened();
        await LoginPage.verifyLoginWithAppleOptionIsDisplayed();
    });
});
