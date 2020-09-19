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
            <div class="direction-condition">
                <!-- <p>方向：</p> -->
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
            <div
                v-if="classifyList.length > 0"
                class="classify-condition"
            >
                <p>分类：</p>
                <span
                    v-for="classify in classifyList"
                    :key="classify.id"
                    :class="{ active: classifyIndex == classify.id }"
                    @click="setSelectedClassify(classify.id)"
                >{{ classify.name }}</span>
            </div>
        </div>
        <ul class="exam-list">
            <li
                v-for="exam in examList"
                :key="exam.id"
                class="exam-item clearfix"
            >
                <h1 class="title">
                    {{ exam.name }}
                </h1>
                <div class="content">
                    <p class="course-name">
                        {{ exam.courseName }}
                    </p>
                    <p class="time">
                        考试时间：{{ exam.duration }} 分钟
                    </p>
                    <p class="difficulty">
                        难易程度：
                        <Rate
                            v-model="exam.difficulty"
                            disabled
                        />
                    </p>
                </div>
                <i-button
                    class="exam-btn"
                    @click="joinScene(exam)"
                >
                    开始考试
                </i-button>
            </li>
        </ul>
        <i-page
            class="pager"
            :current.sync="pageNum"
            :total="total"
            :page-size="pageSize"
            prev-text="上一页"
            next-text="下一页"
            @on-change="handlePageChange"
        />
    </div>
</template>

<script>
import api from '../../api/exam';
import store from '../../store';

export default {
    data() {
        return {
            pageNum: 1,
            pageSize: 9,
            total: 0,
            scene: {
                purposeType: 1, // 用途类型：1.考试，2.问卷
                // sceneCategoryId: null, // 考试（问卷）分类ID
            },

            examList: [],
            directionIndex: 0,
            directionList: [
                {
                    id: 0,
                    name: '全部',
                },
            ], // 一级分类列表
            classifyIndex: 0,
            classifyList: [], // 二级分类列表
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
                userId: store.state.user.userInfo.id,
            };
            return api.joinScene(params).then((data) => {
                if (data.success) {
                    this.$router.push({
                        name: 'examDetail',
                        params: {
                            id: exam.id,
                            paperId: data.data,
                            type: exam.purposeType,
                        },
                    });
                }
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
        setSelectedDirection(id) {
            this.directionIndex = id;
            this.scene.sceneCategoryId = id;
            this.getChildren(id);
            if (this.directionIndex === 0) {
                this.scene.sceneCategoryId = null;
            }
            this.getExamList();
        },
        setSelectedClassify(id) {
            this.classifyIndex = id;
            this.scene.sceneCategoryId = id;
            this.getExamList();
        },
    },
};
</script>

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
    width: 1140px;
    padding: 30px 16px;
    box-shadow: 0px 0px 20px 0px rgba(43, 51, 59, 0.08);
    border-radius: 6px;
    background: @white;
    font-size: 14px;
    margin: 0 auto;
    margin-top: 14px;
    .direction-condition {
        margin-bottom: 29px;
    }
    p {
        color: @textColor2;
        display: inline-block;
    }
    span {
        color: @textColor1;
        display: inline-block;
        // margin: 0 36px;
        padding: 6px 12px;
        margin: 0 24px;
        cursor: pointer;
        &.active {
            color: @white;
            background: @mainColor;
            padding: 6px 12px;
            border-radius: 6px;
        }
    }
}
.exam-list {
    width: 1140px;
    margin: 24px auto;
    display: flex;
    flex-wrap: wrap;
    .exam-item {
        width: 370px;
        padding: 24px 16px;
        box-sizing: border-box;
        box-shadow: 0px 0px 20px 0px rgba(43, 51, 59, 0.08);
        border-radius: 6px;
        background: @white;
        list-style: none;
        margin-right: 15px;
        margin-bottom: 24px;
        &:nth-child(3n) {
            margin-right: 0;
        }
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
            margin-bottom: 24px;
        }
        .content {
            color: @textColor2;
            font-size: 14px;
            p {
                margin-bottom: 14px;
            }
        }
        .exam-btn {
            width: 100%;
            height: 40px;
            display: inline-block;
            line-height: 40px;
            text-align: center;
            color: @white;
            background: @mainColor;
            border-radius: 6px;
            border: 0;
            cursor: pointer;
        }
    }
}
</style>
