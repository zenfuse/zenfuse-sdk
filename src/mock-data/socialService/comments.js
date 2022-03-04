const usersPermission = require("../strapi/plugins/usersPermission");

const model = {
  id: 4,
  post: 3,
  user: usersPermission.model.user.id,
  text: "Awesome post! Like it!",
}; //?

const controllers = {
  http: {
    index: {
      post: {
        request: {
          headers: {
            Authorization: `Bearer XXXXXX`,
          },
          body: {
            data: {
              post: 4,
              text: model.text,
            },
          },
        },
        response: {
          body: {
            data: {
              id: model.id,
              attributes: {
                text: model.text,
                user: {
                  data: {
                    id: 4,
                  },
                },
              },
            },
          },
        },
      },
    },
    id: {
      like: {
        post: {
          request: {
            headers: {
              Authorization: `Bearer XXXXXX`,
            },
          },
          response: {
            id: 2,
            isLike: true,
            comment: model.id,
            user: usersPermission.model.user,
          },
        },
      },
      put: {
        request: {
          headers: {
            Authorization: `Bearer XXXXXX`,
          },
          body: {
            data: {
              text: "Updated awesome post comment!",
            },
          },
        },
        response: {
          data: {
            ...model,
            user: usersPermission.model.user,
            text: "Updated awesome post comment!",
          },
        },
      },
      delete: {
        request: {
          headers: {
            Authorization: `Bearer XXXXXX`,
          },
        },
        response: {
          ...model,
          isActive: false,
          user: usersPermission.model.user,
        },
      },
    },
  },
};

module.exports = { controllers, model };

controllers.http.id.put.response; //?
controllers.http.id.like.post.response; //?
controllers.http.index.post.response; //?
