import { CurrencyClientOptions, CurrenciesResponse, CurrencyResponse, ToCurrencyResponse } from "./types";
import { RestClient } from "typed-rest-client/RestClient";
import { ConversionUnit, Currency, Rate } from "../types";
import currencies from "../pipes/currencies";
import currency from "../pipes/currency";
import rate from "../pipes/rate";

const defaultOptions: CurrencyClientOptions = {
    minified: true
};

export class CurrencyClient {
    
    private options: CurrencyClientOptions;
    private client: RestClient;

    constructor( options?: CurrencyClientOptions ) {
        this.options = { 
            ...defaultOptions,
            ...options
        };

        this.client = new RestClient(
            this.options.userAgent,
            "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/",
            undefined,
            this.options.requestOptions
        )
    }

    async currencies(date = "latest", minified = !!this.options.minified ): Promise<Currency[]> {
        const { result } = await this.client.get<CurrenciesResponse>(`${date}/currencies${minified?".min":""}.json`);
        if (!result) {
            return [];
        }
        return currencies(
            result
        );
    }

    async currency(code: string, date = "latest", minified = !!this.options.minified ): Promise<Currency> {
        const { result } = await this.client.get<CurrencyResponse>(`${date}/currencies/${code}${minified?".min":""}.json`);
        if (!result) {
            return { code };
        }
        return currency(
            code,
            result
        );
    }

    async toCurrency(code: string, toCode: string, date = "latest", minified = !!this.options.minified ): Promise<Rate> {
        const { result } = await this.client.get<ToCurrencyResponse>(`${date}/currencies/${code}/${toCode}${minified?".min":""}.json`);
        if (!result) {
            return { code };
        }
        return rate(
            toCode,
            result
        );
    }

    async convert(from: ConversionUnit, toCode: string, date = "latest", minified = !!this.options.minified ): Promise<number> {
        const { count } = await this.toCurrency(from.code, toCode, date, minified);
        if (!count) {
            throw new Error("Conversion failed");
        }
        return from.count * count;
    }
}