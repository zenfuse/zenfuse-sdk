const userExchangeFind = require("../userExchange/userExchanges").find;

const { orders } = require("../order/orders");

const controllers = {
  http: {
    /**
     * @route /api/order
     */
    index: {
      /**
       * Постановка ордера на бирже
       */
      post: {
        correct: {
          /**
           * Лимитный ордер
           */
          limit: {
            request: {
              userExchange: userExchangeFind[0].id,
              apiKey: "XXXXXXXXXXXXXXXXXXXXX",
              side: orders.open.side,
              type: orders.open.type,
              price: orders.open.price,
              amount: orders.open.amount,
              symbol: orders.open.market.symbol,
            },
            response: {
              ...orders.open,
            },
          },
        },
      },
    },
    /**
     * @route /api/order/cancel-all
     */
    cancelAll: {
      /**
       * Отменить все лимитные ордера по определенной паре
       */
      post: {
        correct: {
          request: {
            userExchange: userExchangeFind[0].id,
            apiKey: "XXXXXXXXXXXXXXXXXXXXX",
            symbol: orders.canceled.market.symbol,
            side: orders.canceled.side,
          },
          response: [
            {
              symbol: orders.canceled.market.symbol,
              side: orders.canceled.side,
            },
          ],
        },
      },
    },
  },
};

module.exports = { controllers };
