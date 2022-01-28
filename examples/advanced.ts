import { CurrencyClient } from "../src";

const client = new CurrencyClient({
    minified: true, // Whether to request compressed data or data with indentation. (default: true)
    userAgent: "Mozila Firefox", // How the sender of the request will be signed. (default: -)
});

client.currencies().then(
    (currencies) => currencies.forEach(
        (currency, index) => console.log(`${index+1}. ${currency.code} - ${currency.name}`)
    ) // logs currencies list in format "1. USD - American Dollar" etc.
)

client.currency("eur", "2020-11-25").then(
    (currency) => {
        console.log(currency.name)
        console.log(currency.code)
        currency.rates?.forEach(
            (rate, index) => {
                console.log(`${index+1}. ${rate.code} - ${rate.count}`);
            }
        ) // logs currency to currency rates list in format "1. EUR - 1.25" etc.
    } 
)

client.toCurrency("eur", "usd")
    .then((rate)=> {
        console.log(rate.code); //usd
        console.log(rate.count); // 1.17846 or something like that (how many dollars in euro)
});

client.convert({
    code: "usd",
    count: 10,
}, "uah")
    .then((uahCount)=> {
        console.log(uahCount); // 10$ in UAH ( something about 270-300 UAH )
    });
