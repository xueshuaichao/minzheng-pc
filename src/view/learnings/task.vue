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
        <div class="task-tab">
            <span
                v-for="(item, index) in taskTab"
                :key="index"
                :class="{ active: taskIndex == index }"
                @click="taskclick(index)"
            >{{ item }}</span>
        </div>
        <div
            v-show="taskIndex == 0"
            class="task-content"
        >
            <div>
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
                                v-for="(item, index) in courseList1"
                                :key="index"
                                class="list"
                            >
                                <div class="img">
                                    <img
                                        :src="item.courseCoverUrl"
                                        alt=""
                                    >
                                </div>
                                <div class="center-text">
                                    <h1>{{ item.courseName }}</h1>
                                    <div>
                                        <p class="type">
                                            课程类型：
                                            <span>{{
                                                item.courseTypeName
                                            }}</span>
                                        </p>
                                        <p class="total-hours">
                                            学 时：共{{ item.orderPeriod }}学时
                                        </p>
                                        <p
                                            v-if="item.lastStudyLog != null"
                                            class="accomplish"
                                        >
                                            上次学到：
                                            <span>{{
                                                      item.lastStudyLog
                                                          .sectionTitle
                                                  }}
                                                {{
                                                    item.lastStudyLog
                                                        .lessonTitle
                                                }}
                                                {{
                                                    item.lastStudyLog
                                                        .learningTime
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
                                v-for="(item1, index) in courseList"
                                :key="index"
                                class="list"
                            >
                                <div class="img">
                                    <img :src="item1.courseCoverUrl">
                                </div>
                                <div class="center-text">
                                    <h1>{{ item1.courseName }}</h1>
                                    <div>
                                        <p class="type">
                                            课程类型：
                                            <span>{{
                                                item1.courseTypeName
                                            }}</span>
                                        </p>
                                        <p class="total-hours">
                                            学 时：共{{ item1.orderPeriod }}学时
                                        </p>
                                        <p
                                            v-if="item1.lastStudyLog != null"
                                            class="accomplish"
                                        >
                                            上次学到：<span>{{
                                                           item1.lastStudyLog
                                                               .sectionTitle
                                                       }}
                                                {{
                                                    item1.lastStudyLog
                                                        .lessonTitle
                                                }}
                                                {{
                                                    item1.lastStudyLog
                                                        .learningTime
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
                                                考试时间：{{
                                                    exam1.duration
                                                }}分钟
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
        </div>
        <div
            v-show="taskIndex == 1"
            class="task-content"
        >
            <div
                v-if="!resultShow"
                class="record-tab"
            >
                <span
                    v-for="(item, index) in recordTab"
                    :key="index"
                    :class="{ active: recordIndex == index }"
                    @click="recordClick2(index)"
                >{{ item }}</span>
            </div>
            <div v-if="courseList.length > 0 || examList.length > 0">
                <div
                    v-show="recordIndex == 0"
                    class="record-content"
                >
                    <div
                        v-for="(item2, index) in courseList"
                        :key="index"
                        class="list"
                    >
                        <div class="img">
                            <img :src="item2.courseCoverUrl">
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
                    v-show="recordIndex == 1"
                    class="record-content"
                >
                    <div
                        v-for="(item3, index) in courseList"
                        :key="index"
                        class="list"
                    >
                        <div class="img">
                            <img :src="item3.courseCoverUrl">
                        </div>
                        <div class="center-text">
                            <h1>{{ item3.courseName }}</h1>
                            <div>
                                <p class="type">
                                    课程类型：
                                    <span>{{ item3.courseTypeName }}</span>
                                </p>
                                <p class="total-hours">
                                    学 时：共{{ item3.orderPeriod }}学时
                                </p>
                                <p
                                    v-if="item3.lastStudyLog != null"
                                    class="accomplish"
                                >
                                    上次学到：<span>{{ item3.lastStudyLog.sectionTitle }}
                                        {{ item3.lastStudyLog.lessonTitle }}
                                        {{
                                            item3.lastStudyLog.learningTime
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
                            v-for="(exam2, index) in taskList"
                            :key="index"
                            class="list"
                        >
                            <div class="img">
                                <p>企业公文</p>
                            </div>
                            <div class="center-text">
                                <h1>{{ exam2.title }}</h1>
                                <div v-show="exam2.type == 2">
                                    <p class="exam-time">
                                        {{ exam2.time }}
                                    </p>
                                    <p class="exam-num">
                                        {{ exam2.num }}/20 正确题数/题目总数
                                    </p>
                                </div>
                            </div>
                            <div class="button">
                                <i-button
                                    v-show="exam2.type == 2"
                                    type="primary"
                                    @click="resultShow = true"
                                >
                                    查看详情
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
        <i-page
            class="pager"
            :total="total"
            prev-text="上一页"
            next-text="下一页"
            :page-size="record.pageSize"
            :current="record.pageNum"
            @on-change="handlePageChange"
        />
    </div>
</template>

<script>
import api from '../../api/learning';
import examApi from '../../api/exam';
import store from '../../store';

export default {
    data() {
        return {
            resultShow: false,
            total: 0,
            taskIndex: 0,
            taskTab: ['未完成', '已完成'],
            recordIndex: 0,
            recordTab: ['必修课程', '选修课程', '考试'],
            taskList: [],
            courseList: [],
            courseList1: [],
            examList: [],
            isComplete: 0, // 是否完成
            courseType: 0, // 课程类型
            record: {
                userId: '',
                resultType: 2, // 类型：1.全部，2.未完成，3.已完成 任务必填，记录和其他情况非必填
                purposeType: '', // 用途类型：1.考试，2.问卷 其他情况必填，任务和记录非必填
                pageNum: 1,
                pageSize: 4,
            },
        };
    },
    created() {
        this.findMyCourseOrderInfo();
        this.record.userId = store.state.user.userInfo.id;
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
        // 考试分页
        handlePageChange(num) {
            this.record.pageNum = num;

            if (this.recordIndex === 2) {
                this.findRecordByUserId();
            } else {
                this.courseList1 = this.courseList.slice(
                    (this.record.pageNum - 1) * 4,
                    this.record.pageNum * 4,
                );
                // this.findMyCourseOrderInfo(1);
            }
        },
        taskclick(index) {
            this.taskIndex = index;
            this.recordIndex = 0;
            this.examList = [];
            this.courseList = [];
            if (this.taskIndex === 0) {
                this.isComplete = 0;
                this.courseType = 0;
            } else {
                this.isComplete = 1;
                this.courseType = 0;
            }
            this.findMyCourseOrderInfo();
        },
        // 已完成
        recordClick2(index) {
            this.examList = [];
            this.courseList = [];
            this.recordIndex = index;
            if (this.recordIndex === 2) {
                this.record.resultType = 3;
                this.findRecordByUserId();
            } else {
                this.courseType = index;
                this.findMyCourseOrderInfo();
            }
        },
        recordClick(index) {
            this.examList = [];
            this.courseList = [];
            this.recordIndex = index;
            if (this.recordIndex === 2) {
                this.record.resultType = 2;
                this.findRecordByUserId();
            } else {
                this.courseType = index;
                this.findMyCourseOrderInfo();
            }
        },
        // 考试列表
        findRecordByUserId() {
            return examApi.findRecordByUserId(this.record).then((data) => {
                this.examList = data.data.list;
                this.total = data.data.total;
            });
        },
        // 课程列表
        findMyCourseOrderInfo() {
            return api
                .findMyCourseOrderInfo(this.isComplete, this.courseType)
                .then((data) => {
                    this.courseList = data.data;
                    this.total = this.courseList.length;

                    this.handlePageChange(1);
                });
        },
    },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
