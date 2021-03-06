/**
 * Тесты для проверки функции запросов к сервисам Zenfuse
 *
 * Не требуют запуска других сервисов
 */
const { ZenfuseApi } = require('./');
const mockData = require('./mock-data');
const nock = require('nock');
const tdd = require('./tdd');

const backendGetTickers = mockData.backend.ticker.tickers.tickers;
const backendGetUsers = mockData.backend.user.controllers.http.index.get.response; //?
const marketsCmcGlobalData = mockData.markets.cmcGlobalData.controllers.http.cryptocurrencies.get.response; //?
const socialService = mockData.socialService; //?

beforeAll(async () => {
    console.error = jest.fn();
});

afterAll(() => {
    nock.restore();
});

describe('Zenfuse', () => {
    describe('Dashboard Backend', () => {
        describe('getTickers', () => {
            it('должен делать запрос за тикерами по 100 штук', async () => {
                const zenfuse = new ZenfuseApi();

                nock(zenfuse.backend.url).persist().get('/tickers/count').reply(200, 1001);

                let apiCalls = 0;
                const mockedBackendTickersGet = nock(zenfuse.backend.url)
                    .persist()
                    .get('/tickers', () => {
                        apiCalls++;
                        return true;
                    })
                    .query((q) => {
                        q; //?
                        return true;
                    })
                    .reply(200, backendGetTickers);

                const tickers = await zenfuse.backend.getTickers(); //?

                apiCalls; //?
                expect(Array.isArray(tickers)).toEqual(true);
                expect(tickers.length >= backendGetTickers.length * 10).toEqual(true);

                expect(apiCalls).toEqual(11);
            });
        });

        describe('getUsers', () => {
            it('должен делать запрос за пользователями по 100 штук', async () => {
                const zenfuse = new ZenfuseApi();

                nock(zenfuse.backend.url)
                    .persist()
                    .get('/users/count')
                    .query((q) => {
                        q; //?
                        return true;
                    })
                    .reply(200, 1001);

                let apiCalls = 0;
                const mockedBackendUsersGet = nock(zenfuse.backend.url)
                    .persist()
                    .get('/users', () => {
                        apiCalls++;
                        return true;
                    })
                    .query((q) => {
                        q; //?
                        return true;
                    })
                    .reply(200, backendGetUsers);

                zenfuse; //?

                const users = await zenfuse.backend.getUsers(); //?

                apiCalls; //?
                expect(Array.isArray(users)).toEqual(true);
                expect(users.length >= backendGetUsers.length * 10).toEqual(true);

                expect(apiCalls).toEqual(11);
            });
        });
    });

    describe('Markets Service', () => {
        describe('getTickerInfo', () => {
            it('должен возвращать flatted-параметры переданного тикера', async () => {
                const zenfuse = new ZenfuseApi();

                nock(zenfuse.markets.url)
                    .persist()
                    .get('/cmc-global-data/cryptocurrencies')
                    .reply(200, marketsCmcGlobalData);

                const tickerInfo = await zenfuse.markets.getTickerInfo({ id: 1 }); //?

                expect(tickerInfo.price).toBeDefined();
            });
        });
    });

    describe('Social Service', () => {
        describe('getProfiles', () => {
            it('должен возвращать массив пользователей', async () => {
                mockData.socialService.profiles.controllers.http.index.get.response; //?

                const mockUserModel = mockData.socialService.profiles.model; //?

                const expectation = {
                    data: [
                        {
                            id: mockUserModel.id,
                            username: mockUserModel.username,
                            name: mockUserModel.name,
                            bio: mockUserModel.bio,
                            backendId: mockUserModel.backend_id,
                        },
                    ],
                    meta: {},
                }; //?

                const zenfuse = new ZenfuseApi();
                mockData.socialService.profiles.controllers.http.index.get.base.response; //?

                nock(zenfuse.socialService.url)
                    .persist()
                    .get('/api/profiles')
                    .query((q) => {
                        q; //?
                        return true;
                    })
                    .reply(200, mockData.socialService.profiles.controllers.http.index.get.base.response);

                const profiles = await zenfuse.socialService.getProfiles({}); //?

                expect(tdd.utils.assertTypes(profiles, expectation)).toEqual(true);
            });
        });

        describe('getPosts', () => {
            it('должен возвращать массив постов', async () => {
                const zenfuse = new ZenfuseApi();
                mockData.socialService.posts.controllers.http.index.get.withComments.response; //?

                nock(zenfuse.socialService.url).persist().get('/api/posts').reply(200, mockData);

                const params = {
                    populate: true
                }

                const posts = await zenfuse.socialService.getPosts(params);

                posts; //?
            });
        });
    });
});
