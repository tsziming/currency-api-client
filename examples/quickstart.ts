import { CurrencyClient } from "../src";

const client = new CurrencyClient();

client.toCurrency("eur", "usd")
    .then((rate)=> {
        console.log(rate.code); //usd
        console.log(rate.count); // 1.17846 or something like that (how many dollars in euro)
    });
