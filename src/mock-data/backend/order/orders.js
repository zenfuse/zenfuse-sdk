const axios = require("axios");

const { orders: ccxtOrders } = require("../../connectors/ccxt/orders");
const { exchangesApiKeys } = require(`../../frontend/users`);
const { createTechnicalData } = require("../utils");

const model = {
  // созданный, но не отправленный на биржу - нет original_id
  created: createOrderByCcxt({
    order: ccxtOrders.open,
    backendId: 10,
    status: "created",
  }),
  // созданный на бирже и не исполненный - status: "open"
  open: createOrderByCcxt({
    order: ccxtOrders.open,
    backendId: 9,
    status: "open",
  }),
  // созданный на бирже и исполненный - status: "filled"
  filledLimit: createOrderByCcxt({
    order: ccxtOrders.filledLimit,
    backendId: 12,
    status: "filled",
  }),
  filledMarket: createOrderByCcxt({
    order: ccxtOrders.filledMarket,
    backendId: 13,
    status: "filled",
  }),
  // созданный на бирже и отмененный - status: "canceled"
  canceled: createOrderByCcxt({
    order: ccxtOrders.canceled,
    backendId: 14,
    status: "canceled",
  }),
  panicParent: {
    id: 15,
    price: undefined,
    amount: undefined,
    opened: "1626810557136",
    closed: undefined,
    side: undefined,
    status: undefined,
    type: "market",
    parent: undefined,
    comment: undefined,
    market: undefined,
    original_id: undefined,
    is_maker: undefined,
    user_exchange: undefined,
    total: undefined,
    filled: undefined,
    user: 1,
    ...createTechnicalData(),
  },
  panicChild: createOrderByCcxt({
    order: ccxtOrders.filledMarket,
    backendId: 16,
    status: "filled",
    payload: { parent: 15 },
  }),
};

model.filledMarket;

module.exports = { orders: model };

function createOrderByCcxt({ order, backendId, status = "open", payload }) {
  return {
    id: backendId,
    price: order.average || order.price,
    amount: order.amount,
    opened: `${order.timestamp}`,
    filled: order.filled || 0,
    side: order.side,
    status: status,
    type: order.type,
    parent: undefined,
    closed: undefined,
    comment: undefined,
    market: getMarket(),
    original_id:
      ["open", "canceled", "filled"].indexOf(status) > -1
        ? `${order.id}`
        : undefined,
    user_exchange: getUserExchange(),
    total:
      order.status === "filled"
        ? parseFloat(order.average || order.price) * parseFloat(order.amount)
        : 0,
    suborders: [],
    trades: prepareTrades(order),
    ...payload,
  };
}

function prepareTrades(order) {
  let trades = [];

  for (const trade of order.trades) {
    trade;
    trades.push({
      id: parseInt(Math.random() * 1000000),
      price: trade.price,
      amount: order.amount / order.trades.length,
      order: order.id,
      original_id: `${trade.id}`,
      fee: trade.fee.cost,
      timestamp: `${trade.timestamp}`,
      fee_ticker: 34743,
      is_maker: trade.takerOrMaker === "taker" ? false : true,
    });

    trade; //?
  }

  return trades;
}

function getUserExchange() {
  return {
    id: exchangesApiKeys.binance.userExchangeId,
    // public_key: exchangesApiKeys.binance.publicKey,
    // secret_key: exchangesApiKeys.binance.publicKey,
    exchange: 23,
    user: 28,
    custom_name: "Binance",
  };
}

function getMarket() {
  return {
    id: 7822,
    type: "spot",
    base_ticker: 36248,
    quote_ticker: 34483,
    api_id: undefined,
    symbol: "DAI/USDT",
    ...createTechnicalData(),
  };
}
