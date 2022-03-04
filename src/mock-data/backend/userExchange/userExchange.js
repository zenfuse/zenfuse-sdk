const { exchangesApiKeys, me } = require(`../../frontend/users`);
const { createTechnicalData, get } = require("../utils");
const { exchanges } = require("../exchange/exchanges");

const cuttedPublicKey =
  `*`.repeat(exchangesApiKeys["binance"].publicKey.length - 7) +
  exchangesApiKeys["binance"].publicKey.slice(
    exchangesApiKeys["binance"].publicKey.length - 6,
    exchangesApiKeys["binance"].publicKey.length - 1
  );
const cuttedSecretKey =
  `*`.repeat(exchangesApiKeys["binance"].secretKey.length - 7) +
  exchangesApiKeys["binance"].secretKey.slice(
    exchangesApiKeys["binance"].secretKey.length - 6,
    exchangesApiKeys["binance"].secretKey.length - 1
  );

const model = createUserExchange(28, "binance");

function createUserExchange(userId, exchangeName) {
  return {
    id: exchangesApiKeys[exchangeName].userExchangeId,
    public_key: exchangesApiKeys[exchangeName].publicKey,
    secret_key: exchangesApiKeys[exchangeName].publicKey,
    exchange: get(exchanges, exchangeName, "uid").id,
    user: userId,
    custom_name: exchangeName,
    ...createTechnicalData(),
  };
}

const controllers = {
  http: {
    index: {
      get: {
        correct: {
          request: {},
          response: {},
        },
      },
    },
  },
};

module.exports = {
  model,
  controllers,
};
