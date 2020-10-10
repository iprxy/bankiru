# bankiRU

get responses from Banki.ru

## Getting Started
Install the module with: `npm install bankiRU`

```javascript
const BankiRU = require('bankiRU');
const bankiru = new BankiRU('tcs')

bankiRU.getResponses()
    .then(responses => console.log(responses))
```