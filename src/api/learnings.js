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
        return axios.get('/exam/v1/paper/getMyExam', param);
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
        return axios.get('/ucenter/sso/checkCookie', param);
        // return axios.post('/ucenter/userInfo', param);
    },
    // 删除错题
    questionRemove(param) {
        return axios.post('/exam/v1/errorBook/remove', param);
    },
    // 消息列表
    messageFindByCondition(param) {
        return axios.get('/learn/v1/message/findByCondition', param);
    },
    fileUpload(param) {
        console.log(param);
        return axios.file('/resource/v1/resource/uploadImage', param);
    },
    // 获取验证码
    userSendSms(param) {
        return axios.get('/ucenter/smsCode/changeInfo', param);
    },
    // 试卷分类
    examGetCategoryTree() {
        return axios.get('/learn/v1/exam/getCategoryTree');
    },
    // 用户信息提交
    abc() {
        return axios.get('/learn/v1/exam/getCategoryTree');
    },
    // 修改密码
    updatePassword() {
        return axios.post('/ucenter/changePassword');
    },
    // 更新用户信息
    userUpdate(param) {
        return axios.post('/learn/v1/user/update', param);
    },
    // 获取机构信息
    fieldSearchDetail() {
        return axios.get('/ucenter/field/searchDetail?id=1');
    },
};
