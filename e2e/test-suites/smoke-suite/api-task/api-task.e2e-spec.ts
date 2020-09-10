import { SMOKE_TEST_SUITE } from "../../../components/suite-names";

import { StepLogger } from "../../../loggers/step-logger";
import { NasaApodApiHelpers } from "../../../api-helpers/nasa-apod-api-helpers";
import { PastebinApiHelpers } from "../../../api-helpers/pastebin-api-helpers";

import * as HttpStatus from "http-status-codes";
import * as ApiExpectationHelpers from "../../../components/api-expectation-helpers";

describe(SMOKE_TEST_SUITE, () => {
    it("[TC2] Получение изображения дня из сервиса NASA - [2001]", async () => {
        StepLogger.caseId = 2001;

        StepLogger.stepId(1);
        StepLogger.step("Получение картинки из сервиса NASA средствами API");
        const getResponse = await NasaApodApiHelpers.getApod("2020-01-01", true);
        StepLogger.verification("Проверить, что в ответе содержится ссылка на изображение и описание");
        await ApiExpectationHelpers.verifyResponseHasCodeAndBodyContains(getResponse.statusCode,
            HttpStatus.OK, getResponse.body, ["hdurl", "explanation"], "Response status code");

        StepLogger.stepId(2);
        StepLogger.step("Отправка текста описания картинки NASA в сервис Pastebin средствами API");
        const imageData = JSON.parse(getResponse.body);
        const postResponse = await PastebinApiHelpers.createPaste(imageData.title, imageData.explanation);
        StepLogger.verification("Проверить, что в ответе содержится ссылка");
        await ApiExpectationHelpers.verifyResponseHasCodeAndBodyContains(postResponse.statusCode,
            HttpStatus.OK, postResponse.body, ["https://pastebin.com"], "Response status code");

        StepLogger.postCondition(`Получена ссылка на созданнй paste: ${postResponse.body}`);
    });
});
