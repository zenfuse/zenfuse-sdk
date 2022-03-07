const usersPermission = require('../strapi/plugins/usersPermission');
const backendUsersPermission = require('../backend/plugins/usersPermission');
const followings = require('./followings');

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
            post: {
                request: {
                    id: 2,
                    username: 'betatester',
                    email: 'betatester@zenfuse.io',
                },
                response: model,
            },
        },
        id: {
            put: {
                request: {
                    bio: 'Lorem ipsum',
                },
                response: {
                    ...model,
                    bio: 'Lorem ipsum',
                },
            },
            follow: {
                post: {
                    request: {
                        headers: {
                            Authorization: 'Bearer XXXXXXXX',
                        },
                    },
                    response: {
                        user: usersPermission.model.user,
                        author: usersPermission.model.user,
                    },
                },
            },
        },
        all: {
            post: {
                request: {
                    headers: {
                        sign: 'XXXXXX',
                    },
                    body: {
                        users: [backendUsersPermission.model.user],
                    },
                },
                response: {
                    success: true,
                },
            },
        },
    },
};

module.exports = { model, controllers };

controllers.http.id.follow.post; //?
// console.log(controllers.http.id.follow.post.response);
