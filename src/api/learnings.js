import { axios } from '../libs/axios';

export default {
    // findMyCourseOrderInfo(isComplete, courseType) {
    //     return axios.get('/courseOrder/student/myTask', {
    //         isComplete,
    //         courseType,
    //     });
    // },
    statisticsLearn() {
        return axios.get('/apis/learnCenter/statistics/learn');
    },
    taskFindByCondition(param) {
        return axios.post(
            '/apis/learnCenter/task/findByCondition?pageNum=1&pageSize=20',
            param,
        );
    },
    // 选学列表
    userCourseElective(param) {
        return axios.post(
            '/apis/learnCenter/userCourse/elective?pageNum=1&pageSize=20',
            param,
        );
    },
    // 测评列表
    examFindByCondition(param) {
        return axios.post(
            '/apis/learnCenter/exam/findByCondition?pageNum=1&pageSize=20',
            param,
        );
    },
    // 错题本信息
    questionFindByCondition(param) {
        return axios.post(
            '/apis/learnCenter/question/findByCondition?pageNum=1&pageSize=20',
            param,
        );
    },
    // 用户基本信息
    userInfo(param) {
        return axios.get('/apis/learnCenter/user/info', param);
    },
    // 删除错题
    questionRemove(param) {
        return axios.post('/apis/learnCenter/question/remove', param);
    },
    // 消息列表
    messageFindByCondition(param) {
        return axios.get(
            '/apis/learnCenter/message/findByCondition?pageNum=1&pageSize=20',
            param,
        );
    },
    fileUpload(param) {
        console.log(param);
        return axios.file('/apii/file/upload', param);
    },
};
