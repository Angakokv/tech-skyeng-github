export function getDisplayedValidationText(name: string) {
    return `"${name}" should be displayed`;
}

export function getNotDisplayedValidationText(name: string) {
    return `"${name}" should not be displayed`;
}

export function getPresentedValidationText(name: string) {
    return `"${name}" should be presented`;
}

export function getNotPresentedValidationText(name: string) {
    return `"${name}" shouldn't be presented`;
}

export function getEnabledValidationText(name: string) {
    return `"${name}" should be enabled`;
}

export function getNotEnabledValidationText(name: string) {
    return `"${name}" shouldn't be enabled`;
}

export function getContainsValidationText(object: any, element: any) {
    return `"${object}" should contain "${element}"`;
}

export function getDoesntContainValidationText(object: any, element: any) {
    return `"${object}" shouldn't contain "${element}"`;
}

export function getEqualToValidationText(actualValue: any, expectedValue: any, message = "") {
    return message === "" ?
        `"${actualValue}" should be equal to "${expectedValue}"` :
        `"${message}" (${actualValue}) should be equal to "${expectedValue}"`;
}

export function getNotEqualToValidationText(actualValue: any, expectedValue: any, message = "") {
    return message === "" ?
        `"${actualValue}" shouldn't be equal to "${expectedValue}"` :
        `"${message}" (${actualValue}) shouldn't be equal to "${expectedValue}"`;
}

export function getIsTruthyValidationText(actualValue: any, statementText: string) {
    return `Statement "${statementText}" (${actualValue}) should be truthy`;
}

export function getIsFalsyValidationText(actualValue: any, statementText: string) {
    return `Statement "${statementText}" (${actualValue}) should be falsy`;
}

export function getGreaterThanValidationText(actualValue: any, expectedValue: any, message = "") {
    return message === "" ?
        `"${actualValue}" should be greater than "${expectedValue}"` :
        `"${message}" ("${actualValue}") should be greater than "${expectedValue}"`;
}

export function getGreaterThanOrEqualValidationText(actualValue: any, expectedValue: any, message = "") {
    return message === "" ?
        `"${actualValue}" should be greater than or equal to "${expectedValue}"` :
        `"${message}" (${actualValue}) should be greater than or equal to "${expectedValue}"`;
}

export function getLessThanOrEqualValidationText(actualValue: any, expectedValue: any, message = "") {
    return message === "" ?
        `"${actualValue}" should be less than or equal to "${expectedValue}"` :
        `"${message}" (${actualValue}) should be less than or equal to "${expectedValue}"`;
}

export function getGreaterThanByValidationText(actualValue: any, expectedValue: any,
                                               expectedDifferenceValue: any) {
    return `"${actualValue}" should be grater than "${expectedValue}" by "${expectedDifferenceValue}"`;
}

export function getObjectLengthGreaterThanValidationText(objectName: string, length: any, expectedValue: any) {
    return `"${objectName}" length (${length}) should be grater than "${expectedValue}"`;
}

export function getHasClassValidationText(name: string, className: string) {
    return `"${name}" should has class "${className}"`;
}

export function getHasntClassValidationText(name: string, className: string) {
    return `"${name}" shouldn't has class "${className}"`;
}

export function getHasCssPropertyValidationText(name: string, cssPropertyName: string) {
    return `"${name}" should has css property "${cssPropertyName}"`;
}

export function getHasntCssPropertyValidationText(name: string, cssPropertyName: string) {
    return `"${name}" shouldn't has css property "${cssPropertyName}"`;
}
