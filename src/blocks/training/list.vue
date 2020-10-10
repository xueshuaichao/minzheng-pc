<template>
    <div class="training-page">
        <div class="page-top">
            <h3>培训列表</h3>
            <div class="filter-wrap">
                <p>
                    <span>报名状态：</span>
                    <span
                        v-for="item in serachStatus"
                        :key="item.status"
                        :class="{ active: curItem === item }"
                        @click="setFilter(item)"
                    >
                        {{ item.title }}
                    </span>
                </p>
                <div class="input-wrap">
                    <Input
                        v-model="filter.name"
                        placeholder="请输入关键字"
                        suffix="ios-search"
                        icon
                        @on-enter="getNameList"
                        @on-click="getNameList"
                        @on-blur="getNameList"
                    />
                    <!-- <Icon
                        type="ios-search"
                        size="26"
                        :color="'#B4B6C2'"
                        @click="getNameList"
                    /> -->
                </div>
            </div>
        </div>
        <!--列表-->
        <div
            v-if="list.length"
            class="list-wrap"
        >
            <template v-for="item in list">
                <task-card
                    :key="item.id"
                    :itemdetail="item"
                    :from="'list'"
                />
            </template>
        </div>
        <!--暂无数据-->
        <p
            v-else
            class="no-data"
        >
            十分抱歉，您搜索的内容我们暂未收录，您可以尝试搜索其他内容
        </p>
        <!--分页-->
        <Page
            show-total
            :total="total"
            :page-size="16"
            class="page-list"
            @on-change="changePage"
        />
    </div>
</template>
<script>
import api from '../../api/training';
import taskCard from '../../view/components/task-card.vue';

export default {
    name: 'Training',
    components: {
        taskCard,
    },
    data() {
        return {
            serachStatus: [
                {
                    status: 1,
                    title: '全部',
                },
                {
                    status: 2,
                    title: '报名中',
                },
                {
                    status: 3,
                    title: '报名未开始',
                },
                {
                    status: 4,
                    title: '报名已结束',
                },
            ],
            curItem: null,
            total: 20,
            filter: {
                name: '',
                applyStatus: 1,
                queryString: {
                    pageNum: 1,
                    pageSize: 16,
                },
            },
            list: [],
        };
    },
    mounted() {
        [this.curItem] = this.serachStatus;
        this.getList();
    },
    methods: {
        getList() {
            console.log(this.filter, 'getList');
            api.getTaskList(this.filter).then((res) => {
                if (res.success) {
                    this.list = res.data.list;
                    this.total = res.data.total;
                }
            });
        },
        setFilter(item) {
            this.filter.applyStatus = item.status;
            this.filter.queryString.pageNum = 1;
            this.getList();
            this.curItem = item;
        },
        changePage(page) {
            this.filter.queryString.pageNum = page;
            this.getList();
        },
        getNameList() {
            this.filter.queryString.pageNum = 1;
            this.getList();
        },
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
.training-page {
    .page-top {
        background: #ffff;
        padding: 24px;
        box-sizing: border-box;
        margin-bottom: 32px;
        color: #272f55;
        margin-top: 30px;
        h3 {
            font-size: 30px;
            line-height: 42px;
            margin-bottom: 16px;
        }
        .filter-wrap {
            display: flex;
            justify-content: space-between;
            p span {
                display: inline-block;
                margin-right: 32px;
                font-size: 16px;
                padding-bottom: 9px;
                cursor: pointer;
                &.active {
                    color: #d14242;
                    position: relative;
                }
                &.active::after {
                    content: "";
                    display: block;
                    width: 14px;
                    height: 4px;
                    border-radius: 2px;
                    background: #d14242;
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    margin-left: -7px;
                }
            }
            .input-wrap {
                width: 343px;
                height: 45px;
                // border-radius: 26px;
                // border: 1px solid #e6e6e6;
                font-size: 16px;
                display: flex;
                justify-content: space-between;
                input {
                    border: none;
                    outline: none;
                    width: 80%;
                    height: 100%;
                    text-indent: 22px;
                    background: transparent;
                }
            }
        }
    }
    .list-wrap {
        display: flex;
        flex-wrap: wrap;
    }
    .no-data {
        font-size: 18px;
        text-align: center;
    }
    .page-list {
        margin-bottom: 110px;
        margin-top: 58px;
        .ivu-page-prev,
        .ivu-page-next {
            width: 48px !important;
        }
    }
    /deep/.ivu-page-prev,
    /deep/.ivu-page-next {
        width: 48px;
    }
    /deep/.ivu-page-item-active {
        background: #d14242;
    }
}
</style>
