<template>
    <div class="exam-list-page m-container">
        <i-breadcrumb
            class="g-breadcrumb"
            separator=">"
        >
            <i-breadcrumb-item to="/">
                首页
            </i-breadcrumb-item>
            <i-breadcrumb-item class="breadcrumb-1">
                考试测评
            </i-breadcrumb-item>
        </i-breadcrumb>
        <div class="search-bar">
            <div class="classify">
                <div class="direction-condition">
                    <p>试卷分类：</p>
                    <div class="list">
                        <span
                            :class="{ active: directionIndex == 0 }"
                            @click="setSelectedDirection(0)"
                        >全部</span>
                        <span
                            v-for="direction in directionList"
                            :key="direction.id"
                            :class="{ active: directionIndex == direction.id }"
                            @click="setSelectedDirection(direction.id)"
                        >{{ direction.name }}</span>
                    </div>
                </div>
                <div
                    v-if="classifyList.length > 0"
                    class="classify-condition"
                >
                    <p>子类：</p>
                    <div class="list">
                        <span
                            :class="{ active: classifyIndex == 0 }"
                            @click="setSelectedClassify(0)"
                        >全部</span>
                        <span
                            v-for="classify in classifyList"
                            :key="classify.id"
                            :class="{ active: classifyIndex == classify.id }"
                            @click="setSelectedClassify(classify.id)"
                        >{{ classify.name }}</span>
                    </div>
                </div>
            </div>
            <div class="classify-condition type-condition">
                <p>试题类型：</p>
                <span
                    v-for="item in typeList"
                    :key="item.id"
                    :class="{ active: typeIndex == item.id }"
                    @click="setType(item.id)"
                >{{ item.name }}</span>
            </div>
        </div>
        <div class="content">
            <div class="top clearfix">
                <h1 class="fl">
                    试卷列表
                </h1>
                <div class="fr">
                    <Input
                        v-model="scene.name"
                        placeholder="请输入关键字"
                        style="width: 343px;"
                        @on-enter="getExamList"
                    />
                </div>
            </div>
            <ul class="exam-list">
                <li
                    v-for="exam in examList"
                    :key="exam.id"
                    class="exam-item clearfix"
                >
                    <div class="fl">
                        <h1 class="title">
                            {{ exam.name }}
                        </h1>
                        <div class="content">
                            <!-- <p class="course-name">
                                {{ exam.courseName }}
                            </p> -->
                            <p
                                v-if="exam.categoryInfo"
                                class="categoryInfo"
                            >
                                {{ exam.categoryInfo.join("-") }}
                            </p>
                            <p class="time">
                                考试时间：{{ exam.duration }} 分钟
                            </p>
                            <p class="time">
                                满分：{{ exam.totalScore }}
                            </p>
                            <p class="time">
                                题数：{{ exam.totalCount }}
                            </p>
                            <p class="difficulty">
                                难易程度：{{
                                    exam.difficulty === 1
                                        ? "简单"
                                        : exam.difficulty === 2
                                            ? "一般"
                                            : "困难"
                                }}
                                <!-- <Rate
                                    v-model="exam.difficulty"
                                    disabled
                                /> -->
                            </p>
                        </div>
                    </div>
                    <div
                        class="fr exam-btn"
                        @click="joinScene(exam)"
                    >
                        <img
                            src="../../assets/images/exam/exam-btn.png"
                            alt=""
                        >
                        <span>开始考试</span>
                    </div>
                </li>
            </ul>
        </div>

        <i-page
            class="pager"
            :current.sync="pageNum"
            :total="total"
            :page-size="pageSize"
            @on-change="handlePageChange"
        />
    </div>
</template>

<script>
import api from '../../api/exam';
// import store from '../../store';

export default {
    data() {
        return {
            pageNum: 1,
            pageSize: 15,
            total: 0,
            scene: {
                // purposeType: 1, // 用途类型：1.考试，2.问卷
                name: '', // 考试名称
                difficulty: 0, // 试题难度
                sceneCategoryId: 0, // 考试（问卷）分类ID
            },

            examList: [],
            directionIndex: 0,
            directionList: [], // 一级分类列表
            classifyIndex: 0,
            classifyList: [], // 二级分类列表
            typeIndex: 0,
            typeList: [
                { id: 0, name: '全部' },
                { id: 1, name: '简单' },
                { id: 2, name: '一般' },
                { id: 3, name: '困难' },
            ],
        };
    },
    created() {
        this.getExamList();
        this.getCategoryList();
    },
    methods: {
        // 开始考试
        joinScene(exam) {
            const params = {
                sceneId: exam.id,
                businessId: 1, //
                businessType: 1,
                // userId: store.state.user.userInfo ? store.state.user.userInfo.id : 1000,
            };
            return api.joinScene(params).then((data) => {
                this.$router.push({
                    name: 'examDetail',
                    params: {
                        id: exam.id,
                        paperId: data.data,
                        // type: exam.purposeType,
                    },
                });
            });
        },
        handlePageChange() {
            this.getExamList();
        },
        // 列表
        getExamList() {
            return api
                .getExamList(this.pageNum, this.pageSize, this.scene)
                .then((list) => {
                    this.examList = list.data.list;
                    this.total = list.data.total;
                });
        },
        // 一级分类
        getCategoryList() {
            return api.getCategoryList().then((list) => {
                this.directionList = list.data;
            });
        },
        // 二级分类
        getChildren(id) {
            return api.getChildren(id).then((list) => {
                this.classifyList = list.data;
            });
        },
        setType(id) {
            this.typeIndex = id;
            this.getExamList();
        },
        setSelectedDirection(id) {
            this.directionIndex = id;
            this.scene.sceneCategoryId = id;
            this.classifyIndex = 0;
            this.getChildren(id);
            if (this.directionIndex === 0) {
                this.scene.sceneCategoryId = null;
            }
            this.getExamList();
        },
        setSelectedClassify(id) {
            this.classifyIndex = id;
            this.scene.sceneCategoryId = id;
            if (this.classifyIndex === 0) {
                this.scene.sceneCategoryId = null;
            }
            this.getExamList();
        },
    },
};
</script>
<style lang="less">
.exam-list-page .ivu-input {
    border-radius: 30px;
    height: 45px;
    padding-left: 22px;
}
</style>
<style lang="less" scoped>
@import "../../less/variables.less";
.breadcrumb {
    margin-top: 32px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e7ebf3;
    padding-left: 30px;
}
.pager {
    margin-bottom: 24px;
}
.search-bar {
    width: 1200px;
    box-shadow: 0px 0px 20px 0px rgba(43, 51, 59, 0.08);
    border-radius: 6px;
    background: @white;
    font-size: 16px;
    margin: 0 auto;
    margin-top: 14px;
    color: @textColor1;
    .classify {
        padding: 30px 24px 0 24px;
        border-bottom: 1px solid #f0f0f2;
    }
    .direction-condition,
    .classify-condition {
        margin-bottom: 15px;
    }
    .type-condition {
        margin-bottom: 0;
        padding: 16px 24px 18px 24px;
        span {
            margin-bottom: 0;
        }
    }
    .list {
        display: inline-block;
        vertical-align: top;
        max-width: 980px;
    }
    p {
        color: @textColor2;
        display: inline-block;
        margin-right: 7px;
        font-weight: 500;
        width: 80px;
        text-align: right;
    }
    span {
        display: inline-block;
        margin-right: 54px;
        cursor: pointer;
        font-weight: 400;
        margin-bottom: 19px;
        &.active {
            color: @primaryred;
            // background: @mainColor;
            // padding: 6px 12px;
            // border-radius: 6px;
        }
    }
}
.content {
    width: 100%;
    margin: 0 auto;
    .top {
        padding: 31px 0 15px 21px;
        h1 {
            font-size: 30px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: @textColor1;
            line-height: 42px;
        }
    }
}
.exam-list {
    width: 100%;
    margin: 0 auto;
    .exam-item {
        width: 100%;
        padding: 24px 24px 20px 25px;
        box-sizing: border-box;
        background: @white;
        list-style: none;
        margin-bottom: 16px;
        h1 {
            font-size: 16px;
            font-weight: 600;
            color: @textColor1;
            width: 100%;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            margin-bottom: 28px;
        }
        .content {
            color: @textColor1;
            font-size: 16px;
            overflow: hidden;
            p {
                float: left;
                margin-right: 32px;
            }
        }
        .exam-btn {
            cursor: pointer;
            margin-top: 26px;
            img {
                width: 20px;
                vertical-align: middle;
            }
            span {
                display: inline-block;
                vertical-align: middle;
                font-size: 16px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #4a90e2;
                line-height: 22px;
                margin-left: 4px;
            }
        }
    }
}
</style>
