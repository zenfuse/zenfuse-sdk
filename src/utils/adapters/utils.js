const { snakeToCamel } = require('@bit/flake.flake-ui.src.functions.utils.string-case-utils');
const R = require('ramda');

/**
 * Функция проверки является ли
 *
 * @param {string} key - The key is used to check if this object belongs to `Images`
 * @param {object} value - Image object from `Strapi`
 *    `{  }`
 * @returns
 */
const checkIsImage = (key, value) => {
    const lowerKey = key.toLowerCase(); //?
    return (
        key === 'media' ||
        key === 'image' ||
        key === 'images' ||
        lowerKey.includes('image') ||
        lowerKey.includes('img') ||
        (lowerKey.includes('icon') && value.size) ||
        (value.mime && value.mime.includes('video'))
    );
};

const checkIsFile = (key, value) => key.toLowerCase().includes('file') && value.mime && value.size;

const transformEntriesInObj = ({ item = {}, ...props }) => {
    if (typeof item === 'object' && item) {
        item; //?
        let { transformFunc = snakeToCamel } = props;
        let entries = Object.entries(item); //?

        entries = entries.map((entry) => {
            entry; //?
            let key = transformFunc(entry[0]); //?
            let value = entry[1];

            if (serviceFields.includes(key)) {
                return [undefined, undefined];
            }

            if (value && typeof value === 'object' && !Array.isArray(value)) {
                if (value.getTime) {
                    value = value;
                } else if (checkIsImage(key, value)) {
                    value = transformStrapiFile({ file: value });
                } else if (checkIsFile(key, value)) {
                    value = transformStrapiFile({ file: value });
                } else {
                    value = transformEntriesInObj({ item: value, ...props });
                }
            } else if (Array.isArray(value)) {
                if (checkIsImage(key, value)) {
                    value = value.map((file) => transformStrapiFile({ file }));
                }
                value = value.map((elem) => transformEntriesInObj({ item: elem, ...props }));
            }
            return [key, value];
        });
        return Object.fromEntries(entries); //?
    }

    return item;
};

module.exports = {
    checkIsImage,
    transformEntriesInObj,
};

const serviceFields = ['updatedBy', 'createdBy', 'updatedAt', 'publishedAt'];
// const excludedModels = ["exchange"]; "createdAt"

const getFormat = (path, file) => R.path(['formats', path], file);

function transformStrapiFile({ file, baseUrl = 'http://localhost:1337' }) {
    file = file?.data ? file.data[0] : file;
    file = file.attributes ? { ...file.id, ...file.attributes } : file;

    try {
        return {
            id: file.id,
            full: `${baseUrl}${file.url}`,
            small: `${baseUrl}${getFormat('small', file) || file.url}`,
            medium: `${baseUrl}${getFormat('medium', file) || file.url}`,
            thumbnail: `${baseUrl}${getFormat('thumbnail', file) || file.url}`,
        };
    } catch (err) {
        console.log('err in transformStrapiFiles, file', err.message, file);
        return {};
    }
}
