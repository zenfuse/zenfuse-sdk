const { tickers } = require("../ticker/tickers");
const { createTechnicalData, get } = require("../utils");
const { userExchanges } = require("../userExchange/userExchanges");
const { balances: ccxtBalances } = require("../../connectors/ccxt/balances");

const balances = [
  {
    id: 68,
    ticker: get(tickers, "eth", "ticker"),
    exchange: null,
    total: ccxtBalances.ETH.total,
    used: ccxtBalances.ETH.used,
    user_exchange: get(userExchanges, 74, "id"),
    ...createTechnicalData(),
  },
  {
    id: 66,
    ticker: get(tickers, "usdt", "ticker"),
    exchange: null,
    total: ccxtBalances.USDT.total,
    used: ccxtBalances.USDT.used,
    user_exchange: get(userExchanges, 74, "id"),
    ...createTechnicalData(),
  },
  {
    id: 73,
    ticker: get(tickers, "cake", "ticker"),
    exchange: null,
    total: ccxtBalances.CAKE.total,
    used: ccxtBalances.CAKE.used,
    user_exchange: get(userExchanges, 74, "id"),
    ...createTechnicalData(),
  },
];

module.exports = { balances };
