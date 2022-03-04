const model = {
    id: 3,
    title: "bitcoin",
  };
  
  const controllers = {
    http: {
      index: {
        get: {
          response: [model],
        },
        post: {
          request: {
            title: model.title,
          },
          response: model,
        },
      },
    },
  };
  
  module.exports = {
    model,
    controllers,
  };
  