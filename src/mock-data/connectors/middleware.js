const { exchangesApiKeys } = require(`../frontend/users`);
const userExchangeId = 1;
const { orders: backendOrders } = require("../backend/order/orders");
const ccxtOpenLimitOrder = require("./ccxt/orders").orders.open;
const ccxtCanceledLimitOrder = require("./ccxt/orders").orders.canceled;
const ccxtFilledMarketOrder = require("./ccxt/orders").orders.filledMarket;
const ccxtFilledLimitOrder = require("./ccxt/orders").orders.filledLimit;

const backendOpenLimitOrder = require("../backend/order/orders").orders.open;
const backendCanceledLimitOrder = require("../backend/order/orders").orders
  .canceled;
const backendFilledMarketOrder = require("../backend/order/orders").orders
  .filledMarket;
const backendFilledLimitOrder = require("../backend/order/orders").orders
  .filledLimit;

const controllers = {
  /**
   * WebSocket connection
   */
  websocket: {
    /**
     * @route /
     */
    index: {
      /**
       * Передача API-ключей бирж и подключение к ним
       */
      connect: {
        correct: {
          request: {
            type: `CONNECT`,
            payload: {
              exchanges: [
                {
                  id: userExchangeId,
                  exchange: "binance",
                  publicKey: exchangesApiKeys["binance"].publicKey,
                  secretKey: exchangesApiKeys["binance"].secretKey,
                },
              ],
            },
          },
          response: {
            type: `CONNECT`,
            userExchange: userExchangeId,
            payload: {
              success: true,
            },
          },
        },
        wrong: {
          request: {
            type: `CONNECT`,
            payload: {
              exchanges: [
                {
                  id: userExchangeId,
                  exchange: "binance",
                  publicKey: exchangesApiKeys["wrongBinance"].publicKey,
                  secretKey: exchangesApiKeys["wrongBinance"].secretKey,
                },
              ],
            },
          },
          response: {
            type: "ERROR",
            userExchange: userExchangeId,
            payload: {
              event: "CONNECT",
              msg: "Invalid API-key, IP, or permissions for action.",
            },
          },
        },
      },
      /**
       * Обновить балансы
       */
      updateBalances: {
        /**
         * Балансы, которые записаны в БД
         * НЕ соответствуют тем, что есть на бирже
         */
        updated: {
          request: {
            type: "UPDATE_BALANCES",
            userExchange: userExchangeId,
            payload: {
              balances: [
                { ticker: "eth", total: 10, used: 4, type: "spot" },
                {
                  ticker: "usdt",
                  total: 64.3860004,
                  used: 33.4224,
                  type: "spot",
                },
              ],
            },
          },
          response: {
            type: "UPDATE_BALANCES",
            userExchange: userExchangeId,
            payload: {
              balances: [
                {
                  ticker: "usdt",
                  total: 354.3860004,
                  used: 334.4224,
                  type: "spot",
                },
              ],
            },
          },
        },
        /**
         * Балансы, которые записаны в БД
         * соответствуют тем, что есть на бирже
         */
        notUpdated: {
          request: {
            type: "UPDATE_BALANCES",
            userExchange: userExchangeId,
            payload: {
              balances: [
                { ticker: "eth", total: 0, used: 0, type: "spot" },
                {
                  ticker: "usdt",
                  total: 354.3860004,
                  used: 334.4224,
                  type: "spot",
                },
                { ticker: "btc", total: 90, used: 10, type: "spot" },
              ],
            },
          },
          response: {},
        },
      },
      /**
       * Создать ордер на бирже
       */
      newOrder: {
        /**
         * Лимитный ордер
         */
        limit: {
          correct: {
            request: {
              type: `NEW_ORDER`,
              userExchange: userExchangeId,
              payload: {
                backendId: backendOpenLimitOrder.id,
                symbol: backendOpenLimitOrder.market.symbol,
                type: backendOpenLimitOrder.type,
                side: backendOpenLimitOrder.side,
                amount: backendOpenLimitOrder.amount,
                price: backendOpenLimitOrder.price,
              },
            },
            response: {
              type: `NEW_ORDER`,
              userExchange: userExchangeId,
              payload: getOrderPayloadFromCcxtOrder(
                ccxtOpenLimitOrder,
                backendOpenLimitOrder.id
              ),
            },
          },
        },
        /**
         * Рыночный ордер
         */
        market: {
          correct: {
            request: {
              type: `NEW_ORDER`,
              userExchange: userExchangeId,
              payload: {
                backendId: backendFilledMarketOrder.id,
                symbol: backendFilledMarketOrder.market.symbol,
                type: backendFilledMarketOrder.type,
                side: backendFilledMarketOrder.side,
                amount: backendFilledMarketOrder.amount,
              },
            },
            response: {
              type: `NEW_ORDER`,
              userExchange: userExchangeId,
              payload: getOrderPayloadFromCcxtOrder(
                ccxtFilledMarketOrder,
                backendFilledMarketOrder.id,
                {
                  trades: [
                    {
                      id: `${ccxtFilledMarketOrder.trades[0].id}`,
                      price: ccxtFilledMarketOrder.trades[0].price,
                      amount: ccxtFilledMarketOrder.trades[0].amount,
                      price: ccxtFilledMarketOrder.trades[0].cost,
                      timestamp: ccxtFilledMarketOrder.trades[0].timestamp,
                      isMaker:
                        ccxtFilledMarketOrder.trades[0].takerOrMaker === "taker"
                          ? false
                          : true,
                      fee: ccxtFilledMarketOrder.trades[0].fee.cost,
                      feeTicker: ccxtFilledMarketOrder.trades[0].fee.currency,
                    },
                  ],
                }
              ) /*?*/,
            },
          },
        },
      },
      /**
       * Изменить поставленный на бирже ордер
       */
      updateOrder: {
        /**
         * Отменить ордер на бирже
         */
        canceled: {
          correct: {
            request: {
              type: `UPDATE_ORDER`,
              userExchange: userExchangeId,
              payload: {
                backendId: backendCanceledLimitOrder.id,
                symbol: backendCanceledLimitOrder.market.symbol,
                status: "canceled",
              },
            },
            response: {
              type: `UPDATE_ORDER`,
              userExchange: userExchangeId,
              payload: getOrderPayloadFromCcxtOrder(
                ccxtCanceledLimitOrder,
                backendCanceledLimitOrder.id
              ),
            },
          },
        },
        /**
         * Заполненный ордер
         */
        filled: {
          request: {},
          response: {
            type: `UPDATE_ORDER`,
            userExchange: userExchangeId,
            payload: getOrderPayloadFromCcxtOrder(
              ccxtFilledLimitOrder,
              backendFilledLimitOrder.id,
              {
                trades: [
                  {
                    id: `${ccxtFilledLimitOrder.trades[0].id}`,
                    price: ccxtFilledLimitOrder.trades[0].price,
                    amount: ccxtFilledLimitOrder.trades[0].amount,
                    price: ccxtFilledLimitOrder.trades[0].cost,
                    timestamp: ccxtFilledLimitOrder.trades[0].timestamp,
                    isMaker:
                      ccxtFilledLimitOrder.trades[0].takerOrMaker === "taker"
                        ? false
                        : true,
                    fee: ccxtFilledLimitOrder.trades[0].fee.cost,
                    feeTicker: ccxtFilledLimitOrder.trades[0].fee.currency,
                  },
                ],
              }
            ) /*?*/,
          },
        },
      },
      /**
       * Проверка статуса открытых ордеров на бирже
       */
      openOrders: {
        correct: {
          request: {
            type: `OPEN_ORDERS`,
            userExchange: userExchangeId,
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
          },
        },
      },
    },
  },
};

module.exports = {
  controllers,
};

controllers.websocket.index.updateOrder.canceled.correct;

/**
 * Получить идентификатор биржи по названию `uid`
 */
function getUserExchangeId(name) {
  return exchangesApiKeys[name].userExchangeId;
}

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
    id: `${order.id}`,
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
