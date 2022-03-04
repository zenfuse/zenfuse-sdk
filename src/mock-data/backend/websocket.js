const { exchangesApiKeys } = require(`../frontend/users`);
const userExchange = getUserExchangeId("binance");
const backendOrders = require("../backend/order/orders").orders;
const { orders } = require("./order/orders");
const frontendId = `234435`;

const controllers = {
  /**
   * Запросы, отправляемые по WebSocket в сервис бекенда
   */
  websocket: {
    /**
     * Запрос на аутентификацию WebSocket соединения
     */
    authenticate: {
      correct: {
        request: {
          type: "AUTHENTIFICATE",
          payload: {
            jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImVtYWlsIjoiYmV0YXRlc3RlckB6ZW5mdXNlLmlvIiwidXNlcm5hbWUiOiJiZXRhdGVzdGVyIiwiaWF0IjoxNjI5NjYyNTQyLCJleHAiOjE2Mjk3NDg5NDJ9.sPKFmCI7qc8RKdyY6R4ElDaPUNX1Cgy4tS4fpH",
          },
        },
        response: {
          type: "AUTHENTIFICATE",
          payload: {
            success: true,
          },
        },
      },
      wrong: {
        request: {
          type: "AUTHENTIFICATE",
          payload: {
            jwt: "",
          },
        },
        response: {
          type: `ERROR`,
          payload: {
            event: `AUTHENTIFICATE`,
            error: `Wrong JWT-token`,
          },
        },
      },
    },
    /**
     * Соединение бекенда с коннекторами
     */
    connect: {
      correct: {
        response: {
          type: "CONNECT",
          payload: {
            userExchange,
            success: true,
          },
        },
      },
    },
    /**
     * Постановка ордера на бирже
     */
    newOrder: {
      /**
       * Лимитный ордер
       */
      limit: {
        correct: {
          request: {
            type: `NEW_ORDER`,
            payload: {
              userExchange,
              market: orders.open.market.id,
              type: orders.open.type,
              frontendId: `3333333333`,
              side: orders.open.side,
              amount: orders.open.amount,
              price: orders.open.price,
            },
          },
          response: {
            type: `NEW_ORDER`,
            payload: {
              userExchange,
              market: orders.open.market.id,
              type: orders.open.type,
              side: orders.open.side,
              amount: orders.open.amount,
              frontendId: `3333333333`,
              price: orders.open.price,
              opened: orders.open.opened,
              status: orders.open.status,
              originalId: orders.open.original_id,
              id: orders.open.id,
              trades: orders.open.trades,
            },
          },
        },
        /**
         * Не передана цена в лимитном ордере
         */
        wrongNoPrice: {
          request: {
            type: `NEW_ORDER`,
            payload: {
              userExchange,
              market: 2,
              type: orders.open.type,
              side: orders.open.side,
              amount: orders.open.amount,
            },
          },
          response: {},
        },
      },
      /**
       * Рыночный ордер с передачей количества требуемых монет (слева в торговой паре)
       */
      market: {
        correct: {
          request: {
            type: `NEW_ORDER`,
            payload: {
              userExchange,
              market: orders.filledMarket.market.id,
              type: "market",
              frontendId: "2222222222222",
              side: orders.filledMarket.side,
              amount: orders.filledMarket.amount,
            },
          },
          response: {
            type: `NEW_ORDER`,
            payload: getFrontendOrderPayloadFromBackendOrder(
              orders.filledMarket,
              orders.filledMarket.id,
              {
                frontendId: `2222222222222`,
                type: "market",
              }
            ),
          },
        },
        wrongHasPrice: {},
      },
      /**
       * Рыночный ордер с передачей количества затрачиваемых монет (справа в торговой паре)
       */
      marketTotal: {
        correct: {
          request: {
            type: `NEW_ORDER`,
            payload: {
              userExchange,
              market: orders.filledMarket.market.id,
              type: orders.filledMarket.type,
              frontendId: "111111111111",
              side: "buy",
              total: orders.filledMarket.total,
            },
          },
          response: {
            type: `NEW_ORDER`,
            payload: getFrontendOrderPayloadFromBackendOrder(
              orders.filledMarket,
              orders.filledMarket.id,
              {
                frontendId: `111111111111`,
              }
            ),
          },
        },
      },
      panicParent: {
        correct: {
          request: {
            type: `NEW_ORDER`,
            payload: {
              frontendId: `444444444444`,
              type: "market",
              suborders: [
                {
                  frontendId: `5555555555`,
                  market: orders.filledMarket.market.id,
                  side: orders.filledMarket.side,
                  total: orders.filledMarket.total,
                  type: "market",
                  userExchange: orders.filledMarket.user_exchange.id,
                },
              ],
            },
          },
          response: {
            type: `NEW_ORDER`,
            payload: {
              frontendId: `5555555555`,
              id: orders.panicParent.id,
              type: orders.panicParent.type,
              amount: orders.panicParent.amount,
              status: orders.panicParent.status,
              market: orders.panicParent.market,
              side: orders.panicParent.side,
              price: orders.panicParent.price,
              opened: orders.panicParent.opened,
              originalId: orders.panicParent.original_id,
            },
          },
        },
      },
      panicChild: {
        correct: {
          response: {
            type: `NEW_ORDER`,
            payload: getFrontendOrderPayloadFromBackendOrder(
              orders.panicChild,
              orders.panicChild.id,
              {
                frontendId: `444444444444`,
                parent: orders.panicParent.id,
              }
            ),
          },
        },
      },
    },
    /**
     * Изменение ордера на бирже
     */
    updateOrder: {
      /**
       * Изменение состояния ордера на отмененный
       */
      canceled: {
        correct: {
          request: {
            type: `UPDATE_ORDER`,
            payload: {
              userExchange,
              id: backendOrders.open.id,
              status: "canceled",
            },
          },
          response: {
            type: `UPDATE_ORDER`,
            payload: {
              userExchange,
              ...getFrontendOrderPayloadFromBackendOrder(
                backendOrders.open,
                backendOrders.open.id,
                {
                  status: "canceled",
                }
              ),
            },
          },
        },
      },
      /**
       * Изменение состояния ордера на заполненный
       */
      filled: {
        correct: {
          response: {
            type: `UPDATE_ORDER`,
            payload: {
              userExchange,
              ...getFrontendOrderPayloadFromBackendOrder(
                backendOrders.filledLimit,
                backendOrders.filledLimit.id
              ),
            },
          },
        },
      },
    },
    /**
     * Обновление балансов
     */
    updateBalances: {
      correct: {
        response: {
          type: "UPDATE_BALANCES",
          payload: {
            userExchange,
            balances: [
              { id: 2, ticker: 2, total: 0, used: 0 },
              { id: 45, ticker: 4, total: 354.3860004, used: 334.4224 },
              { id: 6, ticker: 54, total: 90, used: 10 },
            ],
          },
        },
      },
    },
  },
};

module.exports = { controllers };

/**
 * Получить идентификатор биржи по названию `uid`
 */
function getUserExchangeId(name) {
  return exchangesApiKeys[name].userExchangeId;
}

/**
 * Функция преобразования объекта ордера, полученного из модели на бекенде к формату, требуемому на фронтенде
 */
function getFrontendOrderPayloadFromBackendOrder(order, backendId, payload) {
  const trades = order.trades.map((t) => {
    if (!t) return;
    t;
    return {
      id: t.id,
      price: t.price,
      amount: t.amount,
      order: t.order,
      originalId: t.original_id,
      timestamp: t.timestamp,
      fee: t.fee,
      feeTicker: t.fee_ticker,
      isMaker: t.is_maker,
    };
  });

  const prepared = {
    id: backendId,
    price: order.price,
    amount: order.amount,
    filled: order.filled,
    opened: order.opened,
    side: order.side,
    status: order.status,
    type: order.type,
    market: order.market.id,
    total: order.total,
    originalId: order.original_id,
    userExchange: order.user_exchange.id,
    trades,
    ...payload,
  };

  return prepared;
}
