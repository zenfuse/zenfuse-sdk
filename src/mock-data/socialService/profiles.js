const model = {
    id: 4,
    username: 'betatester',
    name: 'Beta Tester',
    bio: undefined,
    image: undefined,
    cover: undefined,
    is_verified: false,
    backend_id: 3,
};

const controllers = {
    http: {
        index: {
            get: {
                base: {
                    response: { data: [{ ...model }] },
                },
            },
        },
        id: {
            put: {
                request: {
                    data: {
                        bio: 'Lorem ipsum',
                    },
                },
                response: {
                    data: {
                        ...model,
                        bio: 'Lorem ipsum',
                    },
                },
            },
        },
    },
};

module.exports = { model, controllers };
