<template>
    <div class="exam-ultimate-page m-container">
        <h1 class="title">
            考试结果
        </h1>
        <div
            v-if="examDetail != ''"
            class="exam-result scroll clearfix"
        >
            <div class="result-left">
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
                </div>
            </div>
            <div class="btn-container">
                <Button
                    class="button"
                    @click="showModel = true"
                >
                    申请重考
                </Button>
                <p
                    v-if="trainEndTime > time"
                    class="tip"
                >
                    任务结束之后才能查看试卷详情
                </p>
                <p
                    v-else
                    class="tip2 tip"
                    @click="resultBtn"
                >
                    查看试卷详情
                </p>
            </div>
        </div>
        <tipModel
            :show="showModel"
            :scene-id="sceneId"
            @closeing="closeing"
        />
    </div>
</template>

<script>
import api from '../../api/exam';
import tipModel from '../components/tip-model.vue';

export default {
    components: {
        tipModel,
    },
    data() {
        return {
            tabIndex: 0,
            isAnswers: 0,
            paperId: null,
            examDetail: '',
            questionsList: [],
            filterType: 0,
            purposeType: null,
            showModel: false,
            selItem: null,
            sceneId: 0,
            trainEndTime: '',
            time: new Date(),
        };
    },
    created() {
        if (this.$route) {
            this.paperId = this.$route.params.id;
            this.trainEndTime = new Date(this.$route.query.trainEndTime);
            this.getExamResultOverview();
        }
    },
    methods: {
        resultBtn() {
            this.$router.push({
                name: 'examResult',
                params: {
                    id: this.paperId,
                    // type: this.saveData.purposeType,
                    // paperId: this.saveData.paperId,
                },
            });
        },
        closeing(arg) {
            this.showModel = false;
            if (arg) {
                const params = {
                    sceneId: this.examDetail.sceneId,
                    businessId: 1, //
                    businessType: 1,
                };
                api.joinScene(params).then((data) => {
                    this.$router.push({
                        name: 'examDetail',
                        params: {
                            id: this.examDetail.sceneId,
                            paperId: data.data,
                        },
                        query: {
                            examType: this.$route.query.examType,
                        },
                    });
                });
            }
        },
        // 试卷信息
        getExamResultOverview() {
            return api
                .getExamResultOverview({ paperId: this.paperId })
                .then((res) => {
                    console.log(res);
                    this.examDetail = res.data;
                });
        },
    },
};
</script>
<style lang="less" scoped>
@import "../../less/variables.less";
.exam-ultimate-page {
    width: 1200px;
    margin: 17px auto;
    background: #fff;
    box-sizing: border-box;
    padding: 28px 24px;
    .title {
        font-size: 30px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: @textColor1;
        line-height: 42px;
        margin-bottom: 27px;
    }
    .result-left {
        width: 849px;
        .result-top {
            margin-bottom: 32px;
            .result-score {
                width: 308px;
                height: 152px;
                box-shadow: 0px 5px 17px 0px rgba(0, 0, 0, 0.1);
                box-sizing: border-box;
                padding: 21px 32px;
                background: #fff;
                position: relative;
                margin-left: 84px;
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
                box-shadow: 0px 5px 17px 0px rgba(0, 0, 0, 0.1);
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
        }
    }
    .btn-container {
        text-align: center;
        margin-bottom: 144px;
        .button {
            margin-top: 100px;
            width: 198px;
            height: 40px;
            background: #d14242;
            border-radius: 6px;
            color: #fff;
            font-size: 20px;
        }
        .tip {
            font-size: 18px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #d14242;
            line-height: 28px;
            margin-top: 16px;
        }
        .tip2 {
            color: #4a90e2;
            cursor: pointer;
        }
    }
}
</style>
