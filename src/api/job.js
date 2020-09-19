import { axios } from '../libs/axios';

export default {
    getList(pageNum, pageSize = 10) {
        return axios.post('/job/findByConditionWithPage', {
            pageNum,
            pageSize,
        });
    },
    getDetail(id) {
        return axios.get('/job/findById', {
            id,
        });
    },
};
