import { axios } from '../libs/axios';

export default {
    // findMyCourseOrderInfo(isComplete, courseType) {
    //     return axios.get('/courseOrder/student/myTask', {
    //         isComplete,
    //         courseType,
    //     });
    // },
    statisticsLearn() {
        return axios.get('/statistics/learn');
    },
    taskFindByCondition(param) {
        return axios.post('/task/findByCondition', param);
    },
};
