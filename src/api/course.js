import { axios } from '../libs/axios';

// 课程相关
export default {
    // 首页查询精品课程（根据课程评论排名,展示排名靠前的7门课程）
    findBoutiqueCourseList(param) {
        return axios.get(
            '/course/v1/course/student/findBoutiqueCourseList',
            param,
        );
    },
    // 获取课程列表
    getCourselist(param) {
        return axios.get(
            '/course/v1/course/student/findCourseStudentList',
            param,
        );
    },
    // 获取课程分类
    getCourseCategory() {
        return axios.get('/course/v1/course/student/getCourseCategory');
    },
    // 获取课程详情
    findById(data) {
        return axios.get(
            '/course/v1/course/student/findStudentCourseInfoById',
            data,
        );
    },
    // 获取课程目录
    findCourseItemByCourseId(data) {
        return axios.get(
            '/course/v1/course/student/findStudentCourseItem',
            data,
        );
    },
    // 加入选学
    startStudy(data) {
        return axios.post(
            `/course/v1/userCourseRecord/student/course/signup?courseId=${data.courseId}&taskId=${data.taskId}`,
        );
    },
    // 提交评价
    submitCourseRatingForm(data) {
        return axios.post(
            '/course/v1/courseRatingForm/student/submitCourseRatingForm',
            data,
        );
    },

    // 课程视频播放 resource/getVideoPlayURLById
    getVideoPlayURLById(data) {
        return axios.get('/resource/v1/resource/getVideoPlayURLById', data);
    },
    // 根据资源ID查询音频或文档地址
    getAudioOrDocUrl(data) {
        return axios.get('/resource/v1/resource/getAudioOrDocUrl', data);
    },

    // 保存课程进度 /courseLearningLog/student/saveLearningLog
    saveLearningLog(data) {
        return axios.post(
            '/course/v1/courseLearningLog/student/saveLearningLog',
            data,
        );
    },
    // 根据父级分类id查询子类 /category/getChildren
    getChildren(data) {
        return axios.get('/resource/v1/category/getChildren', data);
    },
    // 热门分类 /course/student/getHotCategoryList
    getHotCategoryList(data) {
        return axios.get('/course/v1/course/student/getHotCategoryList', data);
    },
};
