const model = {
  id: 999,
  created_at: "2021-10-18T13:01:52.330Z",
  updated_at: "2021-10-18T13:01:52.334Z",
  key_string:
    "wlrVLAIdpScKT9cIVGfy7zIccfnSYsbsdrf2fjNJZgqClsuQOvaDj916hH5dJ0nz",
  permission: "read",
};

const controllers = {
  /**
   * @method HTTP
   */
  http: {
    /**
     * @route /api-key
     */
    index: {
      /**
       * Запрос на получение списка API ключей пользователя
       */
      get: {
        correct: {
          request: {
            headers: ["Authorization"],
          },
          response: [model],
        },
      },
      /**
       * Запрос на создание API ключа пользователя
       */
      post: {
        correct: {
          request: {
            headers: ["Authorization"],
            body: {
              permission: model.permission,
            },
          },
          response: model,
        },
      },
    },
    /**
     * @route /api-key/${id}
     */
    id: {
      /**
       * Запрос на удаление API ключа пользователя по id
       */
      delete: {
        correct: {
          request: {
            params: `${model.id}`,
            headers: ["Authorization"],
          },
          response: model,
        },
      },
    },
  },
};

module.exports = { model, controllers };
