import {
    NASA_APOD_URL
} from "./common/common-api-constants";

import { RestWrapper } from "../components/api/api-invokers/rest-wrapper";
import { LoggingApiHelpers } from "../loggers/logging-api-helpers";

export class NasaApodApiHelpers {
    /**
     * <p>getApod
     * </p>
     * Path:                "/planetary/apod"
     * Method:              GET
     * API Doc:             https://api.nasa.gov/index.html#main-content
     * Description:         Get an Astronomy Picture of the Day
     *
     * @param   {string}    date        The date of the APOD image to retrieve
     * @param   {boolean}   hd          Retrieve the URL for the high resolution image
     * @param   {string}    apiKey      api.nasa.gov key for expanded usage
     * @return              Response with call result
     */
    static async getApod(date: string, hd: boolean, apiKey = "DEMO_KEY") {
        const apiWrapper = new RestWrapper();

        const response = await apiWrapper
            .get(NASA_APOD_URL)
            .query({date: date, hd: hd, api_key: apiKey})
            .end();
        LoggingApiHelpers.logDetails(apiWrapper.request, response);

        return <any> response;
    }
}
