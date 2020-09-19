const URL = {
    development: {
        API: '/',
    },

    production: {
        API: '/',
    },
};

export default URL[process.env.NODE_ENV];
