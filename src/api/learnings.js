import { axios } from '../libs/axios';

export default {
    // findMyCourseOrderInfo(isComplete, courseType) {
    //     return axios.get('/courseOrder/student/myTask', {
    //         isComplete,
    //         courseType,
    //     });
    // },
    statisticsLearn() {
        return axios.get('/learn/v1/statistics/learn');
    },
    taskFindByCondition(param) {
        return axios.post(
            `/learn/v1/task/findByCondition?pageNum=${param.pageNum}&pageSize=${param.pageSize}`,
            param,
        );
    },
    // 选学列表
    userCourseElective(param) {
        return axios.post(
            `/learn/v1/userCourse/elective?pageNum=${param.pageNum}&pageSize=${param.pageSize}`,
            param,
        );
    },
    // 测评列表
    examFindByCondition(param) {
        return axios.get(
            `/exam/v1/paper/getMyExam?pageNum=${param.pageNum}&pageSize=${param.pageSize}`,
            param,
        );
    },
    // 错题本信息
    errorBookFindByCondition(param) {
        return axios.post(
            `/exam/v1/errorBook/findByCondition?pageNum=${param.pageNum}&pageSize=${param.pageSize}`,
            param,
        );
    },
    // 用户基本信息
    userInfo(param) {
        return axios.get('/learn/v1/user/info', param);
    },
    // 删除错题
    questionRemove(param) {
        return axios.post('/learn/v1/question/remove', param);
    },
    // 消息列表
    messageFindByCondition(param) {
        return axios.get(
            `/learn/v1/message/findByCondition?pageNum=${param.pageNum}&pageSize=${param.pageSize}`,
            param,
        );
    },
    fileUpload(param) {
        console.log(param);
        return axios.file('/resource/v1/v1/resource/uploadImage', param);
    },
    // 获取验证码
    userSendSms(param) {
        return axios.get(`/learn/v1/user/sendSms?phone=${param.phone}`, param);
    },
    // 试卷分类
    examGetCategoryTree() {
        return axios.get('/learn/v1/exam/getCategoryTree');
    },
};
