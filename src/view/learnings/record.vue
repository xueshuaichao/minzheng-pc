<template>
    <div>
        <!-- 试卷详情 -->
        <div
            v-if="resultShow"
            class="back"
            @click="resultShow = false"
        >
            <img
                src="../../assets/images/learning/back.png"
                alt=""
            >
            返回
        </div>
        <result v-if="resultShow" />
        <div>
            <div
                v-if="!resultShow"
                class="record-tab"
            >
                <span
                    v-for="(item, index) in recordTab"
                    :key="index"
                    :class="{ active: recordIndex == index }"
                    @click="recordClick(index)"
                >{{ item }}</span>
            </div>
            <div v-if="courseList.length > 0 || examList.length > 0">
                <div
                    v-show="recordIndex == 0"
                    class="record-content"
                >
                    <div
                        v-for="(item1, index) in courseList"
                        :key="index"
                        class="list"
                    >
                        <div class="img">
                            <img
                                :src="item1.courseCoverUrl"
                                alt=""
                            >
                        </div>
                        <div class="center-text">
                            <h1>{{ item1.courseName }}</h1>
                            <div>
                                <p class="type">
                                    课程类型：
                                    <span>{{ item1.courseTypeName }}</span>
                                </p>
                                <p class="total-hours">
                                    学 时：共{{ item1.orderPeriod }}学时
                                </p>
                                <p
                                    v-if="item1.lastStudyLog != null"
                                    class="accomplish"
                                >
                                    上次学到：<span>{{ item1.lastStudyLog.sectionTitle }}
                                        {{ item1.lastStudyLog.lessonTitle }}
                                        {{
                                            item1.lastStudyLog.learningTime
                                        }}</span>
                                </p>
                            </div>
                        </div>
                        <div class="button">
                            <i-button type="primary">
                                继续学习
                            </i-button>
                        </div>
                    </div>
                </div>
                <div
                    v-show="recordIndex == 1"
                    class="record-content"
                >
                    <div
                        v-for="(item2, index) in courseList"
                        :key="index"
                        class="list"
                    >
                        <div class="img">
                            <img
                                :src="item2.courseCoverUrl"
                                alt=""
                            >
                        </div>
                        <div class="center-text">
                            <h1>{{ item2.courseName }}</h1>
                            <div>
                                <p class="type">
                                    课程类型：
                                    <span>{{ item2.courseTypeName }}</span>
                                </p>
                                <p class="total-hours">
                                    学 时：共{{ item2.orderPeriod }}学时
                                </p>
                                <p
                                    v-if="item2.lastStudyLog != null"
                                    class="accomplish"
                                >
                                    上次学到：<span>{{ item2.lastStudyLog.sectionTitle }}
                                        {{ item2.lastStudyLog.lessonTitle }}
                                        {{
                                            item2.lastStudyLog.learningTime
                                        }}</span>
                                </p>
                            </div>
                        </div>
                        <div class="button">
                            <i-button type="primary">
                                继续学习
                            </i-button>
                        </div>
                    </div>
                </div>
                <div
                    v-show="recordIndex == 2"
                    class="record-content"
                >
                    <div v-if="!resultShow">
                        <div
                            v-for="(exam1, index) in examList"
                            :key="index"
                            class="list"
                        >
                            <div class="img">
                                <p>{{ exam1.name }}</p>
                            </div>
                            <div class="center-text">
                                <h1>{{ exam1.name }}</h1>
                                <div v-if="exam1.purposeType == 1">
                                    <p class="exam-time">
                                        考试时间：{{ exam1.duration }}分钟
                                    </p>
                                    <p class="exam-num">
                                        难易程度：<Rate
                                            v-model="exam1.difficulty"
                                            disabled
                                        />
                                    </p>
                                </div>
                            </div>
                            <div class="button">
                                <i-button
                                    v-if="exam1.purposeType == 1"
                                    type="primary"
                                    @click="joinScene(exam1)"
                                >
                                    开始考试
                                </i-button>
                                <i-button
                                    v-else
                                    type="primary"
                                    @click="joinScene(exam1)"
                                >
                                    填写问卷
                                </i-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                v-else
                class="no-data-box"
            >
                <img
                    src="../../assets/images/home/no-data.png"
                    class="no-data"
                    alt=""
                >
                <p>暂无数据</p>
            </div>
        </div>
    </div>
</template>

<script>
import Result from '../exam/resultpage.vue';
import api from '../../api/learning';
import examApi from '../../api/exam';
import store from '../../store';

export default {
    components: { Result },
    data() {
        return {
            resultShow: false,
            recordIndex: 0,
            recordTab: ['必修课程', '选修课程', '考试'],
            recordList: [],
            courseList: [],
            examList: [],
            total: 0,
            isComplete: '', // 是否完成 0 未完成 1 已完成
            courseType: 0, // 课程类型 0 必修 1 选修
            record: {
                userId: null,
                resultType: 1, // 类型：1.全部，2.未完成，3.已完成 任务必填，记录和其他情况非必填
                purposeType: '', // 用途类型：1.考试，2.问卷 其他情况必填，任务和记录非必填
                pageNum: 1,
                pageSize: 50,
            },
        };
    },
    created() {
        this.record.userId = store.state.user.userInfo.id;
        // this.findMyCourseOrderInfo();
    },
    methods: {
        // 开始考试 问卷
        joinScene(exam) {
            const params = {
                sceneId: exam.id,
                userId: store.state.user.userInfo.id,
            };
            return examApi.joinScene(params).then((data) => {
                if (data.success) {
                    this.$router.push({
                        name: 'examDetail',
                        params: {
                            id: exam.id,
                            paperId: data.data,
                            type: exam.purposeType,
                        },
                    });
                }
            });
        },
        recordClick(index) {
            this.recordIndex = index;
            this.examList = [];
            this.courseList = [];
            if (this.recordIndex === 2) {
                console.log(this.recordIndex);
                this.findRecordByUserId();
            } else {
                this.courseType = index;
                this.findMyCourseOrderInfo1();
            }
        },
        // 考试列表
        findRecordByUserId() {
            return examApi.findRecordByUserId(this.record).then((data) => {
                this.examList = data.data.list;
                console.log(this.examList);
                this.total = data.data.total;
            });
        },
        // 课程列表
        findMyCourseOrderInfo1() {
            return api
                .findMyCourseOrderInfo1(this.isComplete, this.courseType)
                .then((data) => {
                    this.courseList = data.data;
                });
        },
        handlePageChange() {},
    },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
<style lang="less">
.learning {
    .ivu-form .ivu-form-item-label {
        float: none;
    }
    .ivu-form-inline .ivu-form-item {
        display: block;
    }
    .ivu-input-wrapper {
        width: 300px;
    }
    .form-id {
        .ivu-input-wrapper {
            width: 400px;
        }
        .ivu-form-item-label {
            position: relative;
            right: 160px;
        }
    }
    .ivu-form-item-content {
        margin-top: 7px;
    }
    .ivu-form-item-label {
        margin-left: 8px;
        margin-bottom: 7px;
    }
    .ivu-input {
        height: 48px;
    }
    .exam-result-page {
        width: 100%;
        margin-top: 33px;
    }
    .exam-result {
        width: 100%;
        max-height: 650px;
        overflow-y: scroll;
        box-shadow: 0 0 0 0;
    }
    .exam-result .exam-top .score {
        top: 2px;
    }
}
</style>
