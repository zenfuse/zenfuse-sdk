const axios = require("axios");
const crypto = require("crypto");

async function getSymbolCurrentPrice(symbol) {
  const price = await axios(
    `https://tickers.zenfuse.io/cmc-global-data/cryptocurrencies`
  )
    .then((res) => {
      const ticker = res.data.data.filter((t) => {
        if (t.symbol === symbol.toUpperCase()) {
          return t;
        }
      });
      if (ticker && ticker[0]?.quote?.USD) {
        return ticker[0].quote.USD.price;
      }
    })
    .catch((error) => {
      console.log(`getSymbolCurrentPrice error`, error);
    });

  return price;
}

/**
 * Функция создания мокового ордера по структуре соответствующего структуре
 * ордера из  ccxt
 */
function createOrderPayload({
  base = "dai",
  quote = "usdt",
  side = "buy",
  type = "limit",
  status = "open",
}) {
  const price = 1;
  const order = {
    id: parseInt(Math.random() * 1000000),
    timestamp: new Date().getTime(),
    datetime: new Date().toISOString(),
    lastTradeTimestamp: undefined,
    symbol: `${base.toUpperCase()}/${quote.toUpperCase()}`,
    clientOrderId: crypto.randomBytes(20).toString("hex"),
    type,
    timeInForce: "GTC",
    postOnly: false,
    side,
    stopPrice: undefined,
    status,
    cost: undefined,
    average: undefined,
    remaining: undefined,
  };

  if (type === "limit") {
    order.price = price - price * 0.1;
  } else {
    order.average = price;
  }

  order.amount = 20 / price;

  order.trades = [];

  if (status === "open" || status === "canceled") {
    order.filled = undefined;
    order.average = undefined;
    order.remaining = order.amount;
    if (status === "canceled") {
      order.status = "canceled";
    }
  }

  if (status === "filled") {
    order.cost = order.amount * order.price;
    order.remaining = 0;
    order.filled = order.amount;

    if (type !== "limit") {
      order.average = price - price * 0.2;
      order.cost = order.amount * order.average;
      order.status = "filled";
    }

    const trade = {
      timestamp: order.timestamp,
      datetime: order.datetime,
      symbol: order.symbol,
      id: parseInt(Math.random() * 1000000),
      order: order.id,
      type: undefined,
      side,
      takerOrMaker: "taker",
      price: order.price || order.average,
      amount: order.amount,
      cost: order.cost,
      fee: { cost: order.cost * 0.005, currency: "USDT" },
    };

    order.trades.push(trade);
  }

  return order;
}

const orders = {};

orders.open = createOrderPayload({});
orders.canceled = createOrderPayload({ status: "canceled" });
orders.filledLimit = createOrderPayload({ status: "filled" });
orders.filledMarket = createOrderPayload({ type: "market", status: "filled" });

module.exports = {
  orders,
};

const ccxtFilledOrder = {
  info: {
    symbol: "BUSDUSDT",
    orderId: 329350774,
    orderListId: -1,
    clientOrderId: "x-R4BD3S82b7b701c20c0b42538d703d",
    transactTime: 1636968649973,
    price: "0.00000000",
    origQty: "40.00000000",
    executedQty: "40.00000000",
    cummulativeQuoteQty: "39.99200000",
    status: "FILLED",
    timeInForce: "GTC",
    type: "MARKET",
    side: "BUY",
    fills: [
      {
        price: "0.99980000",
        qty: "40.00000000",
        commission: "0.00000000",
        commissionAsset: "BNB",
        tradeId: 211553583,
      },
    ],
  },
  id: "329350774",
  clientOrderId: "x-R4BD3S82b7b701c20c0b42538d703d",
  timestamp: 1636968649973,
  datetime: "2021-11-15T09:30:49.973Z",
  lastTradeTimestamp: undefined,
  symbol: "BUSD/USDT",
  type: "market",
  timeInForce: "GTC",
  postOnly: false,
  side: "buy",
  price: 0.9997999999999999,
  stopPrice: undefined,
  amount: 40,
  cost: 39.992000000000004,
  average: 0.9998000000000001,
  filled: 40,
  remaining: 0,
  status: "closed",
  fee: {
    cost: 0,
    currency: "BNB",
  },
  trades: [
    {
      info: {
        price: "0.99980000",
        qty: "40.00000000",
        commission: "0.00000000",
        commissionAsset: "BNB",
        tradeId: 211553583,
      },
      timestamp: undefined,
      datetime: undefined,
      symbol: "BUSD/USDT",
      id: undefined,
      order: undefined,
      type: undefined,
      side: undefined,
      takerOrMaker: undefined,
      price: 0.9998,
      amount: 40,
      cost: 39.992000000000004,
      fee: {
        cost: 0,
        currency: "BNB",
      },
    },
  ],
};
