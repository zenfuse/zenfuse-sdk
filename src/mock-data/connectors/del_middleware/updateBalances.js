const { getUserExchangeId } = require("./connect");
const userExchangeBinanceId = getUserExchangeId("binance");
// const ccxtBalances = require("../ccxt/balances").balances;
// const { balances: backendBalances } = require("../../backend/balance/balances");
// const toDelete = ["info", "used", "free", "timestamp", "datetime", "total"];

// const skip = (key) => {
//   return toDelete.indexOf(key) > -1;
// };

// const getBalances = (greaterThan = 0) => {
//   return Object.keys(ccxtBalances)
//     .map((key) => {
//       if (!skip(key) && ccxtBalances[key].total > greaterThan) {
//         return {
//           ticker: key.toLowerCase(),
//           total: ccxtBalances[key].total,
//           used: ccxtBalances[key].used,
//           type: "spot",
//         };
//       }
//     })
//     .filter((balance) => balance !== undefined);
// };

// const getBackendBalances = () => {
//   return backendBalances.map((b) => {
//     return {
//       ticker: b.ticker.ticker,
//       total: b.total,
//       used: b.used,
//       type: "spot",
//     };
//   });
// };

const request = {
  /**
   * Балансы, которые записаны в БД
   * НЕ соответствуют тем, что есть на бирже
   */
  updated: {
    type: "UPDATE_BALANCES",
    userExchange: getUserExchangeId("binance"),
    payload: {
      balances: [
        { ticker: "eth", total: 10, used: 4, type: "spot" },
        { ticker: "usdt", total: 64.3860004, used: 33.4224, type: "spot" },
        { ticker: "cake", total: 3.77, used: 1, type: "spot" },
      ],
    },
  },
  /**
   * Балансы, которые записаны в БД
   * соответствуют тем, что есть на бирже
   */
  notUpdated: {
    type: "UPDATE_BALANCES",
    userExchange: getUserExchangeId("binance"),
    payload: {
      balances: [
        { ticker: "eth", total: 0, used: 0, type: "spot" },
        { ticker: "usdt", total: 354.3860004, used: 334.4224, type: "spot" },
        { ticker: "bnb", total: 90, used: 10, type: "spot" },
        { ticker: "cake", total: 3.77, used: 1, type: "spot" },
      ],
    },
  },
};

const response = {
  /**
   * Если переданные балансы не соответствуют текущим на бирже
   * возвращаются в массиве те, что изменились
   * те, которые не изменились относительно переданных - не возвращаются
   */
  updated: {
    type: "UPDATE_BALANCES",
    userExchange: userExchangeBinanceId,
    payload: {
      balances: [
        { ticker: "eth", total: 0, used: 0, type: "spot" },
        { ticker: "usdt", total: 354.3860004, used: 334.4224, type: "spot" },
        { ticker: "bnb", total: 90, used: 10, type: "spot" },
      ],
    },
  },
  /**
   * Сообщение, отправляемое после того, как был поставлен ордер и
   * балансы на бирже изменились
   * передаются те, что изменились относительно переданных при
   * подключении к сервису
   */
  cancelOrder: {
    type: "UPDATE_BALANCES",
    userExchange: userExchangeBinanceId,
    payload: {
      balances: [
        { ticker: "usdt", total: 64.3860004, used: 33.4224, type: "spot" },
        { ticker: "cake", total: 3.77, used: 1, type: "spot" },
        { ticker: "eth", total: 10, used: 4, type: "spot" },
      ],
    },
  },
};

module.exports = { request, response };

// console.log("🚀 ~ getBalances", getBalances());
// console.log();
// console.log(`🚀 ~ request`, request.updated);
