<template>
    <div class="home-train-block">
        <div class="content">
            <h4>
                精品课程
            </h4>
            <p class="txt">
                最新精品课程第一时间学习
            </p>
            <div class="list-wrap clearfix">
                <div class="list-wrap-left fl">
                    <div
                        class="list-wrap-left-content"
                        @click="goDetail(list1.id)"
                    >
                        <img
                            :src="list1.picUrl || getDefaultImg"
                            alt=""
                        >
                        <div class="li-content">
                            <p class="li-content-title">
                                {{ list1.name }}
                            </p>
                            <div class="li-content-info">
                                <span>{{
                                    list1.signUpCount
                                        ? list1.signUpCount
                                        : 0
                                }}
                                    人已学习</span>
                                <span>课时：{{
                                    list1.classHour ? list1.classHour : 0
                                }}小时</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="list-wrap-right fl">
                    <ul>
                        <li
                            v-for="(item, index) in list"
                            :key="index"
                            @click="goDetail(item.id)"
                        >
                            <img
                                :src="item.picUrl || getDefaultImg"
                                alt=""
                            >
                            <div class="li-content">
                                <p class="li-content-title">
                                    {{ item.name }}
                                </p>
                                <div class="li-content-info">
                                    <span>{{
                                        item.signUpCount
                                            ? item.signUpCount
                                            : 0
                                    }}
                                        人已学习</span>
                                    <span>课时：{{
                                        item.classHour ? item.classHour : 0
                                    }}小时</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
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
import api from '../../api/course';

export default {
    components: {},
    data() {
        return {
            getDefaultImg: require('../../assets/images/home/bg1.png'),
            list1: {},
            list: [],
            listparam: {
                pageNum: 1,
                pageSize: 7,
                categoryId: null,
                type: 0,
            },
        };
    },
    created() {
        this.getList();
    },
    methods: {
        //  暂时用课程列表的数据， 精品课接口参数有问题
        getList() {
            api.findBoutiqueCourseList({ pagSize: '7' }).then((res) => {
                if (res.success) {
                    this.list = res.data.slice(1, 7);
                    [this.list1] = res.data.slice(0, 1);
                }
            });
        },
        jumpMore() {
            this.$router.push({
                path: '/course',
            });
        },
        goDetail(id) {
            this.$router.push({
                name: 'courseDetail',
                query: {
                    id,
                },
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
            cursor: pointer;
            &-left {
                width: 487px;
                height: 373px;
                background: #ffffff;
                border-radius: 6px;
                border: 1px solid #e6e6eb;
                &-content {
                    img {
                        width: 487px;
                        height: 274px;
                        border-radius: 6px 6px 0px 0px;
                    }
                    .li-content {
                        height: 99px;
                        padding: 24px 19px;
                        .li-content-title {
                            font-size: 15px;
                            color: #272f55;
                            font-weight: 550;
                            line-height: 21px;
                            padding-bottom: 6px;
                        }
                        .li-content-info {
                            font-size: 12px;
                            color: #737386;
                            span {
                                padding-right: 46px;
                            }
                        }
                    }
                }
            }
            &-right {
                width: 682px;
                margin-left: 30px;
                ul {
                    li {
                        display: inline-block;
                        margin-right: 21px;
                        width: 213px;
                        height: 181px;
                        background: #ffffff;
                        border-radius: 6px;
                        border: 1px solid #e6e6eb;
                        margin-bottom: 14px;
                        img {
                            width: 100%;
                            height: 119px;
                        }
                        &:nth-child(3n) {
                            margin-right: 0px;
                        }
                        .li-content {
                            padding: 0px 13px;
                            .li-content-title {
                                font-size: 15px;
                                color: #272f55;
                                font-weight: 550;
                                line-height: 21px;
                                padding-bottom: 6px;
                            }
                            .li-content-info {
                                font-size: 12px;
                                color: #737386;
                                span {
                                    display: inline-block;
                                    width: 50%;
                                    &:first-child {
                                        text-align: left;
                                    }
                                    &:last-child {
                                        text-align: right;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        .btn {
            cursor: pointer;
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
