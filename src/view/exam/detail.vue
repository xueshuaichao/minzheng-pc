<template>
    <div class="exam-detail-page m-container">
        <i-breadcrumb
            class="breadcrumb"
            separator=">"
        >
            <i-breadcrumb-item to="/">
                首页
            </i-breadcrumb-item>
            <i-breadcrumb-item :to="{ name: 'examList' }">
                考试测评
            </i-breadcrumb-item>
            <i-breadcrumb-item>
                {{ examDetail.name }}
            </i-breadcrumb-item>
        </i-breadcrumb>
        <div class="exam-detail">
            <div class="exam-top">
                <p>
                    价值管理-财务管理
                </p>
                <h1>
                    {{ examDetail.name }}
                </h1>
                <p>
                    考试时间：{{
                        examDetail.duration
                    }}分钟&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span
                        v-if="saveData.purposeType == 1"
                    >满分：{{ examDetail.totalScore }}分</span>

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 题数：{{
                        stList.length
                    }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 用途：
                    <span v-if="examDetail.purposeType == 1">考试</span>
                    <span v-else>问卷</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span
                        v-if="saveData.purposeType == 1"
                    >难度： <Rate
                        v-model="examDetail.difficulty"
                        disabled
                    /></span>
                </p>
            </div>
            <div class="exam-bottom">
                <div class="exam-left">
                    <div class="scroll">
                        <div
                            v-for="(item, index) in questionsList"
                            :key="index"
                        >
                            <div class="test-questions">
                                <div class="question-type">
                                    <span
                                        class="h1"
                                    >{{ item.serialNum }}、{{
                                        item.name
                                    }}</span>&nbsp;&nbsp;&nbsp; 共{{ item.count }}小题
                                    <span v-if="saveData.purposeType == 1">
                                        ， 每小题{{ item.perMark }}分， 共{{
                                            item.totalScore
                                        }}分
                                    </span>
                                </div>
                            </div>
                            <div
                                v-for="(question, index1) in item.questionList"
                                :key="index1"
                                class="questions"
                            >
                                <ul class="cpStOption">
                                    <h1 class="title">
                                        <span v-if="index > 0">
                                            {{
                                                questionsList[index - 1]
                                                    .questionList.length +
                                                    index1 +
                                                    1
                                            }}
                                        </span>
                                        <span v-else>{{ index1 + 1 }}</span>
                                        . {{ question.title }}
                                    </h1>
                                    <li
                                        v-for="(option,
                                                index2) in question.optionList"
                                        :key="index2"
                                        @click="
                                            handleClickOption(
                                                question,
                                                question.optionList,
                                                item.type,
                                                option,
                                                index1,
                                                index2
                                            )
                                        "
                                    >
                                        <span
                                            class="option-btn"
                                            :class="{
                                                active: option.isAnswers
                                            }"
                                        />
                                        <span class="option-text">
                                            {{ option.code }}、{{
                                                option.value
                                            }}
                                        </span>
                                    </li>
                                </ul>
                                <div
                                    class="mark-btn"
                                    :class="{ active: question.mark }"
                                    @click="
                                        markClick(question, index1, item.type)
                                    "
                                >
                                    <span v-if="!question.mark">标记本题</span>
                                    <span v-else>取消标记</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="exam-right">
                    <div class="exam-time">
                        <p class="text">
                            剩余时间
                        </p>
                        <p class="Time">
                            <span>{{
                                minutes.toString().substring(0, 1)
                            }}</span>
                            <span>{{
                                minutes.toString().substring(1, 2)
                            }}</span>
                            <!-- <span v-show="secShow">{{ minute3 }}</span> -->
                            分
                            <span>{{
                                seconds.toString().substring(0, 1)
                            }}</span>
                            <span>{{
                                seconds.toString().substring(1, 2)
                            }}</span>
                            秒
                        </p>
                    </div>
                    <div class="answer-box">
                        <p class="text">
                            答题卡
                        </p>
                        <div class="answer-mark">
                            <span class="yida"> <i /> 已答</span>
                            <span class="biaoji"><i />标记</span>
                            <span class="weida"><i />未答</span>
                        </div>
                        <p
                            ref="stCount"
                            class="answer-num"
                        >
                            <a
                                v-for="(item, index) in stList"
                                :key="index"
                                :class="[
                                    'pointer',
                                    item.markFlag ? 'bjt' : '',
                                    item.result ? 'ydt' : ''
                                ]"
                            >{{ index + 1 }}</a>
                            <!-- @click="goAnchor(&quot;#wdks&quot;+item.id)" -->
                        </p>
                    </div>
                    <div class="submit-btn">
                        <Button @click="submitExam">
                            立即交卷
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        <Modal
            v-model="modal2"
            width="400"
            class="exam-modal"
        >
            <p slot="header">
                您正在结束作答
            </p>
            <div
                style="text-align:center"
                class="modal-content"
            >
                <img
                    src="../../assets/images/exam/icon-warning.png"
                    alt=""
                >
                <p>{{ prompt }}</p>
            </div>
            <div slot="footer">
                <Button
                    v-show="questionnaire"
                    class="submit button"
                    @click="commitPaper()"
                >
                    立即提交
                </Button>
                <Button
                    class="cancel button"
                    @click="modal2 = false"
                >
                    继续作答
                </Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import api from '../../api/exam';
import store from '../../store';

export default {
    data() {
        return {
            prompt: '',
            IndexNum: '',
            modal2: false,
            isAnswers: 0,
            examDetail: '',
            seconds: 0,
            minutes: 0,
            maxtime: 0,
            time: null,
            secShow: false,
            stList: [], // 题号
            questionsList: [], // 试题列表
            saveData: {
                paperId: '', // 试卷id
                userId: store.state.user.userInfo.id,
                purposeType: 1, // 用途 1：考试 2：问卷
                commitTime: '', // 提交时间
                answerList: [], // 本试卷答题信息列表
            },
            ms: 0, // 毫秒，记录答题时间
            time2: null,
            questionnaire: true,
        };
    },
    created() {
        if (this.$route) {
            console.log(this.$route.params);
            this.saveData.paperId = this.$route.params.paperId;
            this.saveData.purposeType = this.$route.params.type;
            if (this.saveData.purposeType === 1) {
                this.findQuestionInfo();
            } else {
                this.findQuestionPaper();
            }
        }

        this.findById();
        this.start();
    },
    beforeDestroy() {
        if (this.time) {
            clearInterval(this.time);
        }
    },
    methods: {
        timer2() {
            // 定义计时函数
            this.ms = this.ms + 4; // 毫秒
        },
        start() {
            // 开始
            this.time2 = setInterval(this.timer2);
        },
        stop() {
            // 暂停
            clearInterval(this.time2);
        },
        // 点击标记
        markClick(question, index, type) {
            const question1 = question;
            question1.mark = !question1.mark;
            if (type === 1) {
                this.stList[index].markFlag = !this.stList[index].markFlag;
            } else {
                this.stList[
                    this.questionsList[0].questionList.length + index
                ].markFlag = true;
            }
        },
        // 选择
        handleClickOption(question, optionList, type, item, index, index2) {
            const item1 = item;
            this.stop();
            const myanswer = []; // 多选题答案
            /* type  1  单选  2 多选 */
            if (type === 1) {
                optionList.forEach((item2, index3) => {
                    const item4 = item2;
                    if (index2 === index3) {
                        this.$set(item1, 'isAnswers', true);
                        this.$set(question, 'myAnswers', item1.code);
                    } else {
                        this.$set(item4, 'isAnswers', false);
                    }
                });
                this.stList[index].result = true;
            } else {
                item1.isAnswers = !item1.isAnswers;
                optionList.forEach((item2) => {
                    if (item2.isAnswers) {
                        myanswer.push(item2.code);
                    }
                });
                this.$set(question, 'myAnswers', myanswer.join(','));
                this.stList[
                    this.questionsList[0].questionList.length + index
                ].result = true;
            }

            if (question.timeUsed === undefined) {
                this.$set(question, 'timeUsed', this.ms);
            }

            this.ms = 0;
            this.start();
        },
        // 时间转换
        dateFormat() {
            const date = new Date();
            const year = date.getFullYear();
            /* 在日期格式中，月份是从0开始的，因此要加0
             * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
             * */
            const month = date.getMonth() + 1 < 10
                ? `0${date.getMonth() + 1}`
                : date.getMonth() + 1;
            const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
            const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
            const minutes = date.getMinutes() < 10
                ? `0${date.getMinutes()}`
                : date.getMinutes();
            const seconds = date.getSeconds() < 10
                ? `0${date.getSeconds()}`
                : date.getSeconds();
            // 拼接
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        },
        // 试题列表
        findQuestionInfo() {
            return api
                .findQuestionInfo({ sceneId: this.$route.params.id })
                .then((list) => {
                    this.questionsList = list.data;
                    const serialNum = ['一', '二'];
                    this.questionsList.forEach((item, index) => {
                        const item1 = item;
                        item1.serialNum = serialNum[index];
                        item1.questionList.forEach((question) => {
                            const question1 = question;
                            question1.mark = 0;
                            question.optionList.forEach((option) => {
                                const option1 = option;
                                option1.isAnswers = false;
                            });
                        });
                        this.stList = item1.questionList.concat(this.stList);
                    });
                    // console.log(this.stList);
                });
        },
        // 试题列表
        findQuestionPaper() {
            return api
                .findQuestionPaper({ sceneId: this.$route.params.id })
                .then((list) => {
                    this.questionsList = list.data;
                    const serialNum = ['一', '二'];
                    this.questionsList.forEach((item, index) => {
                        const item1 = item;
                        item1.serialNum = serialNum[index];
                        item1.questionList.forEach((question) => {
                            const question1 = question;
                            question1.mark = 0;
                            question.optionList.forEach((option) => {
                                const option1 = option;
                                option1.isAnswers = false;
                            });
                        });
                        this.stList = item1.questionList.concat(this.stList);
                    });
                    // console.log(this.stList);
                });
        },
        // 试卷信息
        findById() {
            return api.findById({ id: this.$route.params.id }).then((list) => {
                this.examDetail = list.data;
                this.maxtime = this.examDetail.duration;
                console.log(this.maxtime);
                this.countDown();
            });
        },
        commitPaper() {
            this.saveData.commitTime = this.dateFormat();
            // answerList: [
            //         {
            //             questionId: '', // 试题id
            //             answer: '', // 用户答案
            //             timeUsed: '', // 耗时，单位毫秒
            //             questionType: '', // 题型
            //             mark: '', // 标记:0 未标记，1 标记
            //         },
            //     ], // 本试卷答题信息列表
            this.questionsList.forEach((item) => {
                const item1 = item;
                item1.questionList.forEach((question) => {
                    if (question.myAnswers !== undefined) {
                        this.saveData.answerList.push({
                            questionId: question.id,
                            answer: question.myAnswers,
                            timeUsed: question.timeUsed,
                            questionType: item1.type,
                            mark: question.mark ? 1 : 0,
                        });
                    }
                });
            });
            this.modal2 = false;
            return api.commitPaper(this.saveData).then((data) => {
                if (data.success) {
                    this.modal2 = false;
                    this.$router.push({
                        name: 'examResult',
                        params: {
                            id: this.saveData.paperId,
                            type: this.saveData.purposeType,
                            // paperId: this.saveData.paperId,
                        },
                    });
                }
            });
        },
        // 交卷
        submitExam() {
            this.modal2 = true;
            let num = 0;
            this.stList.forEach((val) => {
                if (val.result) {
                    num += 1;
                }
            });
            if (this.saveData.purposeType === 1) {
                if (num === this.stList.length) {
                    this.prompt = '您已完成所以试题作答，是否确定立即提交？';
                } else {
                    this.remainingNum = this.stList.length - num;
                    this.prompt = `您还有${this.remainingNum}道题目未进行作答，是否确定立即提交？`;
                }
            } else if (num === this.stList.length) {
                this.prompt = '您已完成所以试题作答，是否确定立即提交？';
            } else {
                this.questionnaire = false;
                this.remainingNum = this.stList.length - num;
                this.prompt = `您还有${this.remainingNum}道题目未进行作答，不能提交？`;
            }
        },
        // 倒计时
        countDown() {
            // 定义函数 此函数名必须与触发事件的函数名一致
            const self = this;
            self.maxtime *= 60;

            this.timer = setInterval(() => {
                if (self.maxtime > 0) {
                    const minutes = Math.floor(self.maxtime / 60);
                    self.minutes = minutes < 10 ? `0${minutes}` : minutes;
                    const seconds = Math.floor(self.maxtime % 60);
                    self.seconds = seconds < 10 ? `0${seconds}` : seconds;
                    self.maxtime -= 1;
                } else {
                    clearInterval(this.timer);
                    this.prompt = '考试时间结束！';
                    this.modal2 = true;
                }
            }, 1000);
        },
    },
};
</script>

<style lang="less" scoped>
@import "../../less/variables.less";

.breadcrumb {
    margin-top: 32px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e7ebf3;
    padding-left: 30px;
}
.exam-detail {
    width: 1140px;
    margin: 14px auto 24px;
    box-sizing: border-box;
    padding: 24px 16px;
    background: @white;
    box-shadow: 0px 0px 20px 0px rgba(43, 51, 59, 0.08);
    border-radius: 6px;
    .exam-top {
        border-bottom: 1px solid rgba(220, 223, 230, 1);
        p {
            color: @textColor2;
            font-size: 14px;
            margin-bottom: 24px;
        }
        h1 {
            font-size: 24px;
            font-weight: 600;
            color: @textColor1;
            margin-bottom: 24px;
        }
    }
    .exam-bottom {
        margin-top: 24px;
        overflow: hidden;
        .exam-left {
            float: left;
            width: 734px;
            .scroll {
                max-height: 1050px;
                overflow-y: auto;
            }
            .test-questions {
                width: 100%;
                .question-type {
                    box-sizing: border-box;
                    padding: 15px;
                    background: #f2f6fc;
                    width: 100%;
                    color: @textColor2;
                    font-size: 14px;
                    border-radius: 6px;
                    .h1 {
                        font-weight: 600;
                        color: @textColor1;
                    }
                }
            }
            .questions {
                margin-top: 24px;
                padding: 24px;
                box-shadow: 0px 0px 8px 0px rgba(43, 51, 59, 0.08);
                border-radius: 6px;
                overflow: hidden;
                .title {
                    font-size: 16px;
                    font-weight: 600;
                    color: @textColor1;
                    margin-bottom: 24px;
                }
                .cpStOption {
                    li {
                        margin-bottom: 16px;
                        .option-text {
                            font-size: 14px;
                            color: @textColor2;
                            font-weight: 400;
                            vertical-align: top;
                            line-height: 24px;
                            display: inline-block;
                            width: 95%;
                            cursor: pointer;
                            &.active {
                                color: @mainColor;
                            }
                        }

                        .option-btn {
                            display: inline-block;
                            width: 14px;
                            height: 14px;
                            background: rgba(255, 255, 255, 1);
                            border: 1px solid rgba(221, 223, 230, 1);
                            border-radius: 50%;
                            margin-right: 10px;
                            margin-top: 5px;
                            vertical-align: top;
                            &.active {
                                background: @mainColor;
                                border: 1px solid @mainColor;
                                text-align: center;
                                line-height: 6px;
                                &::after {
                                    content: "";
                                    width: 4px;
                                    height: 4px;
                                    background: #fff;
                                    border-radius: 50%;
                                    display: inline-block;
                                }
                            }
                        }
                    }
                }
            }
            .mark-btn {
                width: 76px;
                height: 30px;
                box-shadow: 0px 0px 8px 0px rgba(43, 51, 59, 0.08);
                border-radius: 6px;
                border: 1px solid @mainColor;
                margin-top: 16px;
                text-align: center;
                line-height: 30px;
                font-size: 14px;
                color: @mainColor;
                float: right;
                cursor: pointer;
                &.active {
                    background: #e6a23d;
                    border: 1px solid #e6a23d;
                    color: #fff;
                }
            }
        }
        .exam-right {
            float: right;
            width: 354px;
            .exam-time {
                padding: 24px;
                background: #f2f6fc;
                border-radius: 6px;
                margin-bottom: 20px;
                .text {
                    color: @textColor1;
                    font-size: 16px;
                    margin-bottom: 16px;
                }
                .Time {
                    color: @textColor2;
                    font-size: 18px;
                    span {
                        display: inline-block;
                        font-size: 36px;
                        font-weight: 600;
                        color: #fff;
                        background: @blue;
                        margin-right: 12px;
                        border-radius: 6px;
                        width: 48px;
                        height: 48px;
                        text-align: center;
                        vertical-align: bottom;
                        &:nth-child(4) {
                            margin-left: 12px;
                        }
                    }
                }
            }
            .answer-box {
                padding: 24px;
                background: @white;
                box-shadow: 0px 0px 8px 0px rgba(43, 51, 59, 0.08);
                .text {
                    font-weight: 400;
                    color: @textColor1;
                    font-size: 16px;
                    margin-bottom: 16px;
                }
                .answer-mark {
                    span {
                        display: inline-block;
                        vertical-align: bottom;
                        margin-right: 24px;
                        i {
                            display: inline-block;
                            width: 24px;
                            height: 24px;
                            border-radius: 6px;
                            vertical-align: bottom;
                            margin-right: 6px;
                        }
                        &.yida i {
                            background: @mainColor;
                        }
                        &.biaoji i {
                            background: #e6a23d;
                        }
                        &.weida i {
                            border: 2px solid rgba(220, 223, 230, 1);
                        }
                    }
                }
                .answer-num {
                    margin-top: 24px;
                    .pointer {
                        display: inline-block;
                        width: 24px;
                        height: 24px;
                        background: rgba(255, 255, 255, 1);
                        border-radius: 6px;
                        border: 2px solid rgba(220, 223, 230, 1);
                        text-align: center;
                        color: @textColor2;
                        font-size: 14px;
                        font-weight: 600;
                        margin-right: 11px;
                        margin-bottom: 16px;
                        box-sizing: content-box;
                        line-height: 24px;
                        &:nth-child(8n) {
                            margin-right: 0;
                        }

                        &.ydt {
                            background: @mainColor;
                            color: @white;
                            border-color: @mainColor;
                        }
                        &.bjt {
                            background: #e6a23d;
                            color: @white;
                            border-color: #e6a23d;
                        }
                    }
                }
            }
            .submit-btn {
                margin-top: 20px;
                button {
                    width: 100%;
                    height: 40px;
                    background: @mainColor;
                    border-radius: 6px;
                    color: #fff;
                    font-size: 14px;
                    font-weight: 400;
                }
            }
        }
    }
}
.exam-modal {
    .modal-content {
        p {
            font-size: 16px;
            font-weight: 400;
            color: @textColor1;
            line-height: 16px;
            margin-top: 14px;
        }
        img {
            width: 46px;
        }
    }
    .button {
        width: 120px;
        height: 40px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 400;
        line-height: 40px;
    }
    .submit {
        background: @mainColor;
        color: #fff;
    }
    .cancel {
        border: 1px solid @mainColor;
        color: @mainColor;
    }
}
</style>
<style lang="less">
.exam-modal {
    .ivu-modal-header {
        border-bottom: 0 !important;
        p {
            text-align: center;
            font-size: 20px;
            font-weight: 500;
            color: rgba(69, 96, 163, 1);
            letter-spacing: 1px;
        }
    }
    .ivu-modal-footer {
        border-top: 0;
        text-align: center;
        padding-bottom: 18px;
    }
}
</style>
