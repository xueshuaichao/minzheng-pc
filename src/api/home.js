/**
 * @file
 * @author tanghao
 * @date 2018/8/11
 */

import { axios } from '../libs/axios';

export default {
    findAll(data) {
        return axios.get('/courseSystemBgIntroduce/findAll', data);
    },
    findUserCourseHour(userId) {
        return axios.get('/courseUserHour/student/findUserCourseHour', userId);
    },
    findUserAllCourseLearningLog(userId) {
        return axios.get(
            '/courseLearningLog/findUserAllCourseLearningLog',
            userId,
        );
    },
};
