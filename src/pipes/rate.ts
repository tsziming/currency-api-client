
import { ToCurrencyResponse } from "../client/types";
import { Rate } from "../types";


export default ( code: string, currency: ToCurrencyResponse ): Rate => {
    if (!code) {
        throw new Error("Cannot get currency rate without its code");
    }
    if (!currency) {
        throw new TypeError("Cannot convert undefined or null to CurrenciesResponse");
    }
    return <Rate> {
        code,
        ... currency[code] ? ({ count: parseFloat(currency[code]) }) : {}  
    }
}
