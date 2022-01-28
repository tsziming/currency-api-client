import { expect } from "chai";

import { Currency, CurrencyClient, Rate } from "../../src"

import * as chai from "chai"    
import chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised)

describe("Currency client unit tests", (): void => {
    const client = new CurrencyClient();
    
    it("getting all currencies", async (): Promise<void> => {
        const currencies = await client.currencies("2021-05-04");
        expect(currencies)
            .length
            .greaterThanOrEqual(150)
            .deep
            .contains({ code: "mmk", name: "Myanmar Kyat" })
    })

    it("getting certain currency rates", async (): Promise<void> => {
        const currency: Currency = await client.currency("usd", "2021-05-04");
        expect(currency.rates)
            .length
            .greaterThanOrEqual(150)
            .deep
            .contains({
                code: "uah",
                count: 27.81432
            })
    })

    it("getting certain currency to certain currency rate", async (): Promise<void> => {
        const rate: Rate = await client.toCurrency("usd", "uah", "2021-05-04");
        expect(rate.code)
            .equal("uah");
        expect(rate.count)
            .equal(27.81432)
    })


    it("getting all currencies with wrong date", async (): Promise<void> => {
        await expect(client.currencies("12334234")).to.be.rejectedWith(Error);
    })

    it("getting certain currency rates with wrong code", async (): Promise<void> => {
        await expect(client.currency("dfgdf")).to.be.rejectedWith(Error);
    })

    it("getting certain currency to certain currency rate with wrong code", async (): Promise<void> => {
        await expect(client.toCurrency("dfgdf","usd")).to.be.rejectedWith(Error);
    })
    
    it("getting certain currency to certain currency rate with wrong toCode", async (): Promise<void> => {
        await expect(client.toCurrency("usd","dfgdf")).to.be.rejectedWith(Error);
    })

    it("conversion test", async (): Promise<void> => {
        const result = await client.convert({
                code: "usd",
                count: 10
            }, 
            "uah",
            "2021-05-04"
        );
        expect(result).equal(278.1432);
    })

});
