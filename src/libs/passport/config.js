const URL = {
    development: {
        PassportHost: 'http://mlogin.testing1.wdeduc.com',
    },
    test: {
        PassportHost: 'http://mlogin.testing1.wdeduc.com',
    },
    production: {
        PassportHost: 'http://mlogin.testing2.wdeduc.com',
    },
};

export default URL[process.env.NODE_ENV];
