import { StepLogger } from "./step-logger";

export class LoggingApiHelpers {
    public static logDetails(request: any, response: any, requestURI?: any) {
        this.logger(requestURI, "Request URI:");
        this.logger(request, "Request:");
        this.logger(response, "Response:");
    }

    private static logger(obj: any, type: string) {
        if (obj) {
            StepLogger.subStep(`\r\n${type} ${JSON.stringify(obj, null)}`);
        }
    }
}
