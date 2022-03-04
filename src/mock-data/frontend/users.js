const me = {
  betaTester: {
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
    role: {
      id: 1,
      name: "Authenticated",
      description: "Default role given to authenticated user.",
      type: "authenticated",
      created_by: null,
      updated_by: null,
    },
    user_profile: 27,
    created_by: null,
    updated_by: 1,
    created_at: {},
    updated_at: {},
    is_beta_tester: true,
  },
};
/**
 * Object of the user who has access to testing the project, upon request `DB/me`
 */
const users = {
  betaTester: {
    identifier: "betatester@zenfuse.io",
    password: "Password123!",
    mfa: "GVUCSPZOPUUDO4LHIEYEAYST",
  },
};

/**
 * Exchanges API keys
 */
const exchangesApiKeys = {
  binance: {
    userExchangeId: 74,
    publicKey:
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    secretKey:
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  },
  ftx: {
    userExchangeId: 75,
    publicKey: "",
    secretKey: "",
  },
  wrongBinance: {
    userExchangeId: 70,
    publicKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    secretKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  },
};

module.exports = {
  me,
  users,
  exchangesApiKeys,
};
