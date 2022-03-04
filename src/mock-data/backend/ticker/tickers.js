const { createTechnicalData } = require("../utils");

const tickers = [
  {
    id: 34483,
    name: "Tether",
    ticker: "usdt",
    uid: "tether",
    tickerProfile: null,
    type: "crypto",
    meta: null,
    apiId: "825",
    icon: null,
    ...createTechnicalData(),
  },
  {
    id: 37366,
    name: "PancakeSwap",
    ticker: "cake",
    uid: "pancakeswap",
    tickerProfile: null,
    type: "crypto",
    meta: null,
    apiId: "7186",
    icon: null,
    ...createTechnicalData(),
  },
  {
    id: 34514,
    name: "Ethereum",
    ticker: "eth",
    uid: "ethereum",
    tickerProfile: null,
    type: "crypto",
    meta: null,
    apiId: "1027",
    icon: null,
    ...createTechnicalData(),
  },
  {
    id: 34743,
    name: "Binance Coin",
    ticker: "bnb",
    uid: "binance-coin",
    tickerProfile: null,
    type: "crypto",
    meta: null,
    apiId: "1839",
    icon: null,
    ...createTechnicalData(),
  },
];

const controllers = {
  http: {
    index: {
      get: {
        response: tickers,
      },
    },
  },
};

module.exports = { tickers, controllers };
