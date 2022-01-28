
import { CurrenciesResponse } from "../client/types";
import { Currency } from "../types";


export default ( currencies: CurrenciesResponse ): Array<Currency> => {
    if (!currencies) {
        throw new TypeError("Cannot convert undefined or null to CurrenciesResponse");
    }
    return Object
        .entries(currencies)
        .map( 
            ([code, name])=> <Currency>({ 
                code,
                name, 
            })
        );
}
