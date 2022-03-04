const { exchangesApiKeys } = require(`../../frontend/users`);

// const getApis = () => {
//   const apis = [];
//   for (const api in exchangesApiKeys) {
//     apis.push({
//       id: exchangesApiKeys[api].userExchangeId,
//       exchange: api,
//       publicKey: exchangesApiKeys[api].publicKey,
//       secretKey: exchangesApiKeys[api].secretKey,
//     });
//   }
//   return apis;
// };

/**
 * Получить идентификатор биржи по названию `uid`
 */
const getUserExchangeId = (name) => {
  return exchangesApiKeys[name].userExchangeId;
};

/**
 * The body of the request for the `Middleware Service` for transferring data required for installation to the corresponding user
 *
 * @todo Pass `JWT-token` and validate it
 */
const request = {
  correct: {
    type: `CONNECT`,
    payload: {
      exchanges: [
        {
          id: exchangesApiKeys["binance"].userExchangeId,
          exchange: "binance",
          publicKey: exchangesApiKeys["binance"].publicKey,
          secretKey: exchangesApiKeys["binance"].secretKey,
        },
      ],
    },
  },
  wrong: {
    type: `CONNECT`,
    payload: {
      exchanges: [
        {
          id: exchangesApiKeys["wrongBinance"].userExchangeId,
          exchange: "binance",
          publicKey: exchangesApiKeys["wrongBinance"].publicKey,
          secretKey: exchangesApiKeys["wrongBinance"].secretKey,
        },
      ],
    },
  },
};

/**
 * Answer from `Middleware Service`
 */
const response = {
  success: {
    type: `CONNECT`,
    userExchange: getUserExchangeId("binance"),
    payload: {
      success: true,
    },
  },
  failure: {
    type: "ERROR",
    userExchange: getUserExchangeId("wrongBinance"),
    payload: {
      event: "CONNECT",
      msg: "Invalid API-key, IP, or permissions for action.",
    },
  },
};

// console.log();
// console.log(`🚀 ~ CONNECT`);
// console.log(JSON.stringify(request.correct));

module.exports = {
  getUserExchangeId,
  request,
  response,
};

const huobi = {
  type: "CONNECT",
  payload: {
    exchanges: [
      {
        id: 74,
        exchange: "huobi",
        publicKey: "10a09549-dbuqg6hkte-18bc89ac-376c5",
        secretKey: "5aaf2ac6-b058af81-af91a056-5f1b2",
      },
    ],
  },
};

const bitfinex = {
  type: "CONNECT",
  payload: {
    exchanges: [
      {
        id: 74,
        exchange: "bitfinex",
        publicKey: "nhMPZ6ijUaxoLZhQHhUjBuJJv3Ozt5Yv5xUUXAvcS2O",
        secretKey: "P2yX2kPWKuS3HlXcDq0arrBNCEZJX2Nun5DpfcOFC9D",
      },
    ],
  },
};

const bibox = {
  type: "CONNECT",
  payload: {
    exchanges: [
      {
        id: 74,
        exchange: "bibox",
        publicKey: "SfClp2rtZGXzWD6mRFPHUgelYDTLBjfFI5zrUE8ckdun7v00Pd8D5e/k",
        secretKey:
          "aA3atyyOQrp8x4YuQMNQDxWDL7fXnQXOrLi/MNEzIcfv6nB+GUdPdz1dLb8fQX88EOUHKixgrYodmFK0LCyasA==",
      },
    ],
  },
};

const okex = {
  type: "CONNECT",
  payload: {
    exchanges: [
      {
        id: 74,
        exchange: "okex",
        publicKey: "221a9ea2-e461-496e-8374-1a627c39028f",
        secretKey: "38433A04679BC9C6FD8D475D50EA58E8",
        addonKey: "Br76u3qzPx3vdQn96q2XTZxY3yYmW3F",
      },
    ],
  },
};

const ftx = {
  type: "CONNECT",
  payload: {
    exchanges: [
      {
        id: 74,
        exchange: "ftx",
        publicKey: "jDGd6GPQVdnuwVmm4RtnHWBOjT8Kh4xPSWVV26Ob",
        secretKey: "yasgJ0tu0nLKkLVtGBR3wVQmr73eXjY62e5QYUJ5",
      },
    ],
  },
};

// console.log(`🚀 ~ CONNECT`, request.wrong.payload);

// console.log();
