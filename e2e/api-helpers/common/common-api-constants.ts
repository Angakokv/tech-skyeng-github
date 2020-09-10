import { browser } from "protractor";

// Base urls
export const NASA_BASE_ENDPOINT = browser.params.nasaApiUrl.endsWith("/") ?
    `${browser.params.nasaApiUrl.slice(0, -1)}` : `${browser.params.nasaApiUrl}`;
export const PASTEBIN_BASE_ENDPOINT = browser.params.pastebinApiUrl.endsWith("/") ?
    `${browser.params.pastebinApiUrl.slice(0, -1)}` : `${browser.params.pastebinApiUrl}`;

// NASA APOD urls
export const NASA_APOD_URL = `${NASA_BASE_ENDPOINT}/planetary/apod`;

// Pastebin urls
export const PASTEBIN_POST_URL = `${PASTEBIN_BASE_ENDPOINT}/api_post.php`;

// Credentials
export const PASTEBIN_API_DEV_KEY = browser.params.pastebinApiDevKey;
