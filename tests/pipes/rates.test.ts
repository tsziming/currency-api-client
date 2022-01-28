import { expect } from "chai";
import { Rate } from "../../src/types";
import { CurrenciesResponse } from "../../src/client/types";
import rates from "../../src/pipes/rates";

describe("rates pipe unit tests", (): void => {
    const rawData: CurrenciesResponse = {
        "eur":"0.846403",
        "uah":"26.72597"
    };
    const data: Array<Rate> = [
        { 
            code: "eur",
            count: 0.846403
        },
        { 
            code: "uah",
            count: 26.72597
        },
    ]

    it("parsing raw code:count rate data", (): void => {
        const parsed: Array<Rate> = rates(rawData);
        expect(parsed).deep.equal(data)
    })

    it("parsing undefined instead of rate data", (): void => {
        expect(rates).to.throw(TypeError)
    })

    it("parsing blank rate data", (): void => {
        const parsed: Array<Rate> = rates({});
        expect(parsed).that.is.empty;
    })
});
