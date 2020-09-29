import { axios } from '../libs/axios';

// 任务相关
export default {
    getTaskList(data) {
        return axios.request(
            '/train/v1/userTask/findTaskListAndUserApplyStatus',
            data,
        );
    },
    getTrainingDetail(data) {
        return axios.get('/train/v1/userTask/getTaskInfoByUserId', data);
    },
    changeTaskApply(data) {
        return axios.post(
            `/train/v1/userTask/apply?taskId=${data.taskId}&isApply=${data.isApply}`,
            data,
        );
    },
};
