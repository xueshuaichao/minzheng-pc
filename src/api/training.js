import { axios } from '../libs/axios';

// 任务相关
export default {
    getTaskList(data) {
        return axios.request(
            '/apis/rest/userTask/findTaskListAndUserApplyStatus',
            data,
        );
    },
    getTrainingDetail(data) {
        return axios.get('/apis/rest/userTask/getTaskInfoByUserId', data);
    },
};
