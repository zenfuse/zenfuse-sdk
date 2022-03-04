const { createTechnicalData, get } = require("../utils");

const users = [
  {
    id: 28,
    username: "betatester",
    email: "betatester@zenfuse.io",
    provider: "local",
    password: "$2a$10$lQCAPb6L3nzvMuicMsyUAOysQjyMP6717TGco.X931Hg9c7o/SblG",
    resetPasswordToken:
      "7384680aa045c42a27ee7e4f4d4be9d838fb8875e6501ec95aa42e8b7a770635660ec949ca360f1c6caef6e56853abace6c4174b0f9160394daf75c5770c9dd0",
    confirmationToken: null,
    confirmed: true,
    blocked: null,
    user_profile: {},
    is_beta_tester: true,
    ...createTechnicalData(),
  },
];

const controllers = {
  http: {
    index: {
      get: {
        request: {
          query: {
            balances_secret_key: "SECRET_KEY",
          },
        },
        response: [
          {
            id: 28,
            username: "betatester",
            email: "betatester@zenfuse.io",
          },
          {
            id: 29,
            username: "tester",
            email: "tester@zenfuse.io",
          },
          {
            id: 30,
            username: "tester2",
            email: "tester2@zenfuse.io",
          },
        ],
      },
    },
  },
};

module.exports = { users, controllers };
