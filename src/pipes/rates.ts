
import { CurrenciesResponse } from "../client/types";
import { Rate } from "../types";


export default ( rates: CurrenciesResponse ): Array<Rate> => {
    if (!rates) {
        throw new TypeError("Cannot convert undefined or null to CurrenciesResponse");
    }
    return Object
        .entries(rates)
        .map( 
            (elem)=> <Rate>({ 
                "code": elem[0], 
                "count": parseFloat(elem[1]) 
            })
        );
}
