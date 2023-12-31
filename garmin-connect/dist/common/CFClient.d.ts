import { Options, Response } from 'cloudscraper';
import { Headers } from 'request';
import { CookieJar as ToughCookieJar } from 'tough-cookie';
export default class CFClient {
    private cookies;
    private headers;
    constructor(headers: Headers);
    serializeCookies(): ToughCookieJar.Serialized | undefined;
    importCookies(cookies: ToughCookieJar.Serialized): void;
    scraper(options: Options): Promise<Response>;
    /**
     * @param {string} downloadDir
     * @param {string} url
     * @param {*} data
     */
    downloadBlob(downloadDir: string | undefined, url: string, data?: any): Promise<unknown>;
    get<T>(url: string, data?: any): Promise<T>;
    post<T>(url: string, data: any): Promise<T>;
    delete<T>(url: string): Promise<T>;
    postJson<T>(url: string, data: any, headers: Headers): Promise<T>;
    putJson<T>(url: string, data: any): Promise<T>;
}
