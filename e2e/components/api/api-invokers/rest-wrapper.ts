export class RestWrapper {
    readonly requestPromiseNative: any;
    request: any;

    constructor() {
        // Added .defaults({ jar: true }) to keep the authentication cookies hooked
        this.requestPromiseNative = require("request-promise-native")
            .defaults({
                jar: true,
                rejectUnauthorized: false,
                strictSSL: false,
            });
        this.request = {
            headers: {
                // Intentionally left blank to avoid undefined error
            },
        };
    }

    public get requestObject() {
        return this.requestPromiseNative;
    }

    /**
     * Request option container for details about the request.
     * @param arg
     * @return {Object}
     */
    public options(arg: any) {
        this.request = arg;
        return this;
    }

    /**
     * Adds headers
     * @param arg
     * @return {Object}
     */
    public headers(arg: any) {
        this.request.headers = arg;
        return this;
    }

    /**
     * Adds a header
     * @param {string} key
     * @param {string} value
     * @return {Object}
     */
    public header(key: string, value: string) {
        this.request.headers[key] = value;
        return this;
    }

    /**
     * Basic authentication setup
     * @param {string} user Authentication Username
     * @param {string} pass Authentication Password
     * @param {boolean} sendImmediately Optional; Defaults to true;
     * Flag to determine whether Request should send the basic authentication header
     * along with the request. Upon being false, Request will retry with a proper authentication header after receiving a
     * 401 response from the server (which must contain a WWW-Authenticate header indicating the required authentication method)
     * @returns {RestWrapper}
     */
    public auth(user: string, pass: string, sendImmediately = true) {
        this.request.auth = {
            user: user,
            pass: pass,
            sendImmediately: sendImmediately,
        };
        return this;
    }

    /**
     * Object should consist of name: 'path' otherwise use name and path.
     * name (String) - File field name
     * path (String | Object) - File value, A String will be parsed based on its value. If path contains http or https Request
     * will handle it as a remote file. If path does not contain http or https then requestPromiseNative will assume that it is the path
     * to a local file and attempt to find it using path.resolve. An Object is directly set, so you can do pre-processing
     * if you want without worrying about the string value.
     * @param arg
     * @return {RestWrapper}
     */
    public attach(arg: any) {
        this.request.form = arg;
        return this;
    }

    /**
     * Attaches a field to the multipart-form request, with pre-processing
     * @param name
     * @param value
     * @returns {RestWrapper}
     */
    public field(name: any, value: any) {
        this.request[name] = value;
        return this;
    }

    /**
     * Not Implemented in Promise-Request-Native
     * @return {Object}
     */
    public stream() {
        this.request.stream();
        return this;
    }

    /**
     * Serialize value as query-string representation
     * @param arg
     * @returns {RestWrapper}
     */
    public query(arg: any) {
        this.request.qs = arg;
        return this;
    }

    /**
     * Set _content-type_ header with type passed through `mime.lookup()` when necessary.
     * @param arg
     * @returns {RestWrapper}
     */
    public type(arg: any) {
        const contentType = "Content-Type";
        this.request.headers[contentType] = arg;
        return this;
    }

    /**
     * Data marshalling for HTTP request body data
     * Use this method when request body is having JSON data only
     * @param arg
     * @param jsonTypeRequest
     * @returns {RestWrapper}
     */
    public send(arg: any, jsonTypeRequest = true) {
        this.request.body = arg;
        this.request.json = jsonTypeRequest;
        return this;
    }

    /**
     * Set URL-Encoded Form
     * @param arg
     * @returns {RestWrapper}
     */
    public form(arg: any) {
        this.request.form = arg;
        return this;
    }

    public asJson() {
        this.request.json = true;
        return this;
    }

    /**
     * Sets multipart array containing multipart-form objects on Request.options
     * to be sent along with the Request.
     * Each objects property with the exclusion of body is treated as a header value.
     * Each body value must be pre-processed if necessary when using this method.
     * @param arg
     * @returns {RestWrapper}
     */
    public part(arg: any) {
        const form = this.requestPromiseNative(this.request).form();
        form.append("FileContents", arg);
        return this;
    }

    /**
     * Creates POST request
     * @param {string} url
     * @returns {RestWrapper}
     */
    public post(url: string) {
        this.request.uri = url;
        this.request.method = "POST";
        return this;
    }

    /**
     * Creates PATCH request
     * @param {string} url
     * @returns {RestWrapper}
     */
    public patch(url: string) {
        this.request.uri = url;
        this.request.method = "PATCH";
        return this;
    }

    /**
     * Creates PUT request
     * @param {string} url
     * @returns {RestWrapper}
     */
    public put(url: string) {
        this.request.uri = url;
        this.request.method = "PUT";
        return this;
    }

    /**
     * Creates HEAD request
     * @param {string} url
     * @returns {RestWrapper}
     */
    public head(url: string) {
        this.request.uri = url;
        this.request.method = "HEAD";
        return this;
    }

    /**
     * Creates GET request
     * @param {string} url
     * @returns {RestWrapper}
     */
    public get(url: string) {
        this.request.uri = url;
        this.request.method = "GET";
        return this;
    }

    /**
     * Creates DELETE request
     * @param {string} url
     * @returns {RestWrapper}
     */
    public delete(url: string) {
        this.request.uri = url;
        this.request.method = "DELETE";
        return this;
    }

    /**
     * Sends HTTP Request and awaits Response finalization. Request compression and Response decompression occurs here.
     * Upon HTTP Response post-processing occurs and invokes `callback` with a single argument, the `[Response](#response)` object.
     * @returns {Promise<Response>}
     */
    public end() {
        this.request.resolveWithFullResponse = true;
        // tslint:disable-next-line:variable-name
        const _this = this;
        return new Promise<Response>(resolve => {
            _this
                .requestPromiseNative(_this.request)
                .then((response: any) => {
                    resolve(response);
                })
                .catch((err: any) => {
                    resolve(err);
                });
        });
    }
}
