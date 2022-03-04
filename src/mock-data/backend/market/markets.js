const { createTechnicalData } = require("../utils");
const { tickers } = require("../ticker/tickers");

const model = {
  id: 6770,
  type: "spot",
  base_ticker: 36149,
  quote_ticker: 34483,
  api_id: undefined,
  symbol: "BUSD/USDT",
  ...createTechnicalData(),
};

const markets = [
  {
    id: 6542,
    type: "spot",
    base_ticker: 34743,
    quote_ticker: 34483,
    api_id: null,
    symbol: "BNB/USDT",
    ...createTechnicalData(),
  },
];

const filledMarkets = markets.map((m) => {
  return {
    ...m,
    base_ticker: tickers.filter((t) => t.id === m.base_ticker)[0],
    quote_ticker: tickers.filter((t) => t.id === m.quote_ticker)[0],
  };
});

module.exports = { markets, filledMarkets, model };
