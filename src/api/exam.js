import { axios } from '../libs/axios';

/**
 * 考试测评
 */
export default {
    // 试卷列表
    getExamList(pageNum, pageSize, scene) {
        return axios.post(
            `/api/v1/scene/findByCondition?pageNum=${pageNum}&pageSize=${pageSize}`,
            {
                scene,
            },
        );
    },
    // 一级分类列表
    getCategoryList() {
        return axios.get('/category/getTree');
    },
    // 二级分类列表
    // getCategoryList2(sceneCategoryId) {
    //     return axios.post('/category/getChildren', sceneCategoryId);
    // },
    getChildren(categoryId) {
        return axios.post(`/category/getChildren?categoryId=${categoryId}`);
    },

    // 开始考试
    joinScene(params) {
        return axios.get('/api/v1/scene/joinScene', params);
    },
    // 试题列表
    findQuestionInfo(sceneId) {
        return axios.get('/api/v1/scene/findQuestionInfo', sceneId);
    },
    // 问卷列表
    findQuestionPaper(sceneId) {
        return axios.get('/api/v1/scene/findQuestionPaper', sceneId);
    },
    // 试卷详情
    findById(id) {
        return axios.get('/scene/findById', id);
    },
    // 试卷详情
    showPaperDetail(paperId) {
        return axios.get('/api/v1/scene/showPaperDetail', paperId);
    },

    // 考试结果详情
    showQuestionInfo(paperId) {
        return axios.get('api/v1/scene/showQuestionInfo', paperId);
    },
    // 问卷结果详情
    showQuestionPaper(paperId) {
        return axios.get('/api/v1/scene/showQuestionPaper', paperId);
    },
    // 提交试卷
    commitPaper(sceneCategoryId) {
        return axios.post('/api/v1/scene/commitPaper', sceneCategoryId);
    },
    // 个人中心考试列表
    findRecordByUserId(data) {
        return axios.post('/api/v1/scene/findRecordByUserId', data);
    },
};
