# bankiru

get responses from Banki.ru

## Getting Started
Install the module with: `npm install bankiru`

```javascript
const BankiRU = require('bankiru');
const bankiru = new BankiRU('tcs')

bankiru.getResponses()
    .then(responses => console.log(responses))

bankiru.getResponses()
  .then(r => console.log(r))

//returns
{
  totalResponses: 41673,
  currentPage: 1,
  pagesCount: 1667,
  items: [
    {
      id: 10427342,
      title: 'Хороший банк!',
      url: 'https://banki.ru/services/responses/bank/response/10427342/',
      score: 4,
      status: 'Проверяется',
      text: 'Пользуюсь и дебетовой картой, и кредитной + есть автокредит. За 2 года ни единого лишнего списания и ни единой ошибки со стороны банка. + Банк клиентоориентирован очень, операторы всегда помогают.&nbsp;\n' +
        'Единственный момент - брал автокредит, поставили максимальную ставку. Спустя время отписал в чате просьбу пересмотреть, т.к., нет просрочек и прочего - отказали\n' +
        '+Тоже самое по процентной ставке на кредитную карту Другим же одобряют, чем я хуже. Была бы вообще песня\n' +
        'А в целом - огонь, банком доволен!)',
      commentsCount: 1,
      updateDate: '11.10.2020 1:04'
    },
    ...
  ]
}

//using pagination
bankiru.getResponses(2)
  .then(r => console.log(r))

```