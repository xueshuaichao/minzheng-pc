const URL = {
    development: {
        API: 'http://mapi.testing1.wdeduc.com',
    },

    production: {
        API: 'http://mapi.testing1.wdeduc.com',
    },
};

export default URL[process.env.NODE_ENV];
