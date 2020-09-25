<template>
    <div class="training-deatil-page">
        <template v-if="loading">
            <div class="page-top">
                <img
                    class="cover"
                    :src="detail.iconUrl || getDefaultImg"
                >
                <div class="info-wrap">
                    <h4>
                        {{ detail.name }}
                    </h4>
                    <p class="time">
                        培训时间：2020-06-10 13:00 ~ 2020-06-10 18:00
                    </p>
                    <p class="time">
                        报名时间：2020-06-10 12:40 ~ 2020-06-10-13:00
                    </p>
                    <p class="infos infos-top">
                        <span>总课时：2课时</span>
                        <span>已报名：3</span>
                    </p>
                    <p class="infos">
                        <span>阶段数：5</span>
                        <span>已学完：80%</span>
                    </p>
                    <button class="join">
                        {{ detail.status ? "已报名" : "立即报名" }}
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
                            {{ item.stageName }}
                        </span>
                        <Icon
                            type="ios-arrow-down"
                            size="26"
                            :color="'#eee'"
                        />
                    </p>
                    <div
                        v-for="(subItem, idx) in item.taskItems"
                        :key="idx"
                        class="sub-item"
                    >
                        <div class="sub-title-wrap">
                            <img
                                src="../../assets/images/training/paper.png"
                                class="paper"
                            >
                            <p class="sub-title">
                                {{ subItem.label }}
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
        </template>
    </div>
</template>
<script>
import api from '../../api/training';
// api在浏览器上是无法打开的。
export default {
    data() {
        return {
            percent: 10,
            loading: false,
            detail: {
                iconUrl: '',
                name: '任务',
                status: 0,
                trainStartTime: 0,
                trainEndTime: 0,
                applyStartTime: 0,
                applyEndTime: 0,
                taskFinishRate: 0,
                stageDtos: [],
            },
            list: [
                {
                    stageName: '1.1 大数据概论',
                    taskItems: [
                        {
                            type: 1,
                            label: '1.1 大数据的重新定义',
                        },
                    ],
                },
                {
                    stageName: '1.1 大数据概论',
                    taskItems: [
                        {
                            type: 3,
                            label: '2.3 大数据的重新定义',
                            info: {
                                time: 60,
                                num: 20,
                                max: 100,
                                difficut: '难',
                                count: 0,
                            },
                        },
                        {
                            type: 2,
                            label: '2.2 大数据实操1',
                        },
                    ],
                },
            ],
            getDefaultImg: require('../../assets/images/home/bg1.png'),
        };
    },
    created() {
        this.getDetail();
    },
    methods: {
        getDetail() {
            api.getTrainingDetail({ taskId: 8 }).then(
                (res) => {
                    this.loading = true;
                    if (res.success) {
                        this.detail = { ...this.detail, ...res.data };
                        this.userTaskDto = res.data.userTaskDto;
                    }
                },
                (res) => {
                    console.log(res);
                    this.loading = true;
                },
            );
        },
    },
};
</script>
<style scoped lang="less">
.training-deatil-page {
    .page-top {
        display: flex;
        background: #fff;
        padding: 30px;
        margin-bottom: 30px;
        margin-top: 30px;
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
            .infos {
                color: #575765;
                display: flex;
                margin-bottom: 10px;
                span {
                    display: block;
                    margin-right: 21px;
                }
            }
            .infos-top {
                margin-top: 105px;
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
        }
    }
    .training-content {
        font-size: 15px;
        background: #fff;
        min-height: 800px;
        margin-bottom: 100px;
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
            .paper {
                width: 12px;
                height: 15px;
                margin-top: 7px;
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
