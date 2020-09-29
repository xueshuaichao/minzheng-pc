import { axios } from '../libs/axios';

/**
 * 考试测评
 */
export default {
    // 试卷列表
    getExamList(pageNum, pageSize, scene) {
        return axios.post(
            `/exam/v1/scene/findByCondition?pageNum=${pageNum}&pageSize=${pageSize}`,
            {
                scene,
            },
        );
    },
    // 一级分类列表
    getCategoryList() {
        return axios.get('/resourceCenter/v1/category/getTree');
    },
    // 二级分类列表
    // getCategoryList2(sceneCategoryId) {
    //     return axios.post('/category/getChildren', sceneCategoryId);
    // },
    getChildren(categoryId) {
        return axios.get(
            `/resourceCenter/v1/category/getChildren?categoryId=${categoryId}`,
        );
    },

    // 开始考试
    joinScene(params) {
        return axios.get('/exam/v1/scene/joinScene', params);
    },
    // 试题列表
    findQuestionInfo(sceneId) {
        return axios.get('/exam/v1/scene/findQuestionInfo', sceneId);
    },
    // 问卷列表
    findQuestionPaper(sceneId) {
        return axios.get('/exam/v1/scene/findQuestionPaper', sceneId);
    },
    // 试卷详情
    findById(id) {
        return axios.get('/exam/v1/scene/findById', id);
    },
    // 试卷详情
    getScenePaper(paperId) {
        return axios.get('/exam/v1//scene/getScenePaper', paperId);
    },

    // 考试结果详情  包含答题信息和成绩信息
    getExamResultDetail(paperId) {
        return axios.get('/exam/v1/paper/getExamResultDetail', paperId);
    },
    // 考试结果预览，只包含成绩和试卷信息
    getExamResultOverview(paperId) {
        return axios.get('/exam/v1/paper/getExamResultOverview', paperId);
    },

    // 问卷结果详情
    showQuestionPaper(paperId) {
        return axios.get('/exam/v1/scene/showQuestionPaper', paperId);
    },
    // 提交试卷
    commitPaper(saveData) {
        return axios.post('/exam/v1/paper/commitPaper', saveData);
    },
    // 个人中心考试列表
    findRecordByUserId(data) {
        return axios.post('/exam/v1/scene/findRecordByUserId', data);
    },
};
