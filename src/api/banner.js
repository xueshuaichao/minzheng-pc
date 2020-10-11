import { axios } from '../libs/axios';

export default {
    findBanner(params) {
        return axios.get('/system/v1/replay/student/list', params);
    },
    reportClick(params) {
        return axios.post(
            `/system/v1/replay/student/click?id=${params.id}`,
            params,
        );
    },
};
