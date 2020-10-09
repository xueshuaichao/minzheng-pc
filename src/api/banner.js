import { axios } from '../libs/axios';

export default {
    findBanner(params) {
        return axios.get('/system/v1/replay/student/list', params);
    },
};
