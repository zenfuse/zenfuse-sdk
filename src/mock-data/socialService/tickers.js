const postTickers = require("./postTickers");

const model = {
  id: 3,
  backendId: 546,
  apiId: 56567,
  postTickers: [postTickers.model.id],
};

const controllers = {
  http: {
    index: {
      get: {
        response: [{ model, postTickers: [postTickers.model] }],
      },
    },
  },
};

module.exports = { model, controllers };
