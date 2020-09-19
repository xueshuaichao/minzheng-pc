import { axios } from '../libs/axios';

// 课程相关
export default {
    // 获取课程列表
    getCourselist(param, course) {
        return axios.post(
            `/course/userCourselist?pageNum=${param.pageNum}&pageSize=${param.pageSize}`,
            course,
        );
    },
    // 获取课程枚举信息
    getCourseStaticInfo() {
        return axios.get('/course/courseStaticInfo');
    },
    // 课程明细
    findById(id) {
        return axios.get('/course/findById', id);
    },
    // 获取课程章节信息
    findCourseItemByCourseId(courseId) {
        return axios.get('/courseItem/findCourseItemByCourseId', courseId);
    },
    // 开始上课
    startStudy(courseId) {
        return axios.post(
            `/courseOrder/student/startStudy?courseId=${courseId}`,
        );
    },
    // 预览视频文件
    previewMedia(resourceId) {
        return axios.get(
            `/resource/previewUploadFile?resourceId=${resourceId}`,
        );
    },
    // // 获取视频播放地址
    // getVideoPlayURL(videoId) {
    //     return axios.get(`/resource/getVideoPlayURL?videoId=${videoId}`);
    // },
    // 通过resourceId获取视频
    getVideoUrlByResourceId(resourceId) {
        return axios.get(
            `/resource/getVideoUrlByResourceId?resourceId=${resourceId}`,
        );
    },
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
