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
                <div class="search-condition-part">
                    <span class="classfiy">子类：</span>
                    <ul class="condition-btn">
                        <li
                            class="btnLi"
                            :class="{ active: conditionid === null }"
                            @click="setcondition('', null)"
                        >
                            全部
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
                <div class="search-condition-type">
                    <Dropdown
                        trigger="click"
                        style="margin-left: 20px"
                        placement="bottom-end"
                    >
                        综合排序
                        <Icon type="md-arrow-dropdown" />
                        <DropdownMenu slot="list">
                            <DropdownItem>按课时排序</DropdownItem>
                            <DropdownItem>按报名人数排序</DropdownItem>
                            <DropdownItem>按时间排序</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <span class="classtype">热门课程</span>
                    <span class="classtype">最新课程</span>
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
            courseList: [
                {
                    courseCoverUrl:
                        'https://soldier-prod.oss-cn-beijing.aliyuncs.com/saas/image/c23d6efbe67e6fd611b5fb375e90bab6.jpg',
                    name: '职业规划与就业指导',
                },
                {
                    courseCoverUrl:
                        'https://soldier-prod.oss-cn-beijing.aliyuncs.com/saas/image/c23d6efbe67e6fd611b5fb375e90bab6.jpg',
                    name: '职业规划与就业指导',
                },
                {
                    courseCoverUrl:
                        'https://soldier-prod.oss-cn-beijing.aliyuncs.com/saas/image/c23d6efbe67e6fd611b5fb375e90bab6.jpg',
                    name: '职业规划与就业指导',
                },
                {
                    courseCoverUrl:
                        'https://soldier-prod.oss-cn-beijing.aliyuncs.com/saas/image/c23d6efbe67e6fd611b5fb375e90bab6.jpg',
                    name: '职业规划与就业指导',
                },
                {
                    courseCoverUrl:
                        'https://soldier-prod.oss-cn-beijing.aliyuncs.com/saas/image/c23d6efbe67e6fd611b5fb375e90bab6.jpg',
                    name: '职业规划与就业指导',
                },
                {
                    courseCoverUrl:
                        'https://soldier-prod.oss-cn-beijing.aliyuncs.com/saas/image/c23d6efbe67e6fd611b5fb375e90bab6.jpg',
                    name: '职业规划与就业指导',
                },
            ],
        };
    },
    mounted() {
        if (this.$route.query.cate) {
            this.listparam.course.firstCategoryId = this.$route.query.cate;
            this.conditionid = this.$route.query.cate;
        }
        // this.getCourselist();
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
<style lang="less">
@import "../../less/variables";
.search-condition-type {
    position: relative;
    .ivu-select-dropdown {
        width: 170px;
        margin: 0px;
        padding: 0px;
        border-radius: 0px;
        box-shadow: 0px;
        -webkit-box-shadow: none;
        top: 48px !important;
        left: -24px !important;
        .ivu-dropdown-menu {
            .ivu-dropdown-item {
                color: @textColor1;
                height: 49px;
                line-height: 49px;
                text-align: center;
                padding: 0px;
                &:hover {
                    color: @white;
                    background-color: @primaryred;
                }
            }
        }
    }
}
</style>
