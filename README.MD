# Currency API Client

Minimalistic & typed api client for [currency-api](https://github.com/fawazahmed0/currency-api)

## Installation

Using yarn:

```bash
yarn add currency-api-client
```

Using npm:

```bash
npm i currency-api-client
```

## 👀 Quickstart

```typescript
import { CurrencyClient } from "../src";

const client = new CurrencyClient();

client.toCurrency("eur", "usd")
    .then((rate)=> {
        console.log(rate.code); //usd
        console.log(rate.count); // 1.17846 or something like that (how many dollars in euro)
    });
```

## Advanced Example

```typescript
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
```

## Methods

### `currencies(date?:string, minified?:boolean)`

Returns an array of all currencies (their name and code) for a certain date or latest.

### `currency(code:string, date?:string, minified?:boolean)`

Returns data (name and rate to other currencies) of a currency with a certain code, as of the specified date or latest.

### `toCurrency(code:string, toCode:string, date?:string, minified?:boolean)`

Returns rate of a currency with a certain code to the other currency with a certain toCode, as of the specified date or latest.

### `toCurrency(from:{code:string, count:number}, toCode:string, date?:string, minified?:boolean)`

Returns converted count of a currency with a certain code to the other currency with a certain toCode, using the exchange rate, as of the specified date or latest.

## License

MIT - Made by [tsziming](https://github.com/tsziming)
