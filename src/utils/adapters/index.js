const { snakeToCamel, camelToSnake } = require('@bit/flake.flake-ui.src.functions.utils.string-case-utils');

const { transformEntriesInObj } = require('./utils');

function prepareQuery(query, type = '') {
    query; //?
    const queryObject = {};

    for (const key of Object.keys(query)) {
        key; //?
        if (typeof query[key] === 'object') {
            query[key]; //?

            query[key] = prepareQuery(
                query[key],
                key === 'populate' ? 'populate' : type === 'populate' ? 'populate' : ''
            );
        }

        if (type === 'populate' && query[key] === true) {
            queryObject[key] = '*'; //?
        } else {
            queryObject[key] = query[key];
        }
    }

    return queryObject; //?
}

/**
 * Функция преобразования объекта query для использования в Strapi Query API
 * @link
 * @param {*} item
 * @returns
 */
const prepareEntityForGet = (item) => {
    if (item && typeof item === 'object' && !Array.isArray(item)) {
        return transformEntriesInObj({
            item,
            transformFunc: snakeToCamel,
        }); //?
    }
    return item;
};

const prepareEntityForPost = (item) => {
    if (typeof item === 'object' && !Array.isArray(item)) {
        return transformEntriesInObj({ item, transformFunc: camelToSnake });
    }
    return item;
};

module.exports = { prepareEntityForGet, prepareEntityForPost, prepareQuery };
