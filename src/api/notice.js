import { axios } from '../libs/axios';

/**
 * 通知公告
 * type = 1 通知， type = 2 政策法规
 */
export default {
    getNoticeList(type) {
        return axios.post('/notice/findByCondition', type);
    },
    getNoticeById(id) {
        return axios.get('/notice/findById', id);
    },
    getResourceId(id) {
        return axios.get('/resource/findById', id);
    },
};
