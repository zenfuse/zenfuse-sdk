export function snakeToCamel(str) {
    return str.replace(/([-_][a-z])/gi, (char) => {
        return char.toUpperCase().replace('-', '').replace('_', '');
    });
}

export function camelToSnake(str) {
    return str.replace(/[A-Z]/g, (letter, index, string) => {
        let isAbbr =
            letter.match(/[A-Z]/) &&
            ((string[index + 1] && string[index + 1].match(/[A-Z]/)) ||
                (string[index - 1] && string[index - 1].match(/[A-Z]/)));

        let isCamelAndSnakeMixed = letter.match(/[A-Z]/) && string[index - 1] === '_';

        if (isAbbr || isCamelAndSnakeMixed || index === 0) {
            return letter.toLowerCase();
        }

        return `_${letter.toLowerCase()}`;
    });
}

export function snakeToPascal(str) {
    let cameled = snakeToCamel(str);
    return upFirstChar(cameled);
}

export const upFirstChar = (str) => {
    return str.replace(/^([A-z])/g, (char) => char.toUpperCase());
};

export const lowFirstChar = (str) => {
    return str.replace(/^([A-z])/g, (char) => char.toLowerCase());
};

const clearAndUpper = (text) => {
    return text.replace(/-/, '').toUpperCase();
};

export function kebabToCamel(text) {
    let pascaled = kebabToPascal(text);
    return lowFirstChar(pascaled);
}

export function kebabToPascal(text) {
    return text.replace(/(^\w|-\w)/g, clearAndUpper);
}

export const pascalToKebab = (str) => {
    let cameledString = `${str[0].toLowerCase()}${str.slice(1)}`;
    return cameledString.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
};

export const camelToKebab = (str) => {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
};
