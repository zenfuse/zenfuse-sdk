const request = {
  type: "GET_CANDLES",
  payload: {
    binance: [{ symbol: "cake/usdt", interval: "1" }],
  },
};

const response = {
  type: "GET_CANDLES",
  payload: {
    binance: {
      "cake/usdt": [
        {
          time: 1624343760000,
          open: 12.69,
          high: 12.73,
          low: 12.675,
          close: 12.716,
          volume: 4660.736,
          interval: "1",
        },
      ],
    },
  },
};

module.exports = {
  request,
  response,
};
