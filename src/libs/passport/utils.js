/* eslint-disable no-useless-escape */
/* eslint-disable no-redeclare */
export const getQueryString = function getQueryString(str) {
    // eslint-disable-next-line no-restricted-globals
    const url = str || location.search;
    const result = url.match(new RegExp('[\?\&][^\?\&]+=[^\?\&]+', 'g'));

    if (result == null) {
        return '';
    }

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < result.length; i++) {
        result[i] = result[i].substring(1);
    }

    return result;
};

export const getQueryByName = function getQueryByName(url,name) {
    var url = url || location.search;
    var result = url.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    
    if (result == null || result.length < 1) {

        return "";

    }

    return result[1];
}

