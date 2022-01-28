import { IRequestOptions } from "typed-rest-client/Interfaces";

export type CurrenciesResponse = Record<string, string>;
export type CurrencyResponse = Record<string, Record<string, string>>;
export type ToCurrencyResponse = Record<string, string>;

export interface CurrencyClientOptions {
    userAgent?: string | null | undefined;
    requestOptions?: IRequestOptions;
    minified?: boolean;
}