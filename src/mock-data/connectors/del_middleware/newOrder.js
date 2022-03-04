const { getUserExchangeId } = require("./connect");
const userExchangeBinanceId = getUserExchangeId("binance");
const ccxtOpenLimitOrder = require("../ccxt/orders").orders.open;
const ccxtFilledMarketOrder = require("../ccxt/orders").orders.filledMarket;

const backendOpenLimitOrder = require("../../backend/order/orders").orders.open;
const backendFilledMarketOrder = require("../../backend/order/orders").orders
  .filledMarket;

/**
 * Request to the `Middleware Service` for creating order
 */
const request = {
  correct: {
    limit: {
      type: `NEW_ORDER`,
      userExchange: userExchangeBinanceId,
      payload: {
        backendId: backendOpenLimitOrder.id,
        symbol: backendOpenLimitOrder.market.symbol,
        type: backendOpenLimitOrder.type,
        side: backendOpenLimitOrder.side,
        amount: backendOpenLimitOrder.amount,
        price: backendOpenLimitOrder.price,
      },
    },
    market: {
      type: `NEW_ORDER`,
      userExchange: userExchangeBinanceId,
      payload: {
        backendId: backendFilledMarketOrder.id,
        symbol: backendFilledMarketOrder.market.symbol,
        type: backendFilledMarketOrder.type,
        side: backendFilledMarketOrder.side,
        amount: backendFilledMarketOrder.amount,
      },
    },
    panic: {
      market: {
        type: `NEW_ORDER`,
        userExchange: userExchangeBinanceId,
        payload: {
          backendId: backendFilledMarketOrder.id,
          symbol: backendFilledMarketOrder.market.symbol,
          type: backendFilledMarketOrder.type,
          side: backendFilledMarketOrder.side,
          amount: backendFilledMarketOrder.amount,
        },
      },
    },
  },
};

const response = {
  success: {
    limit: {
      type: `NEW_ORDER`,
      userExchange: userExchangeBinanceId,
      payload: getOrderPayloadFromCcxtOrder(
        ccxtOpenLimitOrder,
        backendOpenLimitOrder.id
      ),
    },
    market: {
      type: `NEW_ORDER`,
      userExchange: userExchangeBinanceId,
      payload: getOrderPayloadFromCcxtOrder(
        ccxtFilledMarketOrder,
        backendFilledMarketOrder.id,
        {
          trades: [],
        }
      ),
    },
    panic: {
      market: {
        type: `NEW_ORDER`,
        userExchange: userExchangeBinanceId,
        payload: getOrderPayloadFromCcxtOrder(
          ccxtFilledMarketOrder,
          backendFilledMarketOrder.id,
          {
            trades: [],
          }
        ),
      },
    },
  },
  failure: {
    price: {
      type: "ERROR",
      payload: {
        event: "NEW_ORDER",
        msg: "Filter failure: PERCENT_PRICE",
        userExchange: userExchangeBinanceId,
        backendId: backendOpenLimitOrder.id,
      },
    },
  },
};

module.exports = {
  request,
  response,
};

function getOrderPayloadFromCcxtOrder(order, backendId, payload) {
  const getTotal = () => {
    if ((payload && payload.status === "filled") || order.status === "filled") {
      return order.amount * (order.average || order.price);
    }
    return undefined;
  };

  const getTrades = () => {
    return [];
  };

  return {
    backendId: backendId,
    id: order.id,
    price: order.average || order.price,
    amount: order.amount,
    filled: order.filled,
    opened: order.timestamp,
    updated: order.lastTradeTimestamp || "",
    side: order.side,
    status: order.status,
    type: order.type,
    symbol: order.symbol,
    comment: order.comment,
    total: getTotal(),
    trades: getTrades(),
    ...payload,
  };
}
