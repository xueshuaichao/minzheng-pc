<template>
    <div class="main-container">
        <div class="search-bar">
            <div class="search-condition">
                <div class="search-condition-part clearfix">
                    <span class="classfiy">课程分类：</span>
                    <ul class="condition-btn">
                        <li
                            class="btnLi"
                            :class="{ active: conditionid === null }"
                            @click="setcondition()"
                        >
                            全部
                        </li>
                        <li
                            v-for="(category, index) in categories"
                            :key="index"
                            class="btnLi"
                            :class="{ active: category.id == conditionid }"
                            @click="setcondition(category.id, index)"
                        >
                            {{ category.name }}
                        </li>
                    </ul>
                </div>
                <div class="search-condition-part">
                    <span class="classfiy">子类：</span>
                    <ul class="condition-btn">
                        <li
                            class="btnLi"
                            :class="{ active: conditionid === null }"
                            @click="setcondition()"
                        >
                            全部
                        </li>
                        <li
                            v-for="child in secondCategory"
                            :key="child.id"
                            class="btnLi"
                            :class="{ active: child.id == conditionid }"
                            @click="setcondition(child.id)"
                        >
                            {{ child.name }}
                        </li>
                    </ul>
                </div>
                <div class="search-condition-type">
                    <span
                        v-for="(sort, index) in sortList"
                        :key="index"
                        :class="sortType === sort.id ? 'typeactive' : ''"
                        class="classtype"
                        @click="changeSort(sort.id)"
                    >{{ sort.name }}</span>
                </div>
            </div>
        </div>
        <div
            v-if="courseList.length > 0"
            class="resource-wrapper"
        >
            <ul class="resource-wrapper-ul">
                <li
                    v-for="(item, index) in courseList"
                    :key="index"
                    class="resource-item"
                    @click="courseDetail(item.id, item.courseTypeName)"
                >
                    <div class="picture-wrapper">
                        <img
                            :src="item.picUrl"
                            alt=""
                        >
                        <!-- <div>

                        </div> -->
                    </div>
                    <div class="info clearfix">
                        <h5 class="title fl">
                            {{ item.name }}
                        </h5>
                        <p class="fr">
                            <span class="baoming">
                                <img
                                    src="../../assets/images/course/people@2x.png"
                                    alt=""
                                >
                                已报名
                            </span>
                        </p>
                    </div>
                </li>
            </ul>
            <page
                :total="total"
                :pagesize="listparam.pageSize"
                :pagenum="listparam.pageNum"
                :curr-current="listparam.pageNum"
                @changepage="changepage"
            />
        </div>
        <div
            v-else
            class="noData"
        >
            <p>十分抱歉，您搜索的内容我们暂未收录，您可以尝试搜索其他内容</p>
        </div>
    </div>
</template>
<script>
import './index.less';
import api from '../../api/course';
import Page from './components/page.vue';

export default {
    name: 'Course',
    components: {
        Page,
    },
    data() {
        return {
            total: 0,
            // currentpage: 1,
            sortList: [
                {
                    id: 0,
                    name: '综合排序',
                },
                {
                    id: 1,
                    name: '热门课程',
                },
                {
                    id: 2,
                    name: '最新课程',
                },
            ],
            sortType: 0,
            listparam: {
                pageNum: 1,
                pageSize: 16,
                categoryId: null,
                type: 0,
            },
            secondCategory: [], // 二级分类
            typeconditionid: null,
            conditionid: null,
            courseType: [],
            categories: [],
            courseList: [],
        };
    },
    mounted() {
        if (this.$route.query.cate) {
            this.listparam.course.firstCategoryId = this.$route.query.cate;
            this.conditionid = this.$route.query.cate;
        }
        this.getCourselist();

        this.getCourseCategory();
    },
    methods: {
        changepage(page) {
            console.log(page);
            this.listparam.pageNum = page;
            this.getCourselist();
        },
        changeSort(id) {
            this.sortType = id;
            this.listparam.type = id;
            this.getCourselist();
        },
        // 获取二级分类
        getChildren(id) {
            return api.getChildren({ categoryId: id }).then((res) => {
                const { data } = res;
                this.secondCategory = data;
            });
        },
        courseDetail(id) {
            this.$router.push({
                name: 'courseDetail',
                query: {
                    id,
                },
            });
        },
        handleSeach() {
            this.getCourselist();
        },
        setcondition(id, index) {
            console.log(index);
            if (index !== undefined) {
                // this.secondCategory = this.categories[index].children;
                this.getChildren(id);
            }
            this.listparam.categoryId = id;
            this.getCourselist();
        },
        getCourselist() {
            return api.getCourselist(this.listparam).then((res) => {
                const { data } = res;
                if (res.success === true) {
                    this.courseList = data.list;
                    this.total = data.total;
                    console.log(this.total);
                }
            });
        },
        getCourseCategory() {
            return api.getCourseCategory().then((res) => {
                const { data } = res;
                if (res.success === true) {
                    this.categories = data;
                    // this.courseType = data.courseType;
                }
            });
        },
    },
};
</script>
