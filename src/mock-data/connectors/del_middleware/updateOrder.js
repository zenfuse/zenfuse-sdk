const { getUserExchangeId } = require("./connect");
const { orders: ccxtOrders } = require("../ccxt/orders");
const userExchange = getUserExchangeId("binance");
const backendOpenOrder = require("../../backend/order/orders").orders.open;

const getOrderPayload = () => {};

const request = {
  canceled: {
    type: `UPDATE_ORDER`,
    userExchange,
    payload: {
      id: backendOpenOrder.original_id,
      backendId: backendOpenOrder.id,
      symbol: backendOpenOrder.market.symbol,
      status: "canceled",
    },
  },
};

// console.log(`🚀 ~ request`, request);

const response = {
  canceled: {
    type: `UPDATE_ORDER`,
    userExchange,
    payload: getOrderPayload(ccxtOrders.open, backendOpenOrder.id, {
      status: "canceled",
    }),
  },
  filled: {
    type: `UPDATE_ORDER`,
    userExchange,
    payload: {
      ...getOrderPayload(ccxtOrders.filled, backendOpenOrder.id),
      trades: [],
    },
  },
};

module.exports = {
  request,
  response,
};
