const axios = require('axios');
const { prepareEntityForGet, prepareQuery } = require('./utils/adapters');
const qs = require('qs');

const maxRequestEntitesAmount = 100;
const servicesApiKey = process.env.SERVICES_API_KEY;

class StrapiAdapter {
    constructor() {}

    /**
     * Функция для порционного запроса определенного ендпоинта в
     * зависимости от количества существующих экземпляров
     *
     * @param {string} countUrl - URL на метод count модели (https://api.zenfuse/tickers/count)
     * @param {string} reuqestUrl - URL на метод запроса данных с query (https://api.zenfuse/tickers)
     * @returns {array}
     */
    async batchRequests({ countUrl, reuqestUrl, strapiVersion = 3 }) {
        const modelData = [];
        let modelCount;
        if (countUrl) {
            modelCount = await axios({
                url: countUrl,
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
        }
        modelCount; //?

        let start = 0;
        const requests = Math.ceil(modelCount / maxRequestEntitesAmount); //?

        for (let i = 0; i < requests; i++) {
            const requestQuery =
                strapiVersion === 3
                    ? `${
                          reuqestUrl.indexOf('?') > -1 ? '&' : '?'
                      }_start=${start}&_limit=${maxRequestEntitesAmount}`
                    : '';

            const requestData = await axios({
                url: `${reuqestUrl}${requestQuery}`,
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

            requestData.forEach((t) => modelData.push(t));

            start += maxRequestEntitesAmount;
        }

        return modelData;
    }
}
class DashboardBackend extends StrapiAdapter {
    constructor() {
        super();
        this.url = process.env.DASHBOARD_BACKEND_URL || 'http://localhost:1337'; //?
        this.cache = {};
    }

    async getTickers() {
        const tickers = await this.batchRequests({
            countUrl: `${this.url}/tickers/count`,
            reuqestUrl: `${this.url}/tickers`,
        }); //?
        
        return tickers;
    }

    async getUsers() {
        const users = await this.batchRequests({
            countUrl: `${this.url}/users/count?services_api_key=${servicesApiKey}`,
            reuqestUrl: `${this.url}/users?services_api_key=${servicesApiKey}`,
        }); //?

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
