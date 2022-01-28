import { expect } from "chai";
import { Rate } from "../../src/types";
import rate from "../../src/pipes/rate";
import {  ToCurrencyResponse } from "../../src/client/types";


describe("rate pipe unit tests", (): void => {
    const rawData: ToCurrencyResponse = {
        "eur": "0.846403"
    };
    const data: Rate =  { 
        code: "eur", 
        count: 0.846403
    };
    

    it("parsing raw code:count rate data", (): void => {
        const parsed: Rate = rate("eur",rawData);
        expect(parsed).deep.equal(data)
    })

    it("parsing undefined instead of code and rate data", (): void => {
        expect(rate).to.throw(Error)
    })

    it("parsing undefined instead of rate data", (): void => {
        expect(()=>rate("eur", undefined)).to.throw(Error)
    })

    it("parsing blank rate data", (): void => {
        const parsed: Rate = rate("eur", {});
        expect(parsed).to.deep.equal({
            code: "eur"
        });
    })
});
