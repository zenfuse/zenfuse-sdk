const controllers = {
  http: {
    cryptocurrencies: {
      get: {
        response: {
          status: {
            timestamp: "2022-02-17T13:45:00.581Z",
            error_code: 0,
            error_message: null,
            elapsed: 534,
            credit_count: 25,
            notice: null,
            total_count: 9412,
          },
          data: [
            {
              id: 1,
              name: "Bitcoin",
              symbol: "BTC",
              slug: "bitcoin",
              num_market_pairs: 9160,
              self_reported_circulating_supply: null,
              self_reported_market_cap: null,
              last_updated: "2022-02-17T13:43:00.000Z",
              quote: {
                USD: {
                  price: 42614.200957863846,
                  volume_24h: 22564517240.306164,
                  volume_change_24h: 11.0952,
                  percent_change_1h: -1.51242245,
                  percent_change_24h: -2.95107647,
                  percent_change_7d: -2.97502137,
                  percent_change_30d: 2.54572898,
                  percent_change_60d: -9.38276207,
                  percent_change_90d: -25.82893788,
                  market_cap: 808005179667.396,
                  market_cap_dominance: 41.8356,
                  fully_diluted_market_cap: 894898220115.14,
                  last_updated: "2022-02-17T13:43:00.000Z",
                },
              },
            },
          ],
        },
      },
    },
  },
};

module.exports = { controllers };
