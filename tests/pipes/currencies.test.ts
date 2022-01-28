import { expect } from "chai";
import currencies from "../../src/pipes/currencies"
import { Currency } from "../../src/types";
import { CurrenciesResponse } from "../../src/client/types";

describe("currencies pipe unit tests", (): void => {
    const rawData: CurrenciesResponse = {
        "usd": "United States dollar",
        "eur":"Euro",
        "uah":"Ukrainian hryvnia"
    }
    const data: Array<Currency> = [
        { 
            code: "usd",
            name: "United States dollar" 
        },
        { 
            code: "eur",
            name: "Euro" 
        },
        { 
            code: "uah",
            name: "Ukrainian hryvnia" 
        },
    ]

    it("parsing raw code:name currency data", (): void => {
        const parsed: Array<Currency> = currencies(rawData);
        expect(parsed).deep.equal(data)
    })

    it("parsing undefined instead of currency data", (): void => {
        expect(currencies).to.throw(TypeError)
    })

    it("parsing blank currency data", (): void => {
        const parsed: Array<Currency> = currencies({});
        expect(parsed).that.is.empty;
    })
});
