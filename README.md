# bankiru

get responses from Banki.ru

## Getting Started
Install the module with: `npm install bankiru`

```javascript
const BankiRU = require('bankiru');
const bankiru = new bankiru('tcs')

bankiru.getResponses()
    .then(responses => console.log(responses))
```