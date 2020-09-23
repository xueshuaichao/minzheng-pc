<template>
    <div class="complete">
        <div class="flex-row">
            <div class="item flex-row">
                <div class="duration-info">
                    <p class="flex-row">
                        <i />今天学习时长
                        <span>{{ statisticData.todayLearnTime }}</span>
                    </p>
                    <p class="flex-row">
                        <i style="background: #F3B14F;" />上周学习时长
                        <span>{{ statisticData.lastWeekLearnTime }}</span>
                    </p>
                    <p class="flex-row">
                        <i style="background: #4A90E2;" />上月学习时长
                        <span>{{ statisticData.lastMonthLearnTime }}</span>
                    </p>
                    <p class="flex-row">
                        <img
                            src="@/assets/images/learnings/clock.png"
                        >累计时长
                        <span>{{ statisticData.totalLearnTime }}</span>
                    </p>
                </div>
            </div>
            <div class="item flex-row card2">
                <div class="first-line">
                    {{ statisticData.score }}
                </div>
                <div class="second-line">
                    学分
                </div>
            </div>
            <div class="item flex-row card3">
                <div class="first-line">
                    {{ statisticData.taskProgress }}
                </div>
                <div class="second-line">
                    任务进度
                </div>
                <div class="third-line">
                    <Progress
                        :percent="25"
                        stroke-color="#00B288"
                        :stroke-width="5"
                    />
                </div>
            </div>
            <div class="item flex-row card4">
                <div class="first-line">
                    {{ statisticData.electiveProgress }}
                </div>
                <div class="second-line">
                    选学进度
                </div>
                <div class="third-line">
                    <Progress
                        :percent="25"
                        stroke-color="#00B288"
                        :stroke-width="5"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            statisticData: {},
        };
    },
    created() {
        this.findUserCourseHour();
    },
    methods: {
        findUserCourseHour() {
            this.statisticData = {
                todayLearnTime: 99, // 今日学长
                lastWeekLearnTime: 150, // 上周学长
                lastMonthLearnTime: 251, // 上月学长
                totalLearnTime: 100, // 总学长
                score: 10.2, // 学分
                taskProgress: 30, // 任务进度
                electiveProgress: 40, // 选学进度
            };
            // return learnsApi.statisticsLearn().then((data) => {
            //     if (data.success) {
            //         this.userCourseHour = data.data;
            //     }
            // });
        },
    },
};
</script>

<style lang="less" scoped>
@import "./index.less";
.complete {
    display: block;
    width: 100%;
    padding: 0;
    flex-shrink: 0;
    margin-right: 24px;
    margin-bottom: 32px;
    .item {
        flex: 1;
        // width: 220px;
        height: 106px;
        margin-right: 20px;
        background: rgba(248, 249, 250, 1);
        border-radius: 2px;
        padding-left: 28px;
        background-size: 100% 100%;
        position: relative;
        .duration-info {
            color: @textcolor60;
            span {
                color: @textcolor100;
            }
            i {
                width: 5px;
                height: 5px;
                background: #d0021b;
                border-radius: 5px;
            }
            img {
                width: 16px;
                height: 16px;
            }
        }
        .first-line {
            position: absolute;
            color: @textcolor100;
            font-size: 24px;
            left: 32px;
            top: 15px;
        }
        .second-line {
            position: absolute;
            color: @textcolor60;
            font-size: 22px;
            left: 32px;
            top: 52px;
        }
        .third-line {
            width: 100px;
            left: 100px;
            top: 20px;
            position: absolute;
        }
    }
    .card2 {
        background-image: url("../../assets/images/learnings/card2.png");
    }
    .card3 {
        background-image: url("../../assets/images/learnings/card3.png");
    }
    .card4 {
        background-image: url("../../assets/images/learnings/card4.png");
    }
}
</style>
