const userProfilePage = {
  pageBlocks: [
    {
      informationRow: [
        {
          textBlocks: [
            {
              title: `What is Zenfuse Farming? 💸`,
              description: `It's a farming system that we've created to award our token holders. Very similar to staking, with a bit of a tweak. We will check wallets with ZEFU that you've connected to Zenfuse and, based on that, give you rewards.`,
            },
          ],
          width: `w-full lg:w-1/3`,
        },
        {
          textBlocks: [
            {
              title: `How much can I earn? 🤑`,
              description: `The annual percentage rate will be 24%, with an additional 4% from your referrals. If you registered on Zenfuse through someone’s referral ID, then you’ll get an APR of 26%.`,
            },
          ],
          width: `w-full lg:w-2/3`,
          imagePosition: `right-top`,
          image: {
            full: `/uploads/hmie.jpg`,
          },
          badge: `Your current APR: **26%**`,
        },
      ],
    },
    {
      informationRow: [
        {
          textBlocks: [
            {
              title: `How to get started?`,
              description: `Connect your MetaMask account to Zenfuse and start accumulating rewards. You can also invite people with your referral ID and get bonus percentages on top.`,
            },
            {
              title: `When will payout occur?`,
              description: `You would be able to collect your rewards on October 28th, 2021. In the meantime, the claim rewards button would be inactive, so feel free to watch the growth of your assets in the rewards dashboard at the top.`,
            },
            {
              title: `What are the risks?`,
              description: `There are no risks at all. We won't even lock your assets. Connect now and start earning.`,
            },
            {
              title: `How rewards are calculated?`,
              description: `They are calculated from the moment you started holding ZEFU on your blockchain address.`,
            },
            {
              title: `What happens when I remove my wallet from Zenfuse?`,
              description: `Once removed, the rewards will be unlinked from your Zenfuse account, so you won't be able to claim them later.`,
            },
          ],
          width: `w-full`,
          imagePosition: `right-top`,
          image: {
            full: `/uploads/hmie.jpg`,
          },
          badge: `Your current APR: **26%**`,
        },
      ],
    },
  ],
};

module.exports = { userProfilePage };
