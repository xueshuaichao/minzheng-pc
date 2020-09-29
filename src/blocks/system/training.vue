<template>
    <div class="home-train-block">
        <div class="content">
            <h4>
                培训任务
            </h4>
            <p class="txt">
                随时随地线上学习，满足教育教学需求
            </p>
            <div class="list-wrap">
                <template v-for="(item, index) in list">
                    <task-card
                        :key="index"
                        :itemdetail="item"
                        :from="'home'"
                    />
                </template>
            </div>
            <button
                class="btn"
                @click="jumpMore"
            >
                查看更多课程 >
            </button>
        </div>
    </div>
</template>
<script>
import api from '../../api/training';
import taskCard from '../../view/components/task-card.vue';

export default {
    components: {
        taskCard,
    },
    data() {
        return {
            list: [],
            filter: {
                queryString: {
                    pageNum: 1,
                    pageSize: 8,
                },
            },
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            api.getTaskList(this.filter).then((res) => {
                if (res.success) {
                    this.list = res.data.list;
                    this.total = res.data.total;
                }
            });
        },
        jumpMore() {
            this.$router.push({
                path: '/training',
            });
        },
    },
};
</script>
<style scoped lang="less">
.home-train-block {
    background: #fff;
    padding: 60px 0;
    .content {
        width: 1200px;
        margin: 0 auto;
        h4 {
            color: #272f55;
            font-size: 30px;
            line-height: 42px;
            margin-bottom: 14px;
            text-align: center;
        }
        .txt {
            text-align: center;
            color: #a7adbb;
            font-size: 16px;
            line-height: 22px;
            margin-bottom: 68px;
        }
        .list-wrap {
            display: flex;
            flex-wrap: wrap;
        }
        .btn {
            width: 243px;
            height: 54px;
            background: #d14242;
            border-radius: 27px;
            margin: 55px auto 20px;
            text-align: center;
            font-size: 17px;
            font-weight: 500;
            color: #ffffff;
            line-height: 24px;
            border: none;
            outline: none;
            display: block;
        }
    }
}
</style>
