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
        /**
         * Алерт на цену, меньше чем переданное значение
         */
        lt: {
          request: {
            body: {
              symbol: "USDT/DAI",
              exchange: "binance",
              price: 0.9,
              type: "lt",
              replyTo: "http://localhost:1337/price-alert",
            },
          },
          response: {
            success: true,
          },
        },
      },
    },
  },
};

module.exports = {
  controllers,
};
