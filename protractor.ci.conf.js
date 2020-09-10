const defaultConfig = require("./configs/default-config");
const reportersConfigSetup = require("./configs/reporters-setup");

exports.config = {
    restartBrowserBetweenTests: defaultConfig.restartBrowserBetweenTests,
    SELENIUM_PROMISE_MANAGER: defaultConfig.SELENIUM_PROMISE_MANAGER,
    allScriptsTimeout: defaultConfig.allScriptsTimeout,
    suites: defaultConfig.suites,
    capabilities: defaultConfig.capabilities,
    params: defaultConfig.params,
    directConnect: true,
    baseUrl: defaultConfig.baseUrl,
    framework: defaultConfig.framework,
    jasmineNodeOpts: defaultConfig.jasmineNodeOpts,

    onPrepare: function () {
        reportersConfigSetup.onPrepareSetup();
        reportersConfigSetup.allureReporterSetup();
        reportersConfigSetup.jasmineJUnitXmlReporterSetup();
    }
};
