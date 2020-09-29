import { axios } from '../libs/axios';

// 课程相关
export default {
    // 获取课程列表
    getCourselist(param) {
        return axios.get('/apis/course/student/findCourseStudentList', param);
    },
    // 获取课程分类
    getCourseCategory() {
        return axios.get('/apis/course/student/getCourseCategory');
    },
    // 获取课程详情
    findById(param) {
        return axios.get(
            `/apis/course/student/findStudentCourseInfoById?id=${param}`,
        );
    },
    // 获取课程目录
    findCourseItemByCourseId(data) {
        return axios.get('/apis/course/student/findStudentCourseItem', data);
    },
    // 加入选学
    startStudy(data) {
        return axios.post(
            `/apis/userCourseRecord/student/course/signup?courseId=${data}`,
        );
    },
    // 提交评价
    submitCourseRatingForm(data) {
        return axios.post(
            '/apis/courseRatingForm/student/submitCourseRatingForm',
            data,
        );
    },

    // 课程视频播放 resource/getVideoPlayURLById
    getVideoPlayURLById(data) {
        return axios.get('/apii/resource/getVideoPlayURLById', data);
    },
    // 保存课程进度 /courseLearningLog/student/saveLearningLog
    saveLearningLog(data) {
        return axios.post(
            '/apis/courseLearningLog/student/saveLearningLog',
            data,
        );
    },

    // 通过resourceId获取视频
    // getVideoUrlByResourceId(resourceId) {
    //     return axios.get(
    //         `/resource/getVideoUrlByResourceId?resourceId=${resourceId}`,
    //     );
    // },
    // 检查用户是否上完此课程，并且标记 应用场景，当用户每次上完课程小节的时候可以调用。
    checkAndSignCompleteCourse(courseId) {
        return axios.post(
            `/courseOrder/student/checkAndSignCompleteCourse?courseId=${courseId}`,
        );
    },
    // 查看用户是否学完必修课
    checkUserFinishRequiredClassHour() {
        return axios.get(
            '/courseUserHour/student/checkUserFinishRequiredClassHour',
        );
    },
    // 保存上课记录  使用场景：用户在观看视频过程中，每隔一段时间（15s）或者视频看完，可以调用此接口
    saveUserCourseLearningLog(data) {
        return axios.post(
            '/courseLearningLog/student/saveUserCourseLearningLog',
            data,
        );
    },
    // 查询课程上课记录
    findLearningLog(courseId) {
        return axios.get(
            `/courseLearningLog/student/findUserCourseLearningLogByCourseId?courseId=${courseId}`,
        );
    },
    // 根据用户Id列表，考试（问卷）个人中心的记录和任务列表
    findRecordByUserId(data) {
        return axios.post('/api/v1/scene/findRecordByUserId', data);
    },
    // 获取二级节点
    getChildren(categoryId) {
        return axios.post(`/category/getChildren?categoryId=${categoryId}`);
    },
};
