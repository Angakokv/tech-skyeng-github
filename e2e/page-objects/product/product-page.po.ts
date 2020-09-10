import { element, By } from "protractor";

import * as ElementHelpers from "../../components/element-helpers";

export class ProductPage {
    static readonly productEditionCard = (editionName: string) =>
        element(By.cssContainingText("div[data-component=\"ProductCard\"]", editionName));
    static readonly wishButton = (editionName: string) =>
        ProductPage.productEditionCard(editionName).element(By.css("button[class*=\"WishButton\"]"));

    static async clickWishButton(editionName: string) {
        const wishButton = this.wishButton(editionName);

        await ElementHelpers.scrollToElement(wishButton, false);
        await ElementHelpers.click(wishButton);
    }
}
