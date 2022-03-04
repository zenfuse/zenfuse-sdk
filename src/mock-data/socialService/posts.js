const tags = require("./tags");
const mediaLibrary = require("../strapi/plugins/mediaLibrary");
const usersPermission = require("../strapi/plugins/usersPermission");
const postTickers = require("./postTickers");
const fs = require("fs");
const FormData = require("form-data");
const tickers = require("./tickers");
const comments = require("./comments"); //?

const model = {
  id: 3,
  text: "Next week we'll start a cool new concept.\n\nIt's a newsletter. \n\nThree posts a week. First week is free.",
  tags: [tags.model.id],
  media: [mediaLibrary.model.image],
  user: usersPermission.model.user.id,
  isActive: true,
  postTickers: [postTickers.model.id],
};

// В объекте тикера не нужна ссылка на postTickers
const ticker = {
  ...tickers.model,
};
delete ticker.postTickers;

/**
 * Создаем полезную нагрузку с файлом для создания поста
 * В последствии эти данные должны быть переданы через
 * headers: {
 *    "Authorization": `Bearer ${jwt}`,
 *    ...formData.getHeaders()
 * },
 * body: formData
 *
 */
let image;
try {
  image = fs.createReadStream(`${__dirname}/trade.jpeg`); //?
} catch (error) {
  error;
  console.error(error);
}
const formData = new FormData();
formData.append("files.media", image);
formData.append(
  "data",
  JSON.stringify({
    text: model.text,
    tags: [tags.model.title],
    tickers: [tickers.model.backendId],
  })
);

const controllers = {
  http: {
    index: {
      get: {
        withComments: {
          response: [
            {
              ...model,
              user: usersPermission.model.user,
              tags: [],
              postTickers: [],
              media: [],
              comments: [
                { ...comments.model, user: usersPermission.model.user },
              ],
            },
          ],
        },
        withLikes: {
          response: [
            {
              ...model,
              user: usersPermission.model.user,
              tags: [],
              postTickers: [],
              media: [],
              likes: [
                {
                  id: 2,
                  isLike: true,
                  post: model.id,
                  user: usersPermission.model.user.id,
                },
              ],
            },
          ],
        },
        response: [
          {
            ...model,
            user: usersPermission.model.user,
            tags: [tags.model],
            postTickers: [{ ...postTickers.model, ticker: ticker }],
          },
        ],
      },
      post: {
        request: {
          headers: {
            Authorization: `Bearer XXXXX`,
          },
          body: {
            data: {
              text: model.text,
              tags: [tags.model.title],
              tickers: [tickers.model.backendId],
            },
          },
        },
        response: {
          data: {
            ...model,
            tags: [tags.model],
            user: usersPermission.model.user,
            postTickers: [{ ...postTickers.model, ticker: ticker }],
          },
        },
      },
      put: {
        request: {
          headers: {
            Authorization: `Bearer XXXXX`,
          },
          body: {
            data: {
              text: `Updated text`,
              tags: [tags.model.title],
              tickers: [tickers.model.backendId],
            },
          },
        },
        response: {
          data: {
            ...model,
            text: `Updated text`,
            tags: [tags.model],
            user: usersPermission.model.user,
            postTickers: [{ ...postTickers.model, ticker: ticker }],
          },
        },
      },
    },
    id: {
      comment: {
        post: {
          request: {
            headers: {
              Authorization: `Bearer XXXXX`,
            },
            body: {
              data: {
                text: comments.model.text,
              },
            },
          },
          response: {
            data: {
              ...comments.model,
              user: usersPermission.model.user,
            },
          },
        },
      },
      like: {
        post: {
          request: {
            headers: {
              Authorization: `Bearer XXXXX`,
            },
          },
          response: {
            data: {
              id: 2,
              isLike: true,
              post: model.id,
              user: usersPermission.model.user,
            },
          },
        },
      },
    },
  },
};

module.exports = {
  controllers,
  model,
};

controllers.http.index.get.response;
controllers.http.index.get.withComments; //?
controllers.http.index.put.response; //?
controllers.http.id.comment.post; //?
