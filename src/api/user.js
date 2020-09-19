import { axios } from '../libs/axios';

export default {
    getUserInfo() {
        return axios.get('/user/userInfo/findUserInfo');
    },
    userStaticInfo() {
        return axios.get('/user/userStaticInfo');
    },
    login(username, password) {
        return axios.post('/user/login', {
            username,
            password,
        });
    },
    smsLogin(username, vcode) {
        return axios.post('/user/smslogin', {
            username,
            vcode,
            userType: 0,
        });
    },
    // 保存个人信息
    update(params) {
        return axios.post('/user/userInfo/update', params);
    },
    register(data) {
        return axios.post('/user/register', data);
    },
    getSmsCode(mobile, userType = 0) {
        return axios.post('/user/getCode', {
            username: mobile,
            userType,
        });
    },
    // 忘记密码保存
    retrievePassword(userMobile, password, repeatPassword, vcode) {
        return axios.post('/user/retrievePassword', {
            userMobile,
            password,
            repeatPassword,
            vcode,
        });
    },
    // 修改密码
    changePassword(data) {
        return axios.post('/user/changePassword', data);
    },

    /**
     * 身份证验证
     */
    identityAuth(realname, idcard) {
        return axios.post('/user/identityAuth', {
            realname,
            idcard,
        });
    },
    resetPassword(data) {
        return axios.post('/user/retrievePasssword', data);
    },
};
