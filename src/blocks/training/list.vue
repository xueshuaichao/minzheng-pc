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
                    <input
                        v-model="filter.keyword"
                        placeholder="请输入关键字"
                    >
                    <Icon
                        type="ios-search"
                        size="26"
                        :color="'#B4B6C2'"
                    />
                </div>
            </div>
        </div>
        <!--列表-->
        <div class="list-wrap">
            <div
                v-for="item in 16"
                :key="item"
                class="item"
            >
                <img
                    src="../../assets/images/home/bg1.png"
                    class="cover"
                >
                <div class="btm">
                    <p class="name">
                        数据库实据库实据库实据库实战
                    </p>
                    <p class="time">
                        报名时间: 2020-06-01
                    </p>
                    <p class="time">
                        培训时间：2019-06-01 15:00-18:00
                    </p>
                    <img src="../../assets/images/training/hasjoin.png">
                </div>
            </div>
        </div>
        <!--分页-->
        <Page
            v-if="total > filter.pageSize"
            show-total
            :total="total"
            :page-size="16"
            class="page-list"
            @change="changePage"
        />
    </div>
</template>
<script>
export default {
    name: 'Training',
    data() {
        return {
            serachStatus: [
                {
                    status: 0,
                    title: '全部',
                },
                {
                    status: 1,
                    title: '报名中',
                },
                {
                    status: 2,
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
                keyword: '',
                pageSize: 1,
                pageNum: 10,
            },
        };
    },
    mounted() {
        [this.curItem] = this.serachStatus;
    },
    methods: {
        setFilter(item) {
            this.curItem = item;
        },
        changePage(page) {
            this.filter.pageNum = page;
            console.log(page, 'page--');
        },
    },
};
</script>
<style scoped lang="less">
.training-page {
    .page-top {
        background: #f3f3f3;
        padding: 24px;
        box-sizing: border-box;
        margin-bottom: 32px;
        color: #272f55;
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
                border-radius: 26px;
                border: 1px solid #e6e6e6;
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
                .ivu-icon {
                    line-height: 45px;
                    margin-right: 12px;
                }
            }
        }
    }
    .list-wrap {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .item {
            border-radius: 6px;
            border: 1px solid #e6e6eb;
            margin-bottom: 23px;
            width: 284px;
        }

        .cover {
            width: 100%;
            height: 160px;
            border-radius: 6px 6px 0 0;
        }
        .btm {
            padding: 18px 13px 20px;
            position: relative;
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
        margin-bottom: 20px;
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
