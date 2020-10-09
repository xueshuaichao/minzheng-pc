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
                        培训时间：{{ detail.trainEndTime }} ~
                        {{ detail.trainEndTime }}
                    </p>
                    <p class="time">
                        报名时间：{{ detail.trainEndTime }} ~
                        {{ detail.trainEndTime }}
                    </p>
                    <p class="infos infos-top">
                        <span>总课时：{{ detail.allClass }}</span>
                        <span>已报名：{{ detail.applyCount }}</span>
                    </p>
                    <p class="infos">
                        <span>阶段数：{{ stageDtos.length }}</span>
                        <span>已学完：{{ detail.timeSchedule }}%</span>
                    </p>
                    <button
                        class="join"
                        :class="{ disable: disabled }"
                        @click="changeStaus"
                    >
                        {{ detail.applyStatus ? "取消报名" : "立即报名" }}
                    </button>
                </div>
            </div>
            <div class="training-content">
                <p class="ctx-title">
                    培训内容
                </p>
                <div
                    v-for="(item, index) in stageDtos"
                    :key="index"
                    class="item"
                >
                    <p class="item-name">
                        <span>
                            {{ item.stageName }}({{
                                item.taskItems.length
                            }}课时)
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
                        @click="jumpRouter(subItem)"
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
                            v-if="subItem.taskPaperId && subItem.scene"
                            class="exam-info"
                        >
                            <p>
                                <span>考试时间：</span>
                                <span class="red">{{
                                    subItem.scene.duration
                                }}</span>
                                <span class="red">分钟</span>
                            </p>
                            <p>
                                <span>题数：</span>
                                <span class="red">{{
                                    subItem.scene.totalCount
                                }}</span>
                                <span class="red">题</span>
                            </p>
                            <p>
                                <span>满分：</span>
                                <span class="red">{{
                                    subItem.scene.totalScore
                                }}</span>
                            </p>
                            <p>
                                <span>难度：</span>
                                <span class="red">{{
                                    difficults[subItem.scene.difficulty - 1]
                                }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <tipModel
            :show="showModel"
            :scene-id="sceneId"
            @closeing="closeing"
        />
    </div>
</template>
<script>
import api from '../../api/training';
import learningsApi from '../../api/learnings';
import tipModel from '../../view/components/tip-model.vue';

export default {
    components: {
        tipModel,
    },
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
                timeSchedule: 0,
                allClass: 0,
                taskSumUser: 0,
                scene: null,
            },
            stageDtos: [],
            difficults: ['简单', '一般', '困难'],
            getDefaultImg: require('../../assets/images/home/bg1.png'),
            taskId: 8,
            lackInfo: false,
            disabled: 0, // 0报名中，1.报名未开始 2报名已结束
            showModel: false,
            selItem: null,
            sceneId: 0,
        };
    },
    created() {
        if (this.$route.query.id !== undefined) {
            this.taskId = Number(this.$route.query.id);
        }
        this.getDetail();
        this.getUserInfo();
    },
    methods: {
        closeing(arg) {
            this.showModel = false;
            if (arg) {
                // 跳转试卷。就是去考试的了
                this.$router.push({
                    path: `exam/detail/${this.selItem.scene.id}?examtype=${this.selItem.scene.examType}`,
                });
            }
        },
        jumpRouter(item) {
            if (item.taskCourseId) {
                this.$router.push({
                    name: 'courseDetail',
                    query: {
                        id: item.taskCourseId,
                    },
                });
            } else {
                this.showModel = true;
                this.sceneId = item.scene.id;
            }
            this.selItem = item;
        },
        getUserInfo() {
            learningsApi.userInfo({}).then((res) => {
                if (
                    res.data
                    && (!res.data.organizations
                        || !res.data.phone
                        || !res.data.name)
                ) {
                    this.lackInfo = true;
                }
            });
        },
        getDetail() {
            api.getTrainingDetail({ taskId: this.taskId }).then(
                (res) => {
                    this.loading = true;
                    if (res.success) {
                        const time = new Date().getTime();
                        if (time < res.data.applyStartTime) {
                            this.disabled = 1;
                        }
                        if (time > res.data.trainStartTime) {
                            this.disabled = 2;
                        }
                        const trainEndTime = new Date(
                            res.data.trainEndTime,
                        ).toLocaleString();
                        const trainStartTime = new Date(
                            res.data.trainStartTime,
                        ).toLocaleString();
                        const applyEndTime = new Date(
                            res.data.applyEndTime,
                        ).toLocaleString();
                        const applyStartTime = new Date(
                            res.data.applyStartTime,
                        ).toLocaleString();
                        let allClass = 0;
                        if (res.data.stageDtos) {
                            res.data.stageDtos.forEach((d) => {
                                allClass += d.taskItems.length;
                            });
                        }
                        this.detail = {
                            ...this.detail,
                            ...res.data,
                            applyStartTime,
                            applyEndTime,
                            trainStartTime,
                            trainEndTime,
                            allClass,
                        };
                        this.stageDtos = res.data.stageDtos;
                    }
                },
                (err) => {
                    console.log(err);
                    this.loading = true;
                },
            );
        },
        changeStaus() {
            if (this.disabled) {
                const msg = this.disabled === 1 ? '报名未开始' : '报名已结束';
                this.$Message.warning({
                    content: msg,
                    duration: 5,
                });
            } else if (this.lackInfo) {
                // 补全信息，并返回报名页面
                this.setModel();
            } else {
                api.changeTaskApply({
                    taskId: this.taskId,
                    isApply: this.detail.applyStatus ? 0 : 1,
                });
            }
        },
        setModel() {
            this.$Modal.confirm({
                title: '',
                content: '<p><Icon type="ios-warning" />请补全个人信息</p>',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    this.$router.push({
                        path: '/learnings1',
                        query: {
                            from: 'taskDetail',
                        },
                    });
                },
                onCancel: () => {},
            });
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
                &.disable {
                    background: #ccc;
                    color: #888;
                }
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
