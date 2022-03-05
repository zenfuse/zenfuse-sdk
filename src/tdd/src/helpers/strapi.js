const server = require(`./server.js`);
const axios = require(`axios`);

let instance;

/**
 * Create an `strapi` instance
 */
const setupStrapi = async () => {
  if (!instance) {
    await server.createStrapi();
    instance = strapi;

    // /** the following code in copied from `./node_modules/strapi/lib/Strapi.js` */
    // await Strapi().load();
    // instance = strapi; // strapi is global now
    // await instance.app
    //   .use(instance.router.routes()) // populate KOA routes
    //   .use(instance.router.allowedMethods()); // populate KOA methods

    // instance.server = http.createServer(instance.app.callback());
  }

  return instance;
};

/**
 * Create a `HTTP` server only if it doesn't exist
 */
const createStrapiServer = async (apiUrl = `http://localhost:1337`) => {
  await new Promise((resolve) => {
    const ti = setInterval(async () => {
      await axios(apiUrl)
        .then(() => {})
        .catch(async (error) => {
          if (error.code === `ECONNREFUSED`) {
            await server.createStrapiServer();
            // console.log("fetch error", error);
            clearInterval(ti);
            resolve();
          }
        });
    }, 500);
  });

  // try {
  //   await axios(apiUrl)
  //     .then(async () => {
  //       console.log(`server already started`);
  //     })
  //     .catch(async (error) => {
  //       console.log("createStrapiServer error", error);
  //       if (error.code === `ECONNREFUSED`) {
  //         await server.createStrapiServer();
  //         // console.log("fetch error", error);
  //       }
  //     });
  // } catch (error) {}

  await new Promise((resolve) => {
    const tm = setInterval(async () => {
      await axios(apiUrl)
        .then(async () => {
          resolve();
          console.log("strapi started");
          clearInterval(tm);
        })
        .catch((error) => {
          console.log("strapi is starting ...");
        });
    }, 500);
  });

  // let wrorkingTimer = setTimeout(async () => {
  //   await stopStrapiServer();
  //   clearTimeout(wrorkingTimer);
  // }, 100000);

  // console.log(`🚀 ~ wrorkingTimer ~ wrorkingTimer`, wrorkingTimer);

  return stopStrapiServer;
};

/**
 * Остановить сервер только в случае если он был создан
 */
const stopStrapiServer = async () => {
  if (instance) {
    await server.stopStrapiServer();
  }
};

const getJwt = async (user, host = `http://localhost:1337`) => {
  const { identifier, password } = user;
  const loginRes = await axios
    .post(`${host}/auth/local`, {
      identifier,
      password,
    })
    .then((res) => res)
    .catch((error) => {
      console.log(`loginUser error`, error);
      throw new Error(error);
    });

  return strapi.plugins[`users-permissions`].services.jwt.issue({
    id: loginRes.user.id,
    email: loginRes.user.email,
    username: loginRes.user.username,
  }); //?
};

module.exports = { setupStrapi, createStrapiServer, getJwt };
