<template>
    <div class="exam-result-page m-container">
        <div
            v-if="examDetail != ''"
            class="exam-result scroll clearfix"
        >
            <div class="result-left fl">
                <div class="result-top clearfix">
                    <div class="result-score fl">
                        <div class="fl">
                            <h1
                                class="score"
                                :style="
                                    examDetail.score >= examDetail.passingScore
                                        ? 'color:#77DD3F;'
                                        : 'color:#D14242;'
                                "
                            >
                                {{ examDetail.score }}
                            </h1>
                            <img
                                src="../../assets/images/exam/line.png"
                                class="line"
                                alt=""
                            >
                        </div>
                        <div class="fr text">
                            <p
                                :style="
                                    examDetail.score >= examDetail.passingScore
                                        ? 'color:#77DD3F;'
                                        : 'color:#D14242;'
                                "
                            >
                                <span
                                    v-if="
                                        examDetail.score >=
                                            examDetail.passingScore
                                    "
                                >恭喜！您已通过考试</span>
                                <span
                                    v-else
                                ><span class="yh">非常遗憾</span><br>您没有通过考试</span>
                            </p>
                            <p class="score">
                                满分：{{ examDetail.totalScore }}分
                            </p>
                            <p class="score">
                                及格：{{ examDetail.passingScore }}分
                            </p>
                        </div>
                        <img
                            src="../../assets/images/exam/no-through.png"
                            class="through"
                            alt=""
                        >
                    </div>
                    <div class="result-num fl">
                        <Circle
                            :percent="examDetail.rightRate"
                            :size="94"
                            style="vertical-align: middle;"
                            trail-color="#D4D4D4"
                            stroke-color="#00B288"
                        >
                            <span
                                class="demo-Circle-inner"
                            >{{ examDetail.rightRate
                            }}<span class="small">%</span></span>
                        </Circle>
                        <div class="text">
                            <p>正确率：{{ examDetail.rightRate }}</p>
                            <p>答对：{{ examDetail.rightCount }}</p>
                            <p>总题数：{{ examDetail.totalCount }}</p>
                        </div>
                    </div>
                    <div class="result-tab fl">
                        <span
                            v-for="(item, index) in tab"
                            :key="index"
                            class="tabName"
                            :class="{ active: tabIndex == index }"
                            @click="tabClick(index)"
                        >
                            <i :class="{ active: tabIndex == index }" />
                            {{ item }}
                        </span>
                    </div>
                </div>
                <div class="resutl-information">
                    <h1 class="sceneName">
                        {{ examDetail.sceneName }}
                    </h1>
                    <p class="text">
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
                    </p>
                </div>
                <div class="result-content">
                    <div class="option-box scroll">
                        <div
                            v-for="(item, index) in questionsList"
                            :key="index"
                        >
                            <div
                                class="question-type"
                                :class="'question-type' + index"
                            >
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
                            <ul
                                v-for="(question, index1) in item.answerList"
                                :key="index1"
                                class="questions"
                            >
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
                                <div class="option-content">
                                    <li
                                        v-for="(option,
                                                index2) in question.contentItems"
                                        :key="index2"
                                    >
                                        <span
                                            class="option-btn"
                                            :class="{
                                                active:
                                                    question.userAnswer ==
                                                    option.code ||
                                                    question.userAnswer.indexOf(
                                                        option.code
                                                    ) != '-1'
                                            }"
                                        />

                                        <span
                                            class="option-text"
                                            :class="{
                                                active:
                                                    question.userAnswer ==
                                                    option.code ||
                                                    question.userAnswer.indexOf(
                                                        option.code
                                                    ) != '-1'
                                            }"
                                        >{{ option.code }}、{{
                                            option.value
                                        }}</span>
                                    </li>
                                    <div class="icon">
                                        <img
                                            v-if="
                                                question.userAnswer ==
                                                    question.rightAnswer
                                            "
                                            class="correct"
                                            src="../../assets/images/exam/icon-correct.png"
                                            alt=""
                                        >
                                        <img
                                            v-else
                                            class="error"
                                            src="../../assets/images/exam/icon-error.png"
                                            alt=""
                                        >
                                    </div>
                                    <div
                                        class="mark-btn"
                                        :class="{ active: question.mark }"
                                    >
                                        <span v-if="!question.mark">标记</span>
                                        <span v-else>标记</span>
                                    </div>
                                </div>

                                <div class="option-bottom">
                                    <div class="answers">
                                        <p class="title">
                                            正确答案：{{ question.rightAnswer }}
                                        </p>
                                        <p class="text" />
                                    </div>
                                    <div class="analysis">
                                        <p class="title">
                                            答案解析：{{
                                                item.questionList[index1].remark
                                            }}
                                        </p>
                                        <p class="text">
                                            <!-- {{ question.remark }} -->
                                        </p>
                                    </div>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="result-right fr">
                <div class="r-top">
                    <p>
                        <img
                            src="../../assets/images/exam/icon1.png"
                            alt=""
                        >
                        <span>交卷时间：{{ examDetail.commitTime }}</span>
                    </p>
                    <p>
                        <img
                            src="../../assets/images/exam/icon2.png"
                            alt=""
                        >
                        <span>答题用时：{{
                            examDetail.commitTime.split(" ")[0]
                        }}
                            {{ formatSeconds(examDetail.timeUsed) }}</span>
                    </p>
                </div>
                <div class="answer-box">
                    <div class="answer-mark">
                        <span class="correct"> <i /> 正确</span>
                        <span class="error"><i />错误</span>
                        <span class="label"><i />标记</span>
                        <span class="weida"><i />未答</span>
                    </div>
                    <div
                        ref="stCount"
                        class="answer-num"
                    >
                        <div
                            v-for="(mark, index) in questionsList2"
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
                                v-for="(item, index1) in mark.answerList"
                                :key="index1"
                                :class="[
                                    'pointer',
                                    item.rightAnswer == item.userAnswer
                                        ? 'correct-active'
                                        : 'error-active'
                                ]"
                            >
                                <!-- item.mark ? 'mark-active' : '', -->
                                <span v-if="index == 1">
                                    {{
                                        questionsList2[index - 1].questionList
                                            .length +
                                            index1 +
                                            1
                                    }}
                                </span>
                                <span v-else-if="index == 2">
                                    {{
                                        questionsList2[index - 2].questionList
                                            .length +
                                            questionsList2[index - 1]
                                                .questionList.length +
                                            index1 +
                                            1
                                    }}
                                </span>
                                <span v-else>{{ index1 + 1 }}</span>
                                <img
                                    v-if="item.mark"
                                    class="biaoji"
                                    src="../../assets/images/exam/biaoji.png"
                                    alt=""
                                >
                            </a>
                        </div>

                        <!-- @click="goAnchor(&quot;#wdks&quot;+item.id)" -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../../api/exam';

export default {
    data() {
        return {
            tab: ['查看错题', '查看标记题', '查看全部'],
            tabIndex: 2,
            isAnswers: 0,
            paperId: null,
            examDetail: '',
            questionsList: [],
            questionsList2: [],
            filterType: 0,
            purposeType: null,
        };
    },
    created() {
        if (this.$route) {
            this.paperId = this.$route.params.id;
            this.getExamResultDetail();
            // this.getExamResultOverview()
        }
    },
    mounted() {
        const that = this;
        if (window.history && window.history.pushState) {
            window.onpopstate = function () {
                console.log('返回');
                that.$router.push({
                    path: '/exam',
                });
                // if(that.backEvent){

                //     that.backEvent();

                // }
            };
        }
    },
    methods: {
        // 时间转换
        // 补0
        formatBit(val) {
            return val > 9 ? val : `0${val}`;
        },
        // 秒转时分秒，求模很重要，数字的下舍入
        formatSeconds(time) {
            const min = Math.floor(time % 3600);
            const val = `${this.formatBit(
                Math.floor(time / 3600),
            )}:${this.formatBit(Math.floor(min / 60))}:${this.formatBit(
                time % 60,
            )}`;
            return val;
        },
        // 试卷信息
        getExamResultDetail() {
            return api
                .getExamResultDetail({
                    paperId: this.paperId,
                })
                .then((list) => {
                    this.examDetail = list.data;
                    // this.$emit('exam-name', this.examDetail.scene.name);
                    this.questionsList2 = JSON.parse(
                        JSON.stringify(list.data.sceneQuestionInfoList),
                    );
                    this.questionsList = list.data.sceneQuestionInfoList;

                    const serialNum = ['一', '二', '三'];
                    this.questionsList.forEach((item, index) => {
                        const item1 = item;
                        item1.serialNum = serialNum[index];
                        this.questionsList2[index].serialNum = serialNum[index];
                    });
                });
        },
        getExamResultOverview() {
            return api
                .getExamResultOverview({ paperId: this.paperId })
                .then((res) => {
                    console.log(res);
                });
        },
        tabClick(index) {
            this.tabIndex = index;
            this.filterType = index;
            this.questionsList = JSON.parse(
                JSON.stringify(this.questionsList2),
            );
            // console.log(index, 'index-----');
            if (index === 0) {
                this.questionsList.forEach((item) => {
                    const item1 = item;
                    item1.answerList = item1.answerList.filter((item2) => {
                        const item3 = item2;
                        return item3.rightAnswer !== item3.userAnswer;
                    });
                });
            }
            if (index === 1) {
                this.questionsList.forEach((item) => {
                    const item1 = item;
                    item1.answerList = item1.answerList.filter((item2) => {
                        const item3 = item2;
                        return item3.mark === 1;
                    });
                });
            }
            // console.log(this.questionsList, 'questionsList-----');
        },
    },
};
</script>
<style lang="less" scoped>
@import "../../less/variables.less";
.exam-result-page {
    width: 1200px;
    margin: 32px auto;
    .result-left {
        width: 849px;
        .result-top {
            margin-bottom: 32px;
            .result-score {
                width: 308px;
                height: 152px;
                // background: url(../../assets/images/exam/score-bg.png) no-repeat;
                // background-size: 100% 100%;
                box-sizing: border-box;
                padding: 21px 32px;
                background: #fff;
                position: relative;
                border-radius: 6px;
                overflow: hidden;
                .through {
                    position: absolute;
                    bottom: -25px;
                    right: -16px;
                    width: 74px;
                }
                .fl {
                    .score {
                        font-size: 52px;
                        font-family: ArialMT;
                        color: @textColor1;
                        line-height: 42px;
                        margin-left: 19px;
                        margin-top: 16px;
                    }
                }
                .line {
                    width: 110px;
                }
                .text {
                    font-size: 16px;
                    font-family: PingFangSC-Semibold, PingFang SC;
                    font-weight: 600;
                    color: @textColor1;
                    & p:first-child {
                        margin-bottom: 20px;
                    }
                    .yh {
                        font-size: 14px;
                        margin-bottom: 10px;
                    }
                    .score {
                        font-size: 14px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        line-height: 24px;
                    }
                }
            }
            .result-num {
                margin: 0 22px;
                width: 308px;
                height: 152px;
                border-radius: 6px;
                box-sizing: border-box;
                background: #fff;
                padding: 29px 44px;
                .text {
                    display: inline-block;
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #272f55;
                    vertical-align: middle;
                    line-height: 24px;
                    margin-left: 32px;
                }
                .demo-Circle-inner {
                    font-size: 36px;
                    color: #00b288;
                    .small {
                        font-size: 16px;
                    }
                }
            }
            .result-tab {
                width: 188px;
                .tabName {
                    display: inline-block;
                    width: 100%;
                    height: 40px;
                    border-radius: 6px;
                    border: 1px solid #c8c8c8;
                    font-size: 14px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: #71777d;
                    line-height: 40px;
                    text-align: center;
                    cursor: pointer;
                    &:nth-child(2) {
                        margin: 17px 0 15px;
                    }
                    &.active {
                        border: 1px solid #d14646;
                        color: #d14646;
                    }
                }
            }
        }
        .resutl-information {
            width: 100%;
            box-sizing: border-box;
            padding: 24px;
            background: #fff;
            border-radius: 6px;
            margin-bottom: 32px;
            .sceneName {
                font-size: 30px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: @textColor1;
                line-height: 42px;
                margin-bottom: 16px;
            }
            .text {
                span {
                    font-size: 16px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #919191;
                    line-height: 22px;
                    margin-right: 40px;
                }
            }
        }
        .result-content {
            .question-type {
                color: @textColor1;
                font-weight: 600;
                margin-bottom: 16px;
                .h1 {
                    font-size: 24px;
                }
                .small {
                    font-size: 20px;
                }
            }
            .questions {
                border-radius: 6px;
                background: #fff;
                box-sizing: border-box;
                padding: 24px;
                margin-bottom: 16px;
                color: @textColor1;
                .title {
                    font-size: 16px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    line-height: 24px;
                    margin-bottom: 16px;
                }
                .option-content {
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #919191;
                    line-height: 24px;
                    position: relative;
                    .icon {
                        position: absolute;
                        top: 25%;
                        right: 240px;
                    }
                    li {
                        margin-bottom: 16px;
                        .option-btn {
                            display: inline-block;
                            width: 14px;
                            height: 14px;
                            background: rgba(255, 255, 255, 1);
                            border: 1px solid #dddfe6;
                            border-radius: 50%;
                            margin-right: 10px;
                            margin-top: 5px;
                            vertical-align: top;
                            &.active {
                                background: #4a90e2;
                                border: 1px solid #4a90e2;
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
                        position: absolute;
                        bottom: 0;
                        right: 0;

                        &.active {
                            background: #f3b14f;
                            border: 1px solid #f3b14f;
                            color: #fff;
                        }
                    }
                }
                .option-bottom {
                    font-size: 16px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: @primaryred;
                    line-height: 24px;
                    .title {
                        margin-bottom: 8px;
                    }
                    .analysis .title {
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
    .result-right {
        width: 328px;
        background: #fff;
        box-sizing: border-box;
        border-radius: 6px;
        padding: 35px 15px;
        .r-top {
            p {
                margin-bottom: 12px;
            }
            img {
                width: 16px;
                margin-right: 6px;
                vertical-align: middle;
            }
            span {
                display: inline-block;
                vertical-align: middle;
                font-size: 16px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #272f55;
                line-height: 16px;
            }
        }
        .answer-box {
            margin-top: 28px;
            .answer-mark {
                span {
                    display: inline-block;
                    vertical-align: bottom;
                    margin-right: 15px;
                    i {
                        display: inline-block;
                        width: 24px;
                        height: 19px;
                        border-radius: 6px;
                        vertical-align: bottom;
                        margin-right: 4px;
                    }
                    &.correct i {
                        background: #00b288;
                    }
                    &.error i {
                        background: #d14242;
                    }
                    &.label i {
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
                    position: relative;
                    .biaoji {
                        position: absolute;
                        right: 0;
                        top: 0;
                        width: 8px;
                    }
                    &:nth-child(8n) {
                        margin-right: 0;
                    }

                    &.correct-active {
                        background: #00b288;
                        color: @white;
                    }

                    &.error-active {
                        background: #d14242;
                        color: @white;
                    }
                    &.mark-active {
                        background: #f3b14f;
                        color: @white;
                    }
                }
            }
        }
    }
}
</style>
