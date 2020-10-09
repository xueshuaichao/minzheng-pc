<template>
    <div
        class="task-card"
        @click="jumpDetail(item)"
    >
        <img
            :src="item.iconUrl || getDefaultImg"
            class="cover"
        >
        <div class="btm">
            <p class="name">
                {{ item.name }}
            </p>
            <template v-if="item.status">
                <p class="time">
                    培训开始时间：{{ item.trainStartTime }}
                </p>
                <p class="time">
                    培训结束时间：{{ item.trainEndTime }}
                </p>
            </template>
            <template v-else>
                <p class="time">
                    报名开始时间：{{ item.applyStartTime }}
                </p>
                <p class="time">
                    报名结束时间：{{ item.applyEndTime }}
                </p>
            </template>
            <img
                v-if="item.userTaskDto && !this.from"
                src="../../assets/images/training/hasjoin.png"
            >
        </div>
    </div>
</template>
<script>
export default {
    props: {
        itemdetail: {
            type: Object,
            default: () => {},
        },
        from: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            getDefaultImg: require('../../assets/images/home/bg1.png'),
            item: this.itemdetail,
        };
    },
    created() {
        const trainEndTime = new Date(
            this.itemdetail.trainEndTime,
        ).toLocaleString();
        const trainStartTime = new Date(
            this.itemdetail.trainStartTime,
        ).toLocaleString();
        const applyEndTime = new Date(
            this.itemdetail.applyEndTime,
        ).toLocaleString();
        const applyStartTime = new Date(
            this.itemdetail.applyStartTime,
        ).toLocaleString();
        this.item = {
            ...this.itemdetail,
            trainEndTime,
            trainStartTime,
            applyEndTime,
            applyStartTime,
        };
    },
    methods: {
        jumpDetail(item) {
            this.$router.push({
                path: '/trainingDetail',
                query: {
                    id: item.id,
                },
            });
        },
    },
};
</script>
<style scoped lang="less">
.task-card {
    border-radius: 6px;
    border: 1px solid #e6e6eb;
    margin-bottom: 23px;
    width: 284px;
    margin: 0 10px 23px;
    cursor: pointer;
    &:nth-child(4n + 1) {
        margin-left: 0;
    }
    &:nth-child(4n) {
        margin-right: 0;
    }

    .cover {
        width: 100%;
        height: 160px;
        border-radius: 6px 6px 0 0;
    }
    .btm {
        padding: 18px 13px 14px;
        position: relative;
        background: #fff;
        border-radius: 0 0 6px 6px;
        .name {
            color: #272f55;
            font-size: 18px;
            line-height: 25px;
            margin-bottom: 6px;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .time {
            font-size: 12px;
            color: #737386;
            line-height: 17px;
            margin-bottom: 6px;
        }
        img {
            width: 50px;
            height: 36px;
            position: absolute;
            bottom: 20px;
            right: 13px;
        }
    }
}
</style>
