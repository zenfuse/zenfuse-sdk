const userExchangeFind = require("../userExchange/userExchanges").find;

const { orders } = require("../order/orders");

const controllers = {
  http: {
    /**
     * @route /api/trading-view
     */
    index: {
      post: {
        /**
         * Создание нового ордера на бирже
         */
        createOrder: {
          total: {
            correct: {
              request: {
                method: "NEW_ORDER",
                userExchange: userExchangeFind[0].id,
                apiKey: "XXXXXXXXXXXXXXXXXXXXX",
                side: orders.open.side,
                type: orders.open.type,
                price: orders.open.price,
                takeProfit: orders.open.price + orders.open.price * 0.1,
                total: orders.open.amount * orders.open.price,
                symbol: orders.open.market.symbol,
              },
              response: {
                method: "NEW_ORDER",
                takeProfit: orders.open.price + orders.open.price * 0.1,
                ...orders.open,
              },
            },
          },
          amount: {
            correct: {
              request: {
                method: "NEW_ORDER",
                userExchange: userExchangeFind[0].id,
                apiKey: "XXXXXXXXXXXXXXXXXXXXX",
                side: orders.open.side,
                type: orders.open.type,
                price: orders.open.price,
                takeProfit: orders.open.price + orders.open.price * 0.1,
                total: orders.open.amount,
                symbol: orders.open.market.symbol,
              },
              response: {
                method: "NEW_ORDER",
                takeProfit: orders.open.price + orders.open.price * 0.1,
                ...orders.open,
              },
            },
          },
        },
        /**
         * Отмена ордеров определенного типа и определенного направления
         */
        cancelAllOrders: {
          correct: {
            request: {
              method: "CANCEL_ALL_ORDERS",
              userExchange: userExchangeFind[0].id,
              apiKey: "XXXXXXXXXXXXXXXXXXXXX",
              symbol: orders.canceled.market.symbol,
              side: orders.canceled.side,
            },
            response: {
              method: "CANCEL_ALL_ORDERS",
              symbol: orders.canceled.market.symbol,
              side: orders.canceled.side,
            },
          },
        },
      },
    },
  },
};

module.exports = { controllers };

controllers.http.index.post.createOrder.total;
