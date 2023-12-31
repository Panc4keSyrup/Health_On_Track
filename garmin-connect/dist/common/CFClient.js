"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudscraper_1 = __importDefault(require("cloudscraper"));
const request_1 = __importDefault(require("request"));
const tough_cookie_1 = require("tough-cookie");
const qs_1 = __importDefault(require("qs"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const asJson = (body) => {
    try {
        const jsonBody = JSON.parse(body);
        return jsonBody;
    }
    catch (e) {
        // Do nothing
    }
    return body;
};
class CFClient {
    constructor(headers) {
        this.cookies = request_1.default.jar();
        this.headers = headers || {};
    }
    serializeCookies() {
        var _a;
        return (_a = this.cookies._jar) === null || _a === void 0 ? void 0 : _a.serializeSync();
    }
    importCookies(cookies) {
        const deserialized = tough_cookie_1.CookieJar.deserializeSync(cookies);
        this.cookies = request_1.default.jar();
        this.cookies._jar = deserialized;
    }
    async scraper(options) {
        return new Promise((resolve) => {
            (0, cloudscraper_1.default)(options, (err, res) => {
                resolve(res);
            });
        });
    }
    /**
     * @param {string} downloadDir
     * @param {string} url
     * @param {*} data
     */
    async downloadBlob(downloadDir = '', url, data) {
        const queryData = qs_1.default.stringify(data);
        const queryDataString = queryData ? `?${queryData}` : '';
        const options = {
            method: 'GET',
            jar: this.cookies,
            uri: `${url}${queryDataString}`,
            headers: this.headers,
            encoding: null
        };
        return new Promise((resolve) => {
            (0, cloudscraper_1.default)(options, async (err, response, body) => {
                const { headers } = response || {};
                const { 'content-disposition': contentDisposition } = headers || {};
                const downloadDirNormalized = path_1.default.normalize(downloadDir);
                if (contentDisposition) {
                    const defaultName = `garmin_connect_download_${Date.now()}`;
                    const [, fileName = defaultName] = contentDisposition.match(/filename="?([^"]+)"?/) || [];
                    const filePath = path_1.default.resolve(downloadDirNormalized, fileName);
                    fs_1.default.writeFileSync(filePath, body);
                    resolve(filePath);
                }
            });
        });
    }
    async get(url, data) {
        const queryData = qs_1.default.stringify(data);
        const queryDataString = queryData ? `?${queryData}` : '';
        const options = {
            method: 'GET',
            jar: this.cookies,
            uri: `${url}${queryDataString}`,
            headers: this.headers
        };
        const { body } = await this.scraper(options);
        return asJson(body);
    }
    async post(url, data) {
        const options = {
            method: 'POST',
            uri: url,
            jar: this.cookies,
            formData: data,
            headers: this.headers
        };
        const { body } = await this.scraper(options);
        return asJson(body);
    }
    async delete(url) {
        const options = {
            method: 'DELETE',
            uri: url,
            jar: this.cookies,
            headers: this.headers
        };
        const { body } = await this.scraper(options);
        return asJson(body);
    }
    async postJson(url, data, headers) {
        const options = {
            method: 'POST',
            uri: url,
            jar: this.cookies,
            json: data,
            headers: {
                ...this.headers,
                ...headers,
                'Content-Type': 'application/json'
            }
        };
        const { body } = await this.scraper(options);
        return asJson(body);
    }
    async putJson(url, data) {
        const options = {
            method: 'PUT',
            uri: url,
            jar: this.cookies,
            json: data,
            headers: {
                ...this.headers,
                'Content-Type': 'application/json'
            }
        };
        const { body } = await this.scraper(options);
        return asJson(body);
    }
}
exports.default = CFClient;
//# sourceMappingURL=CFClient.js.map