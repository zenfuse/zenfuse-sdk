const request = {
  type: "GET_RATES",
  payload: {
    binance: [{ symbol: "cake/usdt" }],
  },
};

const response = {
  type: "GET_RATES",
  payload: {
    binance: { "cake/usdt": { price: "12.706", dailyChange: -13.77 } },
  },
};

module.exports = {
  request,
  response,
};
