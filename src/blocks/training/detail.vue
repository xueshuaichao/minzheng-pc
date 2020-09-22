<template>
    <div class="training-deatil-page">
        <div class="page-top">
            <img
                class="cover"
                src="../../assets/images/home/bg1.png"
            >
            <div class="info-wrap">
                <h4>
                    大数据清洗全阶课程
                </h4>
                <p class="type">
                    分类：软件研发
                </p>
                <div class="difficult">
                    课程难度：初阶
                </div>
                <p class="time">
                    培训时间：2020-06-10 13:00 ~ 2020-06-10 18:00
                </p>
                <p class="time">
                    报名时间：2020-06-10 12:40 ~ 2020-06-10-13:00
                </p>
                <p class="infos">
                    <span>课时：2课时</span>
                    <span>学分：3</span>
                </p>
                <div class="progress-wrap">
                    <p>
                        已学完：
                    </p>

                    <Progress
                        :percent="percent"
                        style="width: 200px"
                        hide-info
                    />
                    <p>10%</p>
                </div>
                <button class="join">
                    加入选学
                </button>
            </div>
        </div>
        <div class="training-content">
            <p class="ctx-title">
                培训内容
            </p>
            <div
                v-for="(item, index) in list"
                :key="index"
                class="item"
            >
                <p class="item-name">
                    <span>
                        {{ item.title }}
                    </span>
                    <Icon
                        type="ios-arrow-down"
                        size="26"
                        :color="'#eee'"
                    />
                </p>
                <div
                    v-for="(subItem, idx) in item.children"
                    :key="idx"
                    class="sub-item"
                >
                    <div class="sub-title-wrap">
                        <img
                            src="../../assets/images/training/play.png"
                            class="play"
                        >
                        <p class="sub-title">
                            {{ subItem.title }}
                        </p>
                    </div>

                    <div
                        v-if="subItem.type === 3"
                        class="exam-info"
                    >
                        <p>
                            <span>考试时间：</span>
                            <span class="red">60</span>
                            <span class="red">分钟</span>
                        </p>
                        <p>
                            <span>题数：</span>
                            <span class="red">60</span>
                            <span class="red">题</span>
                        </p>
                        <p>
                            <span>满分：</span>
                            <span class="red">60</span>
                        </p>
                        <p>
                            <span>难度：</span>
                            <span class="red">简单</span>
                        </p>
                        <p>
                            <span>剩余考试次数：</span>
                            <span class="red">0</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            percent: 10,
            list: [
                {
                    title: '1.1 大数据概论',
                    children: [
                        {
                            type: 1,
                            title: '1.1 大数据的重新定义',
                        },
                    ],
                },
                {
                    title: '1.1 大数据概论',
                    children: [
                        {
                            type: 3,
                            title: '2.3 大数据的重新定义',
                            info: {
                                time: 60,
                                num: 20,
                                max: 100,
                                difficut: '难',
                                count: 0,
                            },
                        },
                        {
                            type: 1,
                            title: '2.1 大数据的重新定义',
                        },
                        {
                            type: 2,
                            title: '2.2 大数据实操1',
                        },
                    ],
                },
            ],
        };
    },
    methods: {},
};
</script>
<style scoped lang="less">
.training-deatil-page {
    .page-top {
        display: flex;
        // background: #f3f3f3;
        padding: 30px;
        margin-bottom: 30px;
        .cover {
            margin-right: 42px;
            width: 663px;
            height: 373px;
        }
        .info-wrap {
            font-size: 15px;
            h4 {
                font-size: 26px;
                color: #272f55;
                line-height: 37px;
                margin-bottom: 9px;
                padding-top: 25px;
            }
            .time {
                font-size: 14px;
                line-height: 20px;
                color: #9b9b9b;
                margin-bottom: 6px;
            }
            .type {
                color: #9b9b9b;
                line-height: 21px;
                margin-bottom: 17px;
            }
            .difficult {
                padding: 0 15px;
                background: #f9e4e4;
                line-height: 22px;
                color: #d14242;
                font-size: 14px;
                display: inline-block;
                border-radius: 15px;
                margin-bottom: 19px;
            }
            .infos {
                margin-top: 35px;
                color: #575765;
                display: flex;
                margin-bottom: 13px;
                span {
                    display: block;
                    margin-right: 21px;
                }
            }
            .join {
                padding: 0 28px;
                background: #d14242;
                color: #fff;
                font-size: 14px;
                line-height: 37px;
                border-radius: 19px;
                height: 37px;
                outline: none;
                border: none;
            }
            .progress-wrap {
                display: flex;
                margin-bottom: 31px;
                p {
                    margin-right: 2px;
                }
                .ivu-progress {
                    margin-right: 10px;
                    padding-top: 1px;
                }
                /deep/.ivu-progress-bg {
                    background: #d14242;
                }
            }
        }
    }
    .training-content {
        font-size: 15px;
        .ctx-title {
            border-bottom: 1px solid #f7f7f9;
            padding-left: 38px;
            line-height: 46px;
            position: relative;
            &::before {
                position: absolute;
                content: "";
                width: 68px;
                height: 2px;
                background: #d14242;
                left: 36px;
                bottom: 0;
            }
        }
        .item {
            width: 740px;
            margin-left: 20px;
            box-sizing: border-box;
            .ivu-icon {
                margin-top: 24px;
            }
            .item-name {
                display: flex;
                justify-content: space-between;
                padding: 0 30px 0 10px;
                line-height: 54px;
                color: #58586b;
                font-size: 17px;
                font-weight: 500;
                border-bottom: 1px solid #f0f0f2;
                margin-bottom: 20px;
                border-top: 1px solid #f0f0f2;
            }
            &:first-of-type {
                .item-name {
                    border-top: none;
                }
            }
        }

        .sub-item {
            width: 600px;
            margin-left: 40px;
            background: #f7f7f7;
            margin-bottom: 10px;
            padding: 8px 13px;
            &:last-child {
                margin-bottom: 20px;
            }
            .sub-title-wrap {
                display: flex;
            }
            .sub-title {
                color: #58586b;
                font-size: 15px;
                line-height: 30px;
            }
            .play {
                width: 19px;
                height: 19px;
                margin-top: 5px;
                margin-right: 10px;
            }
            .exam-info {
                display: flex;
                padding-left: 40px;
                line-height: 17px;
                p {
                    margin-right: 20px;
                    font-size: 12px;
                    .red {
                        color: #d55959;
                    }
                }
            }
        }
    }
}
</style>
