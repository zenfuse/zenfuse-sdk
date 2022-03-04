const postTickers = require('./postTickers');

const model = {
    id: 3,
    attributes: {
        backend_id: 546,
        api_id: 56567,
    },
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
