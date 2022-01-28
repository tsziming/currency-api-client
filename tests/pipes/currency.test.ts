import { expect } from "chai";
import { Currency } from "../../src/types";
import currency from "../../src/pipes/currency";
import {  CurrencyResponse } from "../../src/client/types";


describe("currency pipe unit tests", (): void => {
    const rawData: CurrencyResponse = {
        "usd": {
            "eur": "0.846403",
            "uah": "26.72597"
        }
    }
    const data: Currency =  { 
            code: "usd",
            rates: [
                {
                    code: "eur", 
                    count: 0.846403
                },
                {
                    code: "uah", 
                    count: 26.72597
                },
            ]
    };
    

    it("parsing raw code:name currency data", (): void => {
        const parsed: Currency = currency("usd",rawData);
        expect(parsed).deep.equal(data)
    })

    it("parsing undefined instead of code and currency data", (): void => {
        expect(currency).to.throw(Error)
    })

    it("parsing undefined instead of currency data", (): void => {
        expect(()=>currency("usd", undefined)).to.throw(Error)
    })

    it("parsing blank currency data", (): void => {
        const parsed: Currency = currency("usd", {});
        expect(parsed).deep.equal({
            code: "usd"
        });
    })
});
