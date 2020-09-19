import { axios } from '../libs/axios';

export default {
    findMyCourseOrderInfo(isComplete, courseType) {
        return axios.get('/courseOrder/student/myTask', {
            isComplete,
            courseType,
        });
    },
    findMyCourseOrderInfo1(isComplete, courseType) {
        return axios.get('/courseOrder/student/findMyCourseOrderInfo', {
            isComplete,
            courseType,
        });
    },
    uploadFile(data) {
        return axios.file('/resource/uploadFile', data);
    },
    myCertificate() {
        return axios.get('/user/myCertificate');
    },
};
