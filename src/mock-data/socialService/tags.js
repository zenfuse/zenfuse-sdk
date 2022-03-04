const model = {
    id: 3,
    attributes: {
        title: 'bitcoin',
    },
};

const controllers = {
    http: {
        index: {
            get: {
                response: [model],
            },
            post: {
                request: {
                    title: model.title,
                },
                response: model,
            },
        },
    },
};

module.exports = {
    model,
    controllers,
};
