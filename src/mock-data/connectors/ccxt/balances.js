const balances = {
  info: {
    makerCommission: "10",
    takerCommission: "10",
    buyerCommission: "0",
    sellerCommission: "0",
    canTrade: true,
    canWithdraw: true,
    canDeposit: true,
    updateTime: "1622833476387",
    accountType: "SPOT",
    balances: [
      { asset: "ETH", free: "10.00000000", locked: "4.0000000" },
      { asset: "USDT", free: "30.9636004", locked: "33.422400" },
      { asset: "CAKE", free: "2.77000000", locked: "1.00000000" },
    ],
  },
  USDT: { free: 30.9636004, used: 33.4224, total: 64.3860004 },
  CAKE: { free: 2.77, used: 1, total: 3.77 },
  ETH: { free: 6, used: 4, total: 10 },
  used: {
    USDT: 33.4224,
    CAKE: 1,
  },
  free: {
    USDT: 30.9636004,
    CAKE: 2.77,
  },
  timestamp: 1624119823685,
  datetime: "2021-06-19T16:23:43.685Z",
  total: {
    USDT: 64.3860004,
    CAKE: 3.77,
    ETH: 0,
  },
};

module.exports = { balances };
