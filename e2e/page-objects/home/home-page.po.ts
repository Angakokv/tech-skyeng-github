import { element, By } from "protractor";

import {
    CAROUSEL_SECTION_NAME
} from "./home-page.constants";

import * as ExpectationHelpers from "../../components/expectation-helpers";

export class HomePage {
    static readonly carouselDiv =
        element(By.css("div[class*=\"DiscoverCarousel\"]"));

    static async verifyPageIsOpened() {
        await ExpectationHelpers.verifyDisplayStatus(this.carouselDiv,
            CAROUSEL_SECTION_NAME);
    }
}
