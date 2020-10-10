<template>
    <div class="home-train-block">
        <div class="content">
            <h4>
                热门分类
            </h4>
            <p class="txt">
                热门分类指引，丰富最常用的知识
            </p>
            <div class="list-wrap clearfix">
                <ul class="img">
                    <li
                        v-for="(item, index) in imglist"
                        :key="index"
                    >
                        <img
                            :src="item.url"
                            alt=""
                        >
                    </li>
                </ul>
                <ul class="name">
                    <li
                        v-for="(item, index) in list"
                        :key="index"
                        @click="goDetail(item)"
                    >
                        {{ item.categoryName }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import api from '../../api/course';
/* eslint-disable */
export default {
    components: {},
    data() {
        return {
            list1: {},
            list: [],
            imglist: [
                { url: require("../../assets/images/course/book@2x.png") },
                { url: require("../../assets/images/course/computer@2x.png") },
                { url: require("../../assets/images/course/pen@2x.png") },
                { url: require("../../assets/images/course/books@2x.png") },
                { url: require("../../assets/images/course/book1@2x.png") }
            ],
            listparam: {
                pageNum: 1,
                pageSize: 7,
                categoryId: null,
                type: 0
            }
        };
    },
    created() {
        this.getList();
    },
    methods: {
        //  暂时用课程列表的数据， 精品课接口参数有问题
        getList() {
            api.getHotCategoryList({ pageSize: "5" }).then(res => {
                if (res.success) {
                    this.list = res.data;
                    console.log(this.list);
                    // [this.list1] = res.data.slice(0, 1);
                }
            });
        },
        jumpMore() {
            this.$router.push({
                path: "/course"
            });
        },
        goDetail(item) {
            console.log(item);
            let data = null;
            item.categoryList.find(val => {
                if (val.id === item.categoryId) {
                    data = val;
                }
            });
            this.$router.push({
                name: "course",
                query: {
                    parentId: data.parentId,
                    id: data.id
                }
            });
        }
    }
};
</script>
<style scoped lang="less">
.home-train-block {
    background: #f7f7f9;
    padding: 60px 0 84px;
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
            .img {
                li {
                    img {
                        width: 180px;
                        height: 180px;
                    }
                    margin-right: 75px;
                    display: inline-block;
                    &:last-child {
                        margin-right: 0px;
                    }
                }
            }
            .name {
                cursor: pointer;
                padding-top: 15px;
                li {
                    width: 180px;
                    text-align: center;
                    margin-right: 75px;
                    font-size: 21px;
                    color: #272f55;
                    font-weight: 550;
                    display: inline-block;
                    &:last-child {
                        margin-right: 0px;
                    }
                }
            }
        }
    }
}
</style>
