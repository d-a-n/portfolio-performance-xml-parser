# Portfolio Performance XML Parser

Parses Portfolio Performance XMLs and returns a JSON representation

## Install

> `npm i --save @d-a-n/portfolio-performance-xml-parser`

## Usage

```javascript
import fs from 'fs';
import parse from '@d-a-n/portfolio-performance-xml-parser';

const xmlString = fs.readFileSync('./portfolio.xml', 'utf-8');

const { securities, transactions } = parse(xmlString);
```

Returns

```
{
  "securities": [
    {
      "uuid": "40089f48-4cce-4e2e-b541-827037706ec9",
      "name": "MSCI World UCITS ETF USD",
      "currencyCode": "EUR",
      "note": "note",
      "isin": "IE00B4L5Y983",
      "tickerSymbol": "EUNL.DE",
      "wkn": "A0RPWH"
    }
  ],
  "transactions": [
    {
      "security": "40089f48-4cce-4e2e-b541-827037706ec9",
      "tax": {
        "currency": "EUR",
        "amount": 3.48
      },
      "shares": 36,
      "amount": 19.75,
      "date": "2017-02-17T23:00:00.000Z",
      "type": "DIVIDENDS",
      "currencyCode": "EUR",
      "note": "note"
    }
  ]
}
```
