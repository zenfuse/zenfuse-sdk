const model = {
  user: {
    id: 3,
    username: `betatester`,
    email: `betatester@zenfuse.io`,
  },
};

const controllers = {
  http: {
    auth: {
      register: {
        post: {
          request: {
            username: model.user.username,
            email: model.user.email,
            password: "Password123!",
          },
          response: {
            user: model.user,
          },
        },
      },
    },
  },
};

module.exports = {
  model,
  controllers,
};
