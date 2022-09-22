/* eslint-disable no-useless-catch */
const { parse } = require('node-html-parser');
const axios = require('axios');

class BankiRU {
  constructor(bankName) {
    this.ratingUrl = `https://www.banki.ru/services/responses/bank/${bankName}/?page=`;
    this.responsesClass = '.responses__item';
    this.pageNumberClass = '.ui-pagination__item';
    this.bankiUrl = 'https://banki.ru';
  }

  async _getData(pageNumber = 1) {
    try {
      const request = await axios.get(this.ratingUrl + pageNumber);
      const {
        data,
      } = request;
      const document = parse(data);
      return document;
    } catch (err) {
      throw err;
    }
  }

  async _parseData(pageNumber = 1) {
    try {
      const document = await this._getData(pageNumber);
      const responsesDom = document.querySelectorAll(this.responsesClass);
      const responsesArr = responsesDom.map((response) => {
        const responseId = +response.querySelector('.header-h3').attributes.href.match(/(\d+)/g)[0];
        const responseTitle = response.querySelector('.header-h3').innerText;
        const responseUrl = this.bankiUrl + response.querySelector('.header-h3').attributes.href;
        const ratingGrade = response.querySelector('.rating-grade');
        const score = ratingGrade
          ? +ratingGrade.innerText.match(/(\d+)/g)[0]
          : null;
        const responseTexts = response.querySelectorAll('.responses__item__message');
        const textType = responseTexts.length === 1 ? 0 : 1; // if text is long we have two element, need to return long
        const responseText = responseTexts[textType].structuredText.replace(/(\t)/g, '');
        const responseDate = response.querySelector('time').innerText;
        const formattedStatus = response.querySelectorAll('.text-label')
          .filter((x) => x.rawAttributes['data-test'] === 'responses-status')
          .map((el) => {
            const formatted = el.innerText.replace(/(\n|\t)/g, '');
            const value = formatted.length ? formatted : 'Засчитана';
            return value;
          });
        const comments = response.querySelector('.responses__item__comment-count');
        const commentsCount = comments
          ? +response.querySelector('.responses__item__comment-count').innerText
          : null;
        const scoreStatus = score
          ? formattedStatus[0]
          : null;

        return {
          id: responseId,
          title: responseTitle,
          url: responseUrl,
          score,
          status: scoreStatus,
          text: responseText,
          commentsCount,
          updateDate: responseDate,
        };
      });
      return responsesArr;
    } catch (err) {
      throw err;
    }
  }

  async _getPagesCount() {
    try {
      const document = await this._getData();
      const pageNumbersElement = document.querySelectorAll('.margin-top-default')
        .filter((x) => x.rawAttributes['data-test'] === 'folkrating-responses-list-comments-pagination')[0];
      const [, itemsPerPage, totalItems] = pageNumbersElement.rawAttributes['data-options'].split('; ')
        .map((el) => {
          const numbersOnly = el.match(/(\d+)/g);
          const values = numbersOnly ? +numbersOnly[0] : '';
          return values;
        });

      return {
        totalItems,
        pagesCount: Math.ceil(totalItems / itemsPerPage),
      };
    } catch (err) {
      throw err;
    }
  }

  async getResponses(pageNumber = 1) {
    try {
      const responses = await this._parseData(pageNumber);
      const { totalItems, pagesCount } = await this._getPagesCount();

      return {
        totalResponses: totalItems,
        currentPage: pageNumber,
        pagesCount,
        items: responses,
      };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = BankiRU;
