const { snakeToCamel, camelToSnake } = require('@bit/flake.flake-ui.src.functions.utils.string-case-utils');

const { transformEntriesInObj } = require('./utils');

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

module.exports = { prepareEntityForGet, prepareEntityForPost };
