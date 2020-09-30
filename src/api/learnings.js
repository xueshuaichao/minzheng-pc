import { axios } from '../libs/axios';

export default {
    // findMyCourseOrderInfo(isComplete, courseType) {
    //     return axios.get('/courseOrder/student/myTask', {
    //         isComplete,
    //         courseType,
    //     });
    // },
    statisticsLearn() {
        return axios.get('/learnCenter/statistics/learn');
    },
    taskFindByCondition(param) {
        return axios.post(
            `/learnCenter/task/findByCondition?pageNum=${param.pageNum}&pageSize=${param.pageSize}`,
            param,
        );
    },
    // 选学列表
    userCourseElective(param) {
        return axios.post(
            `/learnCenter/userCourse/elective?pageNum=${param.pageNum}&pageSize=${param.pageSize}`,
            param,
        );
    },
    // 测评列表
    examFindByCondition(param) {
        return axios.post(
            `/learnCenter/exam/findByCondition?pageNum=${param.pageNum}&pageSize=${param.pageSize}`,
            param,
        );
    },
    // 错题本信息
    questionFindByCondition(param) {
        return axios.post(
            `/learnCenter/question/findByCondition?pageNum=${param.pageNum}&pageSize=${param.pageSize}`,
            param,
        );
    },
    // 用户基本信息
    userInfo(param) {
        return axios.get('/learnCenter/user/info', param);
    },
    // 删除错题
    questionRemove(param) {
        return axios.post('/learnCenter/question/remove', param);
    },
    // 消息列表
    messageFindByCondition(param) {
        return axios.get(
            `/learnCenter/message/findByCondition?pageNum=${param.pageNum}&pageSize=${param.pageSize}`,
            param,
        );
    },
    fileUpload(param) {
        console.log(param);
        return axios.file('/resourceCenter/v1/resource/uploadImage', param);
    },
    // 获取验证码
    userSendSms(param) {
        return axios.get(
            `/learnCenter/user/sendSms?phone=${param.phone}`,
            param,
        );
    },
    // 试卷分类
    examGetCategoryTree() {
        return axios.get('/learnCenter/exam/getCategoryTree');
    },
};
