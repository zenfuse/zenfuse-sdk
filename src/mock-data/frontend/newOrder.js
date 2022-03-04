const {
  connectRequest,
  getUserExchangeId,
} = require("../connectors/del_middleware/connect");
const userExchange = getUserExchangeId("binance");
const openCcxtOrder = require("../connectors/ccxt/orders").orders.open;
const { orders } = require("../backend/order/orders");

const request = {
  correct: {
    limit: {
      type: `NEW_ORDER`,
      userExchange,
      payload: {
        market: orders.created.market.id,
        type: orders.created.type,
        side: orders.created.side,
        amount: orders.created.amount,
        price: orders.created.price,
      },
    },
  },
  wrong: {
    limit: {
      type: `NEW_ORDER`,
      userExchange,
      payload: {
        market: 2,
        type: openCcxtOrder.type,
        side: openCcxtOrder.side,
        amount: openCcxtOrder.amount,
      },
    },
    market: {
      type: `NEW_ORDER`,
      userExchange,
      payload: {
        market: 2,
        type: "market",
        side: openCcxtOrder.side,
        amount: openCcxtOrder.amount,
        price: openCcxtOrder.price,
      },
    },
  },
};

const response = {
  success: {
    limit: {
      type: `NEW_ORDER`,
      userExchange,
      payload: {
        market: orders.created.market.id,
        type: orders.created.type,
        side: orders.created.side,
        amount: orders.created.amount,
        price: orders.created.price,
        status: orders.created.status,
        originalId: orders.created.original_id,
        backendId: orders.created.id,
      },
    },
  },
};

module.exports = {
  request,
  response,
};
