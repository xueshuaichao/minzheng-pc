<template>
    <div class="exam-result-page m-container">
        <div
            v-if="examDetail != ''"
            class="exam-result scroll"
        >
            <div class="exam-top">
                <p v-if="examDetail.categoryNames">
                    {{ examDetail.categoryNames.join("-") }}
                </p>
                <h1>
                    {{ examDetail.scene.name }}
                </h1>
                <p v-if="questionsList.length > 0">
                    考试时间：{{
                        examDetail.scene.duration
                    }}分钟&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span v-if="purposeType == 1">
                        满分：{{
                            examDetail.scene.totalScore
                        }}分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 及格分：{{
                            examDetail.scene.passingScore
                        }}分
                    </span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 题数：{{
                        questionsList[0].count + questionsList.length > 2
                            ? questionsList[1].count
                            : 0
                    }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 用途：
                    <span v-if="examDetail.scene.purposeType == 1">考试</span>
                    <span v-else>问卷</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span v-if="purposeType == 1">
                        难度：
                        <Rate
                            v-model="examDetail.scene.difficulty"
                            disabled
                        />
                    </span>
                </p>
                <div
                    v-if="purposeType == 1"
                    class="score"
                >
                    <h1>{{ examDetail.paper.score }}</h1>
                    <img
                        class="score-line"
                        src="../../assets/images/exam/score-line.png"
                        alt=""
                    >
                    <p
                        :style="
                            examDetail.paper.score >=
                                examDetail.scene.passingScore
                                ? 'color:#77DD3F;'
                                : 'color:#F66C6D;'
                        "
                    >
                        {{
                            examDetail.paper.score >=
                                examDetail.scene.passingScore
                                ? "恭喜！您已通过考试"
                                : "非常遗憾，您没有通过考试"
                        }}
                    </p>
                </div>
            </div>
            <div class="result-tab">
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
            <div class="result-content">
                <div class="option-box scroll">
                    <div
                        v-for="(item, index) in questionsList"
                        :key="index"
                    >
                        <h1
                            class="question-type"
                            :class="'question-type' + index"
                        >
                            {{ item.serialNum }}、{{ item.name }}
                        </h1>
                        <ul
                            v-for="(question, index1) in item.questionList"
                            :key="index1"
                            class="questions"
                        >
                            <h1 class="title">
                                <span v-if="index > 0">
                                    {{
                                        questionsList[index - 1].questionList
                                            .length +
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
                                            index2) in question.optionList"
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
                                <div v-if="purposeType == 1">
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
                            </div>

                            <div
                                v-if="purposeType == 1"
                                class="option-bottom"
                            >
                                <div class="answers">
                                    <p class="title">
                                        正确答案：
                                    </p>
                                    <p class="text">
                                        {{ question.rightAnswer }}
                                    </p>
                                </div>
                                <div class="analysis">
                                    <p class="title">
                                        答案解析：
                                    </p>
                                    <p class="text">
                                        {{ question.remark }}
                                    </p>
                                </div>
                            </div>
                        </ul>
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
            tab: ['全部试题', '只看错题', '只看标记'],
            tabIndex: 0,
            isAnswers: 0,
            paperId: 0,
            examDetail: '',
            questionsList: [],
            filterType: 0,
            purposeType: null,
        };
    },
    created() {
        if (this.$route) {
            this.paperId = this.$route.params.id;
            this.purposeType = this.$route.params.type;
            if (this.purposeType === 1) {
                this.showPaperDetail();
            } else {
                this.showQuestionPaper();
            }
        }
    },
    methods: {
        // 试卷信息
        showPaperDetail() {
            return api
                .showPaperDetail({
                    paperId: this.paperId,
                    filterType: this.filterType,
                })
                .then((list) => {
                    this.examDetail = list.data;
                    this.$emit('exam-name', this.examDetail.scene.name);

                    this.questionsList = list.data.paperQuestionSettings;
                    const serialNum = ['一', '二'];
                    this.questionsList.forEach((item, index) => {
                        const item1 = item;
                        item1.serialNum = serialNum[index];
                    });
                });
        },
        // 问卷
        showQuestionPaper() {
            return api
                .showQuestionPaper({
                    paperId: this.paperId,
                    filterType: this.filterType,
                })
                .then((list) => {
                    this.examDetail = list.data;
                    this.$emit('exam-name', this.examDetail.scene.name);

                    this.questionsList = list.data.paperQuestionSettings;
                    const serialNum = ['一', '二'];
                    this.questionsList.forEach((item, index) => {
                        const item1 = item;
                        item1.serialNum = serialNum[index];
                    });
                });
        },
        tabClick(index) {
            this.tabIndex = index;
            this.filterType = index;
            this.showPaperDetail();
        },
    },
};
</script>

<style lang="less" scoped>
@import "../../less/variables.less";
body {
    overflow: ;
}
.exam-result {
    width: 1140px;
    margin: 14px auto 24px;
    box-sizing: border-box;
    padding: 24px 16px;
    background: @white;
    box-shadow: 0px 0px 20px 0px rgba(43, 51, 59, 0.08);
    border-radius: 6px;
    .exam-top {
        position: relative;
        overflow: hidden;
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
        .score {
            position: absolute;
            top: 2px;
            right: 0;
            text-align: right;
            h1 {
                font-size: 58px;
                font-family: ArialMT;
                line-height: 41px;
            }
            img {
                width: 78px;
            }
            p {
                font-size: 14px;
                font-weight: 500;
                color: rgba(246, 108, 109, 1);
            }
        }
    }
    .result-tab {
        width: 100%;
        height: 44px;
        line-height: 44px;
        background-color: #f2f6fc;
        box-sizing: border-box;
        padding: 0 16px;
        span {
            font-size: 16px;
            font-weight: 400;
            color: @textColor1;
            margin-right: 24px;
            cursor: pointer;
            &.active {
                color: @mainColor;
            }
        }
        i {
            display: inline-block;
            width: 14px;
            height: 14px;
            border: 1px solid rgba(221, 223, 230, 1);
            border-radius: 50%;
            vertical-align: middle;
            margin-right: 10px;
            &.active {
                background: @mainColor;
                border: 1px solid @mainColor;
                text-align: center;
                line-height: 4px;
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
    .result-content {
        margin-top: 24px;
        .scroll {
            max-height: 1000px;
            overflow-y: auto;
        }
        .option-content {
            position: relative;
            img {
                position: absolute;
                bottom: 0;
                right: 0;
                &.correct {
                    width: 68px;
                }
                &.error {
                    width: 42px;
                }
            }
        }
        .question-type,
        .title {
            font-size: 16px;
            font-weight: 600;
            color: @textColor1;
            padding-left: 16px;
            margin-bottom: 24px;
        }
        .question-type1 {
            margin-top: 24px;
        }
        .questions {
            list-style: none;
            padding: 24px 24px 24px 16px;
            box-shadow: 0px 0px 8px 0px rgba(43, 51, 59, 0.08);
            border-radius: 6px;
            margin-bottom: 24px;
            li {
                margin-bottom: 16px;
            }
            .title {
                padding-left: 0;
            }
            .option-text {
                display: inline-block;
                width: 97%;
                vertical-align: top;
                font-size: 14px;
                line-height: 24px;
                color: @textColor2;
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
                &.active {
                    background: @mainColor;
                    border: 1px solid @mainColor;
                    text-align: center;
                    line-height: 7px;
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
            .option-bottom {
                margin-top: 8px;
                padding-top: 24px;
                border-top: 1px solid #dcdfe6;
                .answers {
                    margin-bottom: 24px;
                }
                .title {
                    margin-bottom: 16px;
                    color: @textColor2;
                    font-size: 16px;
                    font-weight: 600;
                }
                .text {
                    font-size: 14px;
                    line-height: 24px;
                    font-weight: 400;
                }
            }
        }
    }
}
</style>
