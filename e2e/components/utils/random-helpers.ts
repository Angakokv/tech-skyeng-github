import * as Crypto from "crypto";

export function getRandomAlphanumericString(length: number) {
    return Crypto.randomBytes(length / 2).toString("hex");
}

export function getRandomNumber(maxValue: number) {
    return Math.floor(Math.random() * Math.floor(maxValue));
}
