const controllers = {
  /**
   * @method HTTP
   */
  http: {
    /**
     * @route /price-alert
     */
    index: {
      /**
       * Запрос на создание алерта
       */
      post: {
        request: {
          body: {
            symbol: "USDT/DAI",
            exchange: "binance",
            price: 0.9,
            type: "lt",
          },
        },
        response: {
          success: true,
        },
      },
    },
    /**
     * @route /price-alert/executed
     */
    executed: {
      /**
       * Алерт исполнен
       */
      post: {
        request: {
          body: {
            symbol: "USDT/DAI",
            exchange: "binance",
            price: 0.9,
            type: "lt",
          },
        },
        response: {
          success: true,
        },
      },
    },
  },
};

module.exports = {
  controllers,
};
