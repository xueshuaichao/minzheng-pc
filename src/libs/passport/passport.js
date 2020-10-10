/* eslint-disable */
/* eslint-disable no-unused-vars */
import { Promise } from 'es6-promise-polyfill';
import api from './api';
import { getQueryByName } from './utils';
import CONF from './config';

let platInfo = window.centerPlatInfo || {};
let host = window.passPortHost || window.location.origin;
export class Passport {
    constructor(host, options) {
        host && api.setHost(host);
        console.log(window.centerPlatInfo);
        if (options && options.header) {
            api.setHeader(options.header);
            platInfo = options.header;
            console.log(options);
        } else if (window.centerPlatInfo) {
            api.setHeader(window.centerPlatInfo);
        }
    }

    checkCookie() {
        return new Promise(((resolve, reject) => {
            api.checkCookie().then((res) => {
                if (res.data) {
                    resolve(res);
                } else {
                    reject(res);
                }
            }, (err) => {
                reject(err);
            });
        }));
    }

    setToken(Token) { // setToken in 其他平台
        const token = Token || getQueryByName(location.search, 'Token');
        return new Promise(((resolve, reject) => {
            if (!token) {
                reject('no token');
            } else {
                api.checkToken({}, Token).then((res) => {
                    if (res.data) {
                        resolve(res);
                    } else {
                        reject(res);
                    }
                }, (err) => {
                    reject(err);
                });
            }
        }));
    }

    signOut() {
        return new Promise(((resolve, reject) => {
            api.signOut().then((res) => {
                if (res.data && res.code === 0) {
                    resolve(res.data);
                } else {
                    reject(res);
                }
            }, (err) => {
                reject(err);
            });
        }));
    }

    getToken() {
        return getQueryByName(location.search, 'Token');
    }

    goPcLogin() {
        window.location.replace(`${CONF.PassportHost}/pc/login?returnUrl=${encodeURIComponent(location.href)}`);
    }
    goAdminLogin() {
        window.location.replace(`${CONF.PassportHost}/pc/login?isAdmin=1&returnUrl=${encodeURIComponent(location.href)}`);
    }
    goH5Login() {
        window.location.replace(`${CONF.PassportHost}/h5/login?returnUrl=${encodeURIComponent(location.href)}`);
    }
}


if (host) {
    // lost protocol
    if (host.indexOf('http:') != 0 && host.indexOf('//') != 0) {
        host = `//${host}`;
    }
}

// export var passport = new Passport(host, options);
