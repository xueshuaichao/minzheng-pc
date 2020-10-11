<template>
    <div class="exam-detail-page m-container">
        <div class="exam-detail clearfix">
            <div class="exam-left fl">
                <div class="exam-top">
                    <p class="notice">
                        <Icon
                            type="ios-alert"
                            size="14"
                            color="#D14242"
                        />
                        <span>考试需知：进入考试后必须在{{
                            examDetail.duration
                        }}分钟内提交试卷，试卷截止后系统将自动交卷</span>
                    </p>
                    <h1>
                        {{ examDetail.name }}
                    </h1>
                    <div class="bottom">
                        <span>考试时间：{{ examDetail.duration }}分钟</span>
                        <span>满分：{{ examDetail.totalScore }}分</span>
                        <span>题数：{{ examDetail.totalCount }} </span>
                        <span>
                            难度：{{
                                examDetail.difficulty == 1
                                    ? "简单"
                                    : examDetail.difficulty == 2
                                        ? "一般"
                                        : "困难"
                            }}
                        </span>
                    </div>
                    <p />
                </div>
                <div class="scroll">
                    <div
                        v-for="(item, index) in questionsList"
                        :key="index"
                        class="list"
                    >
                        <div class="test-questions">
                            <div class="question-type">
                                <span class="h1">
                                    {{ item.serialNum }}、{{
                                        item.type == 1
                                            ? "单选题"
                                            : item.type == 2
                                                ? "多选题"
                                                : "判断题"
                                    }} </span>&nbsp;&nbsp;&nbsp;
                                <span class="small">
                                    共{{ item.count }}小题，每小题{{
                                        item.perMark
                                    }}分，共{{ item.totalMark }}分
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
                                    <span v-if="index == 1">
                                        {{
                                            questionsList[index - 1]
                                                .questionList.length +
                                                index1 +
                                                1
                                        }}
                                    </span>
                                    <span v-else-if="index == 2">
                                        {{
                                            questionsList[index - 2]
                                                .questionList.length +
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
                                            index2) in question.contentItems"
                                    :key="index2"
                                    @click="
                                        handleClickOption(
                                            question,
                                            question.contentItems,
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
                                        {{ option.code }}、{{ option.value }}
                                    </span>
                                </li>
                            </ul>
                            <div
                                class="mark-btn"
                                :class="{ active: question.mark }"
                                @click="markClick(question, index1, item.type)"
                            >
                                <span v-if="!question.mark">标记</span>
                                <span v-else>标记</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="exam-right fr">
                <div class="r-top">
                    <div class="exam-time">
                        <p class="text">
                            倒计时
                        </p>
                        <p class="Time">
                            {{ duration }}
                        </p>
                    </div>
                    <div class="submit-btn">
                        <Button @click="submitExam">
                            立即交卷
                        </Button>
                    </div>
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
                    <div
                        ref="stCount"
                        class="answer-num"
                    >
                        <div
                            v-for="(mark, index) in questionsList"
                            :key="mark.id"
                            class="list"
                        >
                            <h1>
                                {{ mark.serialNum }}、{{
                                    mark.type == 1
                                        ? "单选题"
                                        : mark.type == 2
                                            ? "多选题"
                                            : "判断题"
                                }}
                            </h1>
                            <a
                                v-for="(item, index1) in mark.questionList"
                                :key="index1"
                                :class="[
                                    'pointer',
                                    item.markFlag ? 'bjt' : '',
                                    item.result ? 'ydt' : ''
                                ]"
                            >
                                <span v-if="index == 1">
                                    {{
                                        questionsList[index - 1].questionList
                                            .length +
                                            index1 +
                                            1
                                    }}
                                </span>
                                <span v-else-if="index == 2">
                                    {{
                                        questionsList[index - 2].questionList
                                            .length +
                                            questionsList[index - 1]
                                                .questionList.length +
                                            index1 +
                                            1
                                    }}
                                </span>
                                <span v-else>{{ index1 + 1 }}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal
            v-model="iscode"
            width="640"
            class="exam-modal"
            :closable="false"
            :mask-closable="false"
        >
            <p slot="header">
                请输入验证码
            </p>
            <p class="text">
                为保证本人考试，系统已{{
                    userMobile
                }}手机上发送了验证码，验证正确后可继续考试，验证错误将终止考试。
            </p>
            <div class="from">
                <i-input
                    v-model="vcode"
                    placeholder="请输入验证码"
                    style="width:339px;"
                />
                <span class="seconds">{{ codetime }} s</span>
            </div>
            <div slot="footer">
                <Button
                    class="codesubmit button"
                    @click="codehandleConfirm"
                >
                    确认
                </Button>
            </div>
        </Modal>
        <Modal
            v-model="modal2"
            width="486"
            class="exam-modal"
            :closable="false"
            :mask-closable="false"
        >
            <div>
                <p
                    slot="header"
                    class="header-text"
                >
                    {{ headerText }}
                </p>
                <div
                    style="text-align:center"
                    class="modal-content"
                >
                    <p>{{ prompt }}</p>
                </div>
                <div slot="footer" />
            </div>
            <div slot="footer">
                <div v-if="buttonShow">
                    <Button
                        class="cancel button"
                        @click="modal2 = false"
                    >
                        {{ cancelText }}
                    </Button>
                    <Button
                        v-show="questionnaire"
                        class="submit button"
                        @click="commitPaper()"
                    >
                        {{ submitText }}
                    </Button>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import api from '../../api/exam';
import store from '../../store';
// import { countdown } from '../../utils/helper';
// import userApi from '../../api/user';

export default {
    data() {
        return {
            buttonShow: true,
            prompt: '',
            cancelText: '',
            headerText: '',
            submitText: '',
            IndexNum: '',
            modal2: false,
            isAnswers: 0,
            examDetail: '',
            seconds: 0,
            minutes: 0,
            maxtime: 0,
            codetime: 120,
            time: null,
            secShow: false,
            userMobile: '',
            stList: [], // 题号
            questionsList: [], // 试题列表
            saveData: {
                paperId: '', // 试卷id
                // store.state.user.userInfo.id
                userId: null,
                purposeType: 1, // 用途 1：考试 2：问卷
                commitTime: '', // 提交时间
                answerList: [], // 本试卷答题信息列表
            },
            ms: 0, // 毫秒，记录答题时间
            vcode: null,
            isvcode: false,
            iscode: false,
            time2: null,
            questionnaire: true,
            duration: null,
            iscodetime: 0,
            sms: {
                sending: true,
                seconds: 0,
            },
        };
    },
    created() {
        if (this.$route) {
            this.saveData.paperId = this.$route.params.paperId;
            this.saveData.purposeType = this.$route.params.type;
            this.getScenePaper();
        }
        this.userMobile = store.state.user.userInfo
            ? store.state.user.userInfo.userMobile
            : '';
        // console.log(store.state.user.userInfo.userMobile)
        this.findById();
        // this.start();
    },
    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer);
            clearInterval(this.codetimer);
        }
    },
    methods: {
        // 获取验证码
        verify() {
            const self = this;
            this.codetimer = setInterval(() => {
                if (self.codetime > 0) {
                    self.codetime -= 1;
                    this.$forceUpdate();
                } else {
                    clearInterval(this.codetimer);
                    self.codehandleConfirm();
                }
            }, 1000);
            api.verify({ userMobile: this.userMobile, platformId: 10001 }).then(
                (res) => {
                    if (!res.data) {
                        this.$Message.info(res.message);
                    }
                },
            );
        },
        codehandleConfirm() {
            this.isvcode = false;
            if (this.vcode === null || this.vcode === '') {
                console.log(this.codetime);
                if (this.codetime === 0) {
                    this.$Message.info('验证码未填写，系统将中止考试。');
                    this.isvcode = true;
                    setTimeout(() => {
                        this.iscode = false;
                        this.$router.go(-1);
                    }, 5000);
                } else {
                    this.$Message.info('验证码未填写，请先填写。');
                    this.isvcode = true;
                }

                return;
            }
            api.check({ userMobile: this.userMobile, vcode: this.vcode }).then(
                (res) => {
                    if (res.data) {
                        this.iscode = false;
                        clearInterval(this.codetimer);
                    } else if (this.codetime === 0) {
                        this.iscode = false;
                        this.$Message.info('验证码输入错误，系统将终止考试');
                        this.$router.go(-1);
                        clearInterval(this.codetimer);
                    } else {
                        this.$Message.info('验证码输入错误，请重新填写');
                    }
                },
            );
        },
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
        markClick(question) {
            const question1 = question;
            this.$nextTick(() => {
                question1.mark = !question1.mark;
                question1.markFlag = !question1.markFlag;
            });
        },
        /* eslint-disable */
        // 选择
        handleClickOption(question, optionList, type, item, index, index2) {
            const item1 = item;
            // this.stop();
            const myanswer = []; // 多选题答案
            /* type  1  单选  2 多选 3，判断 */
            if (type === 1 || type === 3) {
                optionList.forEach((item2, index3) => {
                    const item4 = item2;
                    if (index2 === index3) {
                        this.$set(item1, "isAnswers", true);
                        this.$set(question, "myAnswers", item1.code);
                    } else {
                        this.$set(item4, "isAnswers", false);
                    }
                });
                question.result = true;
            } else {
                item1.isAnswers = !item1.isAnswers;
                optionList.forEach(item2 => {
                    if (item2.isAnswers) {
                        myanswer.push(item2.code);
                    }
                });
                this.$set(question, "myAnswers", myanswer.join(","));
                question.result = true;
            }
            // console.log(optionList,'optionList------')
            // if (question.timeUsed === undefined) {
            //     this.$set(question, 'timeUsed', this.ms);
            // }

            // this.ms = 0;
            // this.start();
        },
        // 时间转换
        dateFormat() {
            const date = new Date();
            const year = date.getFullYear();
            /* 在日期格式中，月份是从0开始的，因此要加0
             * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
             * */
            const month =
                date.getMonth() + 1 < 10
                    ? `0${date.getMonth() + 1}`
                    : date.getMonth() + 1;
            const day =
                date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
            const hours =
                date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
            const minutes =
                date.getMinutes() < 10
                    ? `0${date.getMinutes()}`
                    : date.getMinutes();
            const seconds =
                date.getSeconds() < 10
                    ? `0${date.getSeconds()}`
                    : date.getSeconds();
            // 拼接
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        },
        // 试题列表
        getScenePaper() {
            return api
                .getScenePaper({ sceneId: this.$route.params.id })
                .then(list => {
                    this.questionsList = list.data.itemList;
                    const serialNum = ["一", "二", "三"];
                    this.questionsList.forEach((item, index) => {
                        const item1 = item;
                        item1.serialNum = serialNum[index];
                        item1.questionList.forEach(question => {
                            const question1 = question;
                            question1.mark = 0;
                            question.contentItems.forEach(option => {
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
            return api.findById({ id: this.$route.params.id }).then(list => {
                this.examDetail = list.data;
                this.maxtime = this.examDetail.duration;
                console.log(this.maxtime);
                this.countDown();
            });
        },
        commitPaper() {
            this.saveData.commitTime = this.dateFormat();
            this.saveData.answerList = [];
            // answerList: [
            //         {
            //             questionId: '', // 试题id
            //             answer: '', // 用户答案
            //             timeUsed: '', // 耗时，单位毫秒
            //             questionType: '', // 题型
            //             mark: '', // 标记:0 未标记，1 标记
            //         },
            //     ], // 本试卷答题信息列表
            this.questionsList.forEach(item => {
                const item1 = item;
                item1.questionList.forEach(question => {
                    console.log(question.myAnswers);
                    if (question.myAnswers !== undefined) {
                        this.saveData.answerList.push({
                            questionId: question.id,
                            answer: question.myAnswers,
                            // timeUsed: question.timeUsed,
                            questionType: item1.type,
                            mark: question.mark ? 1 : 0
                        });
                    }
                });
            });
            this.modal2 = false;
            return api.commitPaper(this.saveData).then(data => {
                if (data.success) {
                    this.modal2 = false;
                    if (this.examtype) {
                        this.$router.push({
                            name: "examUltimate",
                            params: {
                                id: this.saveData.paperId
                                // type: this.saveData.purposeType,
                                // paperId: this.saveData.paperId,
                            }
                        });
                    } else {
                        this.$router.push({
                            name: "examResult",
                            params: {
                                id: this.saveData.paperId
                                // type: this.saveData.purposeType,
                                // paperId: this.saveData.paperId,
                            }
                        });
                    }
                }
            });
        },
        // 交卷
        submitExam() {
            this.modal2 = true;
            let num = 0;
            this.questionsList.forEach(val => {
                val.questionList.forEach(val2 => {
                    if (val2.result) {
                        num += 1;
                    }
                });
            });
            if (num === this.stList.length) {
                this.headerText = "是否确认交卷？";
                this.prompt = "提交后不能撤回";
                this.cancelText = "取消";
                this.submitText = "提交";
            } else {
                this.remainingNum = this.stList.length - num;
                this.headerText = "确认交卷吗？";
                this.prompt = `还有${this.remainingNum}道题目未作答`;
                this.cancelText = "继续答题";
                this.submitText = "坚持提交";
            }
        },
        // 倒计时
        countDown() {
            // 定义函数 此函数名必须与触发事件的函数名一致
            const self = this;
            self.maxtime *= 60;

            this.timer = setInterval(() => {
                if (self.maxtime > 0) {
                    const hours = Math.floor(self.maxtime / 60 / 60);
                    const minutes = Math.floor((self.maxtime / 60) % 60);
                    const seconds = Math.floor(self.maxtime % 60);
                    const hours1 = hours < 10 ? `0${hours}` : hours;
                    const minutes1 = minutes < 10 ? `0${minutes}` : minutes;
                    const seconds1 = seconds < 10 ? `0${seconds}` : seconds;
                    this.duration = `${hours1}:${minutes1}:${seconds1}`;
                    self.maxtime -= 1;
                    this.buttonShow = true;
                    if (this.$route.query.examType) {
                        self.iscodetime += 1;
                        if (self.iscodetime === 10) {
                            this.iscode = true;
                            this.verify();
                            // this.codetimebtn();
                        }
                    }
                } else {
                    clearInterval(this.timer);
                    this.buttonShow = false;
                    this.prompt = "已到答题时间，系统将为您提交试卷";
                    setTimeout(() => {
                        this.commitPaper();
                    }, 3000);
                    this.modal2 = true;
                }
            }, 1000);
        }
    }
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
    width: 1200px;
    margin: 32px auto;
    box-sizing: border-box;
    .exam-left {
        .exam-top {
            width: 849px;
            box-sizing: border-box;
            padding: 24px;
            background: #fff;
            margin-bottom: 40px;
            .notice {
                color: @primaryred;
                font-size: 16px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                line-height: 22px;
                margin-bottom: 16px;
                span {
                    display: inline-block;
                    vertical-align: middle;
                    margin-left: 5px;
                }
            }
            h1 {
                font-size: 30px;
                font-weight: 600;
                line-height: 42px;
                color: @textColor1;
                margin-bottom: 16px;
            }
            .bottom {
                span {
                    display: inline-block;
                    margin-right: 40px;
                    font-size: 16px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #919191;
                    line-height: 22px;
                }
            }
        }
        .scroll {
            // max-height: 1050px;
            // overflow-y: auto;
            .list {
                margin-bottom: 32px;
            }
        }
        .test-questions {
            width: 100%;
            .question-type {
                color: @textColor1;
                font-weight: 600;
                .h1 {
                    font-size: 24px;
                }
                .small {
                    font-size: 20px;
                }
            }
        }
        .questions {
            margin-top: 16px;
            padding: 24px;
            border-radius: 6px;
            background: #fff;
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
            height: 32px;
            border-radius: 6px;
            border: 1px solid #f2f2f1;
            margin-top: 16px;
            background: #f2f2f1;
            text-align: center;
            line-height: 32px;
            font-size: 16px;
            color: #919191;
            float: right;
            cursor: pointer;
            &.active {
                background: #f3b14f;
                border: 1px solid #f3b14f;
                color: #fff;
            }
        }
    }
    .exam-right {
        width: 328px;
        .r-top {
            background: #fff;
            border-radius: 6px;
            padding: 28px 32px 24px;
            margin-bottom: 23px;
        }
        .exam-time {
            .text {
                color: @textColor1;
                font-size: 20px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                line-height: 28px;
                margin-bottom: 12px;
            }
            .Time {
                color: @textColor1;
                font-size: 40px;
                font-family: SFNSDisplay;
                line-height: 36px;
                text-align: center;
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
                        height: 19px;
                        border-radius: 6px;
                        vertical-align: bottom;
                        margin-right: 6px;
                    }
                    &.yida i {
                        background: #4a90e2;
                    }
                    &.biaoji i {
                        background: #f3b14f;
                    }
                    &.weida i {
                        background: #f2f2f1;
                    }
                }
            }
            .answer-num {
                margin-top: 24px;
                .list {
                    margin-bottom: 20px;
                    h1 {
                        font-size: 16px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: @textColor1;
                        line-height: 16px;
                        margin-bottom: 12px;
                    }
                }
                .pointer {
                    display: inline-block;
                    width: 24px;
                    height: 19px;
                    background: #f2f2f1;
                    border-radius: 6px;
                    text-align: center;
                    color: @textColor2;
                    font-size: 14px;
                    font-weight: 600;
                    margin-right: 18px;
                    margin-bottom: 13px;
                    box-sizing: content-box;
                    line-height: 19px;
                    &:nth-child(8n) {
                        margin-right: 0;
                    }

                    &.ydt {
                        background: #4a90e2;
                        color: @white;
                    }
                    &.bjt {
                        background: #f3b14f;
                        color: @white;
                    }
                }
            }
        }
        .submit-btn {
            margin-top: 29px;
            text-align: center;
            button {
                width: 198px;
                height: 40px;
                background: @primaryred;
                border-radius: 6px;
                color: #fff;
                font-size: 14px;
                font-weight: 400;
            }
        }
    }
}
.exam-modal {
    .header-text {
        font-size: 24px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: @textColor1;
        text-align: center;
        line-height: 33px;
        margin-top: 16px;
    }
    .modal-content {
        p {
            font-size: 16px;
            font-weight: 400;
            color: @textColor1;
            line-height: 16px;
            margin-top: 32px;
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
        border: 1px solid #d14242;
        color: #d14242;
    }
    .cancel {
        background: #d14242;
        color: #fff;
    }
}
</style>
<style lang="less">
@import "../../less/variables.less";
.exam-modal {
    .ivu-modal-header {
        border-bottom: 0 !important;
        padding: 32px 0;
        p {
            text-align: center;
            font-size: 24px;
            font-weight: 500;
            color: @textColor1;
            letter-spacing: 1px;
            height: 33px;
            line-height: 33px;
        }
    }
    .ivu-modal-body {
        .text {
            width: 481px;
            font-size: 18px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: @textColor1;
            line-height: 28px;
            margin: 0 auto;
            margin-bottom: 32px;
        }
        .from {
            text-align: center;
            .seconds {
                display: inline-block;
                vertical-align: middle;
                line-height: 40px;
                font-size: 18px;
                width: 110px;
                height: 40px;
                background: rgba(224, 224, 224, 0.4);
                border-radius: 6px;
                margin-left: 16px;
            }
        }
    }
    .ivu-modal-footer {
        border-top: 0;
        text-align: center;
        padding-bottom: 18px;
        .codesubmit {
            width: 198px;
            background: #d14242;
            font-size: 20px;
            color: #fff;
            font-weight: 600;
        }
    }
}
</style>
