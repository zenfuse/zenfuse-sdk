const model = {
    id: 28,
    username: 'betatester',
    email: 'betatester@zenfuse.io',
    user_profile: {},
    is_beta_tester: true,
};

const controllers = {
    http: {
        index: {
            get: {
                request: {
                    query: {
                        balances_secret_key: 'SECRET_KEY',
                    },
                },
                response: [{ ...model }],
            },
        },
    },
};

module.exports = { model, controllers };
