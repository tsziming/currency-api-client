
import { CurrencyResponse } from "../client/types";
import { Currency } from "../types";
import rates from "./rates";


export default ( code: string, currency: CurrencyResponse ): Currency => {
    if (!code) {
        throw new Error("Cannot get currency without its code");
    }
    if (!currency) {
        throw new TypeError("Cannot convert undefined or null to CurrenciesResponse");
    }
    return <Currency> {
        code,
        ... currency[code] ? ({ rates: rates(currency[code]) }) : {}  
    }
}
