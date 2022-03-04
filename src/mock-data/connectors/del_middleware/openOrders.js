const { getUserExchangeId } = require("./connect");
const userExchangeBinanceId = getUserExchangeId("binance");
const backendOrders = require("../../backend/order/orders").orders;

const request = {
  type: `OPEN_ORDERS`,
  userExchange: userExchangeBinanceId,
  payload: {
    orders: [
      {
        id: backendOrders.open.original_id,
        backendId: backendOrders.open.id,
        symbol: backendOrders.open.market.symbol,
        trades: 0,
      },
      {
        id: backendOrders.filledLimit.original_id,
        backendId: backendOrders.open.id,
        symbol: backendOrders.filledLimit.market.symbol,
        trades: 0,
      },
    ],
  },
};

// console.log(`🚀 ~ OPEN_ORDERS`);
// console.log(JSON.stringify(request));

module.exports = {
  request,
};
