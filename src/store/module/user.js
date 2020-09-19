export default {
    state: {
        token: '',
        userInfo: null,
    },

    mutations: {
        setToken(state, payload) {
            state.token = payload;
        },

        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
    },

    // actions: {
    //     getUserInfo({ commit }) {
    //         return userApi.getUserInfo().then((userInfo) => {
    //             commit('setUserInfo', userInfo);
    //         });
    //     },
    // },
};
