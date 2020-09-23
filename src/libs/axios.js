import Axios from 'axios';
import { Message } from 'view-design';
import URL from '../config/url';
import CONF from '../config';
// import store from '../store/module/user';

const { STATUS_CODE } = CONF;
const NO_MESSAGE = [STATUS_CODE.NO_LOGIN, STATUS_CODE.NO_SELECT_SHOP];
const baseURL = URL.API;
const METHOD = {
    POST: 'post',
    GET: 'get',
};

// 请求拦截
const interceptors = (instance) => {
    instance.interceptors.request.use(
        (config) => {
            if (!localStorage.getItem('token')) {
                return config;
            }
            return {
                ...config,
                headers: {
                    ...config.headers,
                    token: localStorage.getItem('token'),
                },
            };
        },
        error => Promise.reject(error),
    );

    // 添加响应拦截器
    instance.interceptors.response.use(
        (res) => {
            const { data } = res;
            if (!(data instanceof Blob)) {
                if (
                    data.code !== STATUS_CODE.SUCCESS[0]
                    && data.code !== STATUS_CODE.SUCCESS[1]
                ) {
                    if (data.message && !NO_MESSAGE.includes(data.code)) {
                        Message.error(data.message);
                    }
                    return Promise.reject(data);
                }
            }
            return data;
        },
        (error) => {
            // 对响应错误做点什么
            Message.error('服务器开小差啦');
            return Promise.reject(error);
        },
    );
};

// 创建实例
const create = () => {
    const conf = {
        baseURL,
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            token: '123',
        },
        withCredentials: true,
    };
    return Axios.create(conf);
};

export class HttpRequest {
    constructor() {
        // 存储请求队列
        this.queue = {};
    }

    // 销毁请求实例
    destroy(url) {
        delete this.queue[url];
        const queue = Object.keys(this.queue);
        return queue.length;
    }

    // // 请求实例
    // request(options) {
    //     const instance = create();
    //     interceptors(instance, options.url);
    //     const newOptions = Object.assign({}, options);
    //     this.queue[newOptions.url] = instance;
    //     return instance(newOptions);
    // }

    post(url, params) {
        const data = params && JSON.parse(JSON.stringify(params));
        const instance = create();
        if (data) {
            Object.keys(data).forEach(
                key => data[key] !== 0 && !data[key] && delete data[key],
            );
        }
        const options = { url, data, method: METHOD.POST };
        interceptors(instance, options.url);
        this.queue[options.url] = instance;
        return instance(options);
    }

    get(url, params) {
        const data = params && JSON.parse(JSON.stringify(params));
        const instance = create();
        if (data) {
            Object.keys(data).forEach(
                key => data[key] !== 0 && !data[key] && delete data[key],
            );
        }
        const options = { url, params: data, method: METHOD.GET };
        interceptors(instance, options.url);
        this.queue[options.url] = instance;
        return instance(options);
    }

    file(url, params) {
        const formData = new FormData();
        const instance = create();
        Object.keys(params).forEach((v) => {
            formData.append(v, params[v]);
        });
        const options = {
            url,
            data: formData,
            method: METHOD.POST,
        };
        interceptors(instance, options.url);
        this.queue[options.url] = instance;
        return instance(options);
    }
}

export const axios = new HttpRequest();
