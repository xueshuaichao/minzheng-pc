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
                        @on-enter="getNameList"
                        @on-click="getNameList"
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
        <div class="list-wrap">
            <template v-for="(item, index) in list">
                <task-card
                    :key="index"
                    :itemdetail="item"
                />
            </template>
        </div>
        <!--分页-->
        <Page
            v-if="total > filter.queryString.pageSize"
            show-total
            :total="total"
            :page-size="16"
            class="page-list"
            @change="changePage"
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
                    status: null,
                    title: '全部',
                },
                {
                    status: 2,
                    title: '报名中',
                },
                {
                    status: 1,
                    title: '报名未开始',
                },
                {
                    status: 3,
                    title: '报名已结束',
                },
            ],
            curItem: null,
            total: 20,
            filter: {
                name: '',
                status: null,
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
        // api.getEXcle();
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
        setFilter(item) {
            this.filter.status = item.status;
            this.filter.pageNum = 1;
            this.getList();
            this.curItem = item;
        },
        changePage(page) {
            this.filter.pageNum = page;
            this.getList();
        },
        getNameList() {
            this.filter.pageNum = 1;
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
