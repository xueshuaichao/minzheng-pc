<template>
    <div class="main-container">
        <i-breadcrumb
            class="g-breadcrumb"
            separator=">"
        >
            <i-breadcrumb-item to="/">
                首页
            </i-breadcrumb-item>
            <i-breadcrumb-item>
                教育培训
            </i-breadcrumb-item>
            <!-- <i-breadcrumb-item>
                培训课程
            </i-breadcrumb-item> -->
        </i-breadcrumb>
        <div class="search-bar">
            <div class="search-input">
                <i-input
                    v-model="listparam.course.key"
                    placeholder="请输入关键字"
                />
                <i-button
                    type="primary"
                    @click="handleSeach()"
                >
                    搜索
                </i-button>
            </div>
            <div class="search-condition">
                <div class="search-condition-part">
                    <ul class="condition-btn">
                        <li
                            class="btnLi"
                            :class="{ active: conditionid === null }"
                            @click="setcondition('', null)"
                        >
                            全部
                        </li>
                        <li
                            v-for="category in categories"
                            :key="category.id"
                            class="btnLi"
                            :class="{ active: category.id == conditionid }"
                            @click="setcondition('category', category.id)"
                        >
                            {{ category.name }}
                        </li>
                    </ul>
                </div>
                <div
                    v-if="secondCategory.length > 0"
                    class="search-condition-part"
                >
                    <ul class="condition-btn">
                        <li>
                            分类
                        </li>
                        <li
                            v-for="child in secondCategory"
                            :key="child.id"
                            class="btnLi"
                            :class="{ active: child.id == conditionid }"
                            @click="
                                setcondition('second', child.id, child.parentId)
                            "
                        >
                            {{ child.name }}
                        </li>
                    </ul>
                </div>
                <div class="search-condition-part">
                    <ul class="condition-btn">
                        <li>
                            课程类型
                        </li>
                        <li
                            v-for="(item, index) in courseType"
                            :key="index"
                            class="btnLi"
                            :class="{ active: index == typeconditionid }"
                            @click="setcondition('type', index)"
                        >
                            {{ item }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div
            v-if="courseList.length > 0"
            class="resource-wrapper"
        >
            <ul>
                <li
                    v-for="(item, index) in courseList"
                    :key="index"
                    class="resource-item"
                    @click="courseDetail(item.id, item.courseTypeName)"
                >
                    <div class="picture-wrapper">
                        <img
                            :src="item.courseCoverUrl"
                            alt=""
                        >
                        <div>
                            <!-- 15: 04 -->
                        </div>
                    </div>
                    <div class="info">
                        <h5 class="title">
                            {{ item.name }}
                        </h5>
                        <p>
                            <span
                                v-if="item.courseType === 0"
                                class="compulsory"
                            >
                                必修
                            </span>
                            <span
                                v-if="item.courseType === 1"
                                class="elective"
                            >
                                选修
                            </span>
                            <span
                                v-if="item.courseType === 2"
                                class="free"
                            >
                                免费
                            </span>
                            <span v-if="item.courseType !== 2">
                                {{ item.courseHours }}学时
                            </span>
                        </p>
                    </div>
                </li>
            </ul>
            <Page
                :total="total"
                :current="listparam.pageNum"
                :page-size="listparam.pageSize"
                prev-text="上一页"
                next-text="下一页"
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

export default {
    name: 'Course',
    data() {
        return {
            total: 0,
            listparam: {
                pageNum: 1,
                pageSize: 9,
                course: {
                    firstCategoryId: null,
                    secondCategoryId: null,
                    courseType: null,
                    key: '',
                },
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
        this.getStaticInfo();
    },
    methods: {
        // 获取二级分类
        getChildren(id) {
            return api.getChildren(id).then((res) => {
                const { data } = res;
                this.secondCategory = data;
            });
        },
        courseDetail(id, name) {
            this.$router.push({
                name: 'courseDetail',
                params: {
                    id,
                    name,
                },
            });
        },
        handleSeach() {
            this.getCourselist();
        },
        setcondition(type, id, parentId) {
            if (type === 'type') {
                this.listparam.course.courseType = id;
                this.listparam.course.firstCategoryId = null;
                this.listparam.course.secondCategoryId = null;
                this.typeconditionid = id;
                this.conditionid = '';
            } else if (type === 'category') {
                this.listparam.course.courseType = '';
                this.listparam.course.firstCategoryId = id;
                this.listparam.course.secondCategoryId = null;
                this.conditionid = id;
                this.typeconditionid = null;
                this.getChildren(this.listparam.course.firstCategoryId);
            } else if (type === 'second') {
                this.listparam.course.secondCategoryId = id;
                this.listparam.course.firstCategoryId = parentId;
                this.listparam.course.courseType = null;
                this.conditionid = id;
                this.typeconditionid = null;
            } else {
                this.listparam.course.firstCategoryId = null;
                this.listparam.course.courseType = null;
                this.conditionid = null;
                this.typeconditionid = null;
            }
            this.getCourselist();
        },
        getCourselist() {
            return api
                .getCourselist(this.listparam, this.listparam.course)
                .then((res) => {
                    const { data } = res;
                    if (res.success === true) {
                        this.courseList = data.list;
                        this.total = data.total;
                    }
                });
        },
        getStaticInfo() {
            return api.getCourseStaticInfo().then((res) => {
                const { data } = res;
                if (res.success === true) {
                    this.categories = data.category;
                    this.courseType = data.courseType;
                }
            });
        },
    },
};
</script>
