import { axios } from '../libs/axios';

export default {
    // 查询政策列表
    getPolicyList() {
        return axios.post('/policy/api/findByCondition');
    },
    // 查询政策详情
    getPolicyById(id) {
        return axios.post('/policy/api/findById', {
            id,
        });
    },
    // 查询政策解读分类列表
    getFindCategory(category) {
        return axios.post('/policy/api/findCategoryByCondition', {
            category,
        });
    },
    //  政策解读首页-左侧筛选列表
    findByCondition(params) {
        return axios.post('/api/v1/policy/findByCondition', params);
    },

    // 政策解读首页-左侧政策分类
    findCategoryByCondition(params) {
        return axios.post('/api/v1/policy/findCategoryByCondition', params);
    },
    //  政策解读首页-右侧政策详情
    findById(id) {
        return axios.get(`/api/v1/policy/findById?id=${id}`);
    },
    // 政策解读首页-右侧相关解读推荐
    findResourcesByCondition(resourceCategoyId) {
        return axios.get(
            `/api/v1/policy/findResourcesByCondition?resourceCategoyId=${resourceCategoyId}`,
        );
    },
    // 预览视频文件（获取视频播放地址列表）
    getVideoPlayURL(videoId) {
        return axios.get(`/resource/getVideoPlayURL?videoId=${videoId}`);
    },
};
