/* eslint-disable no-useless-escape */
/* eslint-disable no-redeclare */
export const getQueryString = function getQueryString(str) {
    // eslint-disable-next-line no-restricted-globals
    const url = str || location.search;
    const result = url.match(new RegExp('[?&][^?&]+=[^?&]+', 'g'));

    if (result == null) {
        return '';
    }

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < result.length; i++) {
        result[i] = result[i].substring(1);
    }

    return result;
};

export const getQueryByName = function getQueryByName(url, name) {
    // eslint-disable-next-line
    if (!url) url = window.location.href;
    // eslint-disable-next-line
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};
