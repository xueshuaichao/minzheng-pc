import { Promise } from 'es6-promise-polyfill';

function ajax(type, url, data, headers) {
    return new Promise(((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(type.toUpperCase(), url, true);
        xhr.withCredentials = true;
        if (headers) {
            for (const key in headers) {
                // eslint-disable-next-line no-prototype-builtins
                if (headers.hasOwnProperty(key)) {
                    xhr.setRequestHeader(key, headers[key]);
                }
            }
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        const json = JSON.parse(xhr.responseText);
                        resolve(json);
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(`NetWork Status ${xhr.status}`);
                }
            }
        };

        xhr.send(data || null);
    }));
}

function params(obj) {
    const ret = [];
    for (const key in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(key) && obj[key] !== null && obj[key] !== '') {
            ret.push(`${key}=${encodeURIComponent(obj[key])}`);
        }
    }
    return ret.join('&');
}

// eslint-disable-next-line no-unused-vars
function post(url, data) {
    if (typeof data === 'object') {
        data = params(data);
    }
    return ajax('post', url, data, {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    });
}

function get(url, data, header) {
    if (typeof data === 'object') {
        data = params(data);
    }
    if (data) {
        if (url.indexOf('?') > 0) {
            url = `${url}&${data}`;
        } else {
            url = `${url}?${data}`;
        }
    }

    return ajax('get', url, {}, header);
}

export var $host = '';
export var $activeHost = '';
export var $header = {};

export default {

    setHost(host) {
        $host = host;
    },
    setActiveHost(activeHost) {
        $activeHost = activeHost;
    },
    setHeader(header) {
        $header = header;
    },
    checkCookie(data) {
        return get(`${$host}/ucenter/sso/checkCookie`, data, $header);
    },
    checkToken(data, token) {
        console.log($header);
        return get(`${$host}/ucenter/sso/checkToken`, data, Object.assign({ Token: token }, $header));
    },
    signOut() {
        return get(`${$host}/ucenter/sso/logOut`);
    },
};
