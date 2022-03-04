const model = {
  user: 2,
  total: 34445,
  userExchanges: {
    43: {
      12: 56654.32,
      57: 2140.5,
    },
  },
};

const controllers = {
  http: {
    totalBalances: {
      get: {
        response: [model],
      },
    },
  },
};

module.exports = {
  model,
  controllers,
};
