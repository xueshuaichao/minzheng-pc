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
            <div
                v-for="(item, index) in list"
                :key="index"
                class="item"
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
                        v-if="item.userTaskDto"
                        src="../../assets/images/training/hasjoin.png"
                    >
                </div>
            </div>
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
// 周日需要让后段把时间作为必填 // 09.25 十一之后后台需要添加。
// status为数组的时候，400 bad request [1,2,3]

export default {
    name: 'Training',
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
            getDefaultImg: require('../../assets/images/home/bg1.png'),
        };
    },
    mounted() {
        [this.curItem] = this.serachStatus;
        this.getList();
    },
    methods: {
        getList() {
            api.getTaskList(this.filter).then((res) => {
                console.log(res, 'getTaskList');
                if (res.success) {
                    // let list = res.data.list.map((d) => {
                    //     d.applyEndTime = d.applyEndTime.slice(0, 16);
                    //     d.applyStartTime = d.applyStartTime.slice(0, 16);
                    //     d.trainEndTime = d.trainEndTime.slice(0, 16);
                    //     d.trainStartTime = d.trainStartTime.slice(0, 16);
                    //     return d;
                    // })
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
        .item {
            border-radius: 6px;
            border: 1px solid #e6e6eb;
            margin-bottom: 23px;
            width: 284px;
            margin: 0 10px 23px;
            &:nth-child(4n + 1) {
                margin-left: 0;
            }
            &:nth-child(4n) {
                margin-right: 0;
            }
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
