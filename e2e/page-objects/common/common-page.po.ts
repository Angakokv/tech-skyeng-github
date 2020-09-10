import { element, By } from "protractor";

import { SEARCH_BAR_AUTOCOMPLETE_LIST_NAME } from "../home/home-page.constants";

import * as ElementHelpers from "../../components/element-helpers";
import * as ExpectationHelpers from "../../components/expectation-helpers";
import * as TextBoxHelpers from "../../components/textbox-helpers";

export class CommonPage {
    static readonly searchField =
        element(By.css("input#searchInput"));
    static readonly searchAutocompleteList =
        element(By.css("ul#search-bar-autocomplete"));
    static readonly searchAutocompleteListAllItems =
        element.all(By.css("ul#search-bar-autocomplete > li"));
    static readonly searchAutocompleteFirstItemByText = (text: string) =>
        element.all(By.cssContainingText("ul#search-bar-autocomplete > li", text)).first();

    static async inputSearchedValue(value: string, sendEnter = false) {
        await TextBoxHelpers.sendKeys(this.searchField, value, sendEnter);
    }

    static async clearSearchedValue() {
        await TextBoxHelpers.clearText(this.searchField);
    }

    static async clickOnSearchAutocompleteItem(text: string) {
        await ElementHelpers.click(this.searchAutocompleteFirstItemByText(text));
    }

    static async verifySearchAutocompleteIsDisplayed(expectedState = true) {
        await ExpectationHelpers.verifyDisplayStatus(this.searchAutocompleteList,
            SEARCH_BAR_AUTOCOMPLETE_LIST_NAME, expectedState);
    }

    static async verifySearchAutocompleteIsPresented(expectedState = true) {
        await ExpectationHelpers.verifyPresentStatus(this.searchAutocompleteList,
            SEARCH_BAR_AUTOCOMPLETE_LIST_NAME, expectedState);
    }

    static async verifySearchAutocompleteIsntEmpty() {
        const allListItemsQuantity = await this.searchAutocompleteListAllItems.count();
        await ExpectationHelpers.verifyValueGreaterThanOrEqual(allListItemsQuantity, 1,
            "Результат поиска должен быть непустым");
    }
}
