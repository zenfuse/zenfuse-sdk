const axios = require('axios');
const { prepareEntityForGet, prepareQuery } = require('./utils/adapters');
const qs = require('qs');

const maxRequestEntitesAmount = 100;
const servicesApiKey = process.env.SERVICES_API_KEY;

class DashboardBackend {
    constructor() {
        this.url = process.env.DASHBOARD_BACKEND_URL || 'http://localhost:1337'; //?
    }

    async getTickers() {
        const tickers = [];
        const tickersCount = await axios({
            url: `${this.url}/tickers/count`,
        })
            .then((res) => {
                res; //?

                return res.data;
            })
            .catch((error) => {
                error; //?
                error.message; //?
                console.error(error);
            });

        let start = 0;
        const requests = Math.ceil(tickersCount / maxRequestEntitesAmount); //?
        for (let i = 0; i < requests; i++) {
            const reqTickers = await axios({
                url: `${this.url}/tickers?_start=${start}&_limit=${maxRequestEntitesAmount}`,
            })
                .then((res) => {
                    res; //?

                    return res.data;
                })
                .catch((error) => {
                    error; //?
                    error.message; //?
                    console.error(error);
                });

            reqTickers.forEach((t) => tickers.push(t));

            start += maxRequestEntitesAmount;
        }

        return tickers;
    }

    async getUsers() {
        const users = [];
        const usersCount = await axios({
            url: `${this.url}/users/count?services_api_key=${servicesApiKey}`,
        })
            .then((res) => {
                res; //?

                return res.data;
            })
            .catch((error) => {
                error; //?
                error.message; //?
                console.error(error);
            });

        let start = 0;
        const requests = Math.ceil(usersCount / maxRequestEntitesAmount); //?
        for (let i = 0; i < requests; i++) {
            const reqUsers = await axios({
                url: `${this.url}/users?services_api_key=${servicesApiKey}&_start=${start}&_limit=${maxRequestEntitesAmount}`,
            })
                .then((res) => {
                    res; //?

                    return res.data;
                })
                .catch((error) => {
                    error; //?
                    error.message; //?
                    console.error(error);
                });

            reqUsers.forEach((t) => users.push(t));

            start += maxRequestEntitesAmount;
        }

        return users;
    }
}

class Markets {
    constructor() {
        this.url = process.env.MARKETS_SERVICE_URL || 'http://localhost:1339'; //?
        this.cacheRestoreDelta = 5 * 60 * 1000;
        this.cache = {};
    }

    async getGlobalData() {
        const timestamp = new Date().getTime();

        if (
            this.cache?.getGlobalData?.timestamp &&
            this.cache.getGlobalData.timestamp > timestamp - this.cacheRestoreDelta
        ) {
            return this.cache.getGlobalData.data;
        }

        const data = await axios({
            url: `${this.url}/cmc-global-data/cryptocurrencies`,
        })
            .then((res) => {
                res; //?
                return res.data;
            })
            .catch((error) => {
                error; //?
                error.message; //?
                console.error(error);
            });

        this.cache.getGlobalData = { timestamp, data: { ...data } };

        return data;
    }

    async getTickerInfo({ id, quote = 'usd' }) {
        const globalData = await this.getGlobalData(); //?

        if (!globalData) {
            return;
        }

        const tickerInfo = globalData.data
            .filter((d) => {
                d; //?
                if (d.id === parseInt(id)) {
                    return true;
                }
            })
            .map((d) => {
                let info = { ...d };
                delete info.quote; //?
                for (const dataQuote of Object.keys(d.quote)) {
                    dataQuote; //?
                    if (dataQuote.toLocaleLowerCase() === quote.toLowerCase()) {
                        info = { ...info, ...d.quote[dataQuote] };
                    }
                }
                return info;
            }); //?

        return tickerInfo?.length ? tickerInfo[0] : undefined;
    }
}

class SocialService {
    constructor() {
        this.url = process.env.SOCIAL_SERVICE_URL || 'http://localhost:1342'; //?
    }

    async getProfiles(params) {
        let query;
        if (params?.query) {
            query = qs.stringify(
                { ...prepareQuery(params.query) },
                {
                    encodeValuesOnly: true,
                }
            ); //?
        }

        query; //?

        const profiles = await axios({
            url: `${this.url}/api/profiles?${query ? query : ''}`,
        })
            .then((res) => res.data)
            .catch((error) => {
                error; //?
                console.error(error);
            });

        profiles; //?
        const preparedUsers = profiles.data.map((u) => prepareEntityForGet(u)); //?

        return { data: preparedUsers, meta: {} };
    }

    async getPosts(params) {
        const posts = await axios({
            url: `${this.url}/api/posts`,
        })
            .then((res) => res)
            .catch((error) => {
                error; //?
                console.error(error);
            });
        params; //?

        return posts;
    }
}

class ZenfuseApi {
    constructor() {
        this.backend = new DashboardBackend();
        this.markets = new Markets();
        this.socialService = new SocialService();
    }
}

module.exports = { ZenfuseApi };
