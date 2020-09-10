import {
    PASTEBIN_API_DEV_KEY,
    PASTEBIN_POST_URL
} from "./common/common-api-constants";

import { ObjectBuilder } from "../components/api/builders/builder-factory/object-builder";
import { RestWrapper } from "../components/api/api-invokers/rest-wrapper";
import { PastebinPasteRequestModel } from "../api-models/pastebin-paste-request-model";
import { LoggingApiHelpers } from "../loggers/logging-api-helpers";

export class PastebinApiHelpers {
    static generatePasteRequestDefaultData(apiDevKey: string, apiOption: string, apiPasteName: string, apiPasteCode: string) {
        return ObjectBuilder<PastebinPasteRequestModel>()
            .api_dev_key(apiDevKey)
            .api_option(apiOption)
            .api_paste_name(apiPasteName)
            .api_paste_code(apiPasteCode)
            .build();
    }

    /**
     * <p>createPaste
     * </p>
     * Path:                "/api/api_post.php"
     * Method:              POST
     * API Doc:             https://pastebin.com/doc_api#2
     * Description:         Creating a new paste
     *
     * @param   {string}    apiDevKey        Unique API Developers Key
     * @param   {string}    apiOption         Set as paste, this will indicate you want to create a new paste
     * @param   {string}    apiPasteName     Name / title of your paste
     * @param   {string}    apiPasteCode     Text that will be written inside your paste
     * @return              Response with call result
     */
    static async createPaste(apiPasteName: string, apiPasteCode: string, apiDevKey = PASTEBIN_API_DEV_KEY, apiOption = "paste") {
        const apiWrapper = new RestWrapper();

        const response = await apiWrapper
            .form(this.generatePasteRequestDefaultData(apiDevKey, apiOption, apiPasteName, apiPasteCode))
            .post(PASTEBIN_POST_URL)
            .end();
        LoggingApiHelpers.logDetails(apiWrapper.request, response);

        return <any> response;
    }
}
