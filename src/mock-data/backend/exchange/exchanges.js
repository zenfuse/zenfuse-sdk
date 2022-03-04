const { createTechnicalData } = require("../utils");

const exchanges = [
  {
    id: 22,
    name: "Bibox",
    uid: "bibox",
    exchange_profile: null,
    is_active: null,
    meta: null,
    api_id: "339",
    icon: null,
    ...createTechnicalData(),
  },
  {
    id: 23,
    name: "Binance",
    uid: "binance",
    exchange_profile: null,
    is_active: null,
    meta: null,
    api_id: "270",
    icon: null,
    ...createTechnicalData(),
  },
  {
    id: 24,
    name: "Bitfinex",
    uid: "bitfinex",
    exchange_profile: null,
    is_active: null,
    meta: null,
    api_id: "37",
    icon: null,
    ...createTechnicalData(),
  },
  {
    id: 25,
    name: "Bittrex",
    uid: "bittrex",
    exchange_profile: null,
    is_active: null,
    meta: null,
    api_id: "22",
    icon: null,
    ...createTechnicalData(),
  },
  {
    id: 26,
    name: "Huobi",
    uid: "huobi",
    exchange_profile: null,
    is_active: null,
    meta: null,
    api_id: "102",
    icon: null,
    ...createTechnicalData(),
  },
  {
    id: 27,
    name: "Kraken",
    uid: "kraken",
    exchange_profile: null,
    is_active: null,
    meta: null,
    api_id: "24",
    icon: null,
    ...createTechnicalData(),
  },
];

module.exports = { exchanges };