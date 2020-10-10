<template>
    <div>
        <div class="search">
            <input
                v-model="errorBookparam.title"
                placeholder="请输入关键字"
            >
            <img
                src="@/assets/images/learnings/search-icon.png"
                @click="handlePagechange(1)"
            >
        </div>
        <div class="error-filter">
            <div class="first-grade">
                <div class="first-grade-title">
                    试卷分类：
                </div>
                <div class="first-grade-body">
                    <div
                        v-for="item in shijuanfenlei"
                        :key="item.id"
                        class="task-item"
                        :class="{
                            active: parentCategoryId === item.id
                        }"
                        @click="
                            handleParentfenleiToggle(item.id, item.children)
                        "
                    >
                        {{ item.name }}
                    </div>
                </div>
            </div>
            <div
                v-if="childfenlei.length > 0"
                class="first-grade"
            >
                <div class="first-grade-title">
                    子类：
                </div>
                <div class="first-grade-body">
                    <div
                        v-for="item in childfenlei"
                        :key="item.id"
                        class="task-item"
                        :class="{
                            active: examCategoryId === item.id
                        }"
                        @click="handleChildfenleiToggle(item.id)"
                    >
                        {{ item.name }}
                    </div>
                </div>
            </div>
            <div class="first-grade">
                <div class="first-grade-title">
                    试卷难度：
                </div>
                <div class="first-grade-body">
                    <div
                        v-for="item in shijuannandu"
                        :key="item.value"
                        class="task-item"
                        :class="{
                            active:
                                errorBookparam.questionDifficulty === item.value
                        }"
                        @click="handlenanduToggle(item.value)"
                    >
                        {{ item.name }}
                    </div>
                </div>
            </div>
        </div>
        <div class="content-error-box">
            <div
                v-for="item in errorList"
                :key="item.id"
                class="content-item"
            >
                <div class="title">
                    {{ item.title }}
                </div>
                <div class="xuanxiang">
                    <CheckboxGroup
                        v-if="item.type === 2"
                        :value="item.userAnswer | splitUserAnswer"
                    >
                        <Checkbox
                            v-for="item1 in item.contentItems"
                            :key="item1.id"
                            :label="item1.code"
                            disabled
                        >
                            <span>{{ item1.value }}</span>
                        </Checkbox>
                    </CheckboxGroup>
                    <RadioGroup
                        v-else
                        v-model="item.userAnswer"
                    >
                        <Radio
                            v-for="item1 in item.contentItems"
                            :key="item1.id"
                            :label="item1.code"
                            disabled
                        >
                            <span>{{ item1.value }}</span>
                        </Radio>
                    </RadioGroup>
                </div>
                <div class="rightAnswer">
                    正确答案{{ item.rightAnswer }}
                </div>
                <div class="jiexi">
                    答案解析{{ item.remark }}
                </div>
                <div
                    class="test"
                    @click="handleRemoveError(item.id)"
                >
                    移除错题
                </div>
            </div>
        </div>
        <div style="margin-top:20px;">
            <Page
                :total="total"
                :current="errorBookparam.pageNum"
                :page-size="errorBookparam.pageSize"
                show-elevator
                @on-change="handlePagechange"
            />
        </div>
    </div>
</template>

<script>
import learningsApi from '../../../../api/learnings';
import category from '../../const/category';

export default {
    filters: {
        splitUserAnswer(val) {
            return val.split('');
        },
    },
    data() {
        return {
            total: 0,
            errorList: [],
            errorBookparam: {
                pageNum: 1,
                pageSize: 9,
                title: '',
                questionDifficulty: '',
                sceneCategoryId: '',
            },
            shijuanfenlei: [],
            shijuannandu: category.shijuannandu,
            childfenlei: [],
            examCategoryId: '', // 子类
            parentCategoryId: '', // 父类
        };
    },
    created() {
        this.examGetCategoryTree();
        this.errorBookFindByCondition(this.errorBookparam);
    },
    methods: {
        examGetCategoryTree() {
            return learningsApi.examGetCategoryTree().then((data) => {
                this.shijuanfenlei = [
                    {
                        children: null,
                        id: '',
                        name: '全部',
                    },
                    ...data.data,
                ];
                console.log(data, 'data123');
            });
        },
        handleParentfenleiToggle(val, childfenlei) {
            console.log(childfenlei, val, 'childfenlei');
            this.parentCategoryId = val;
            if (String(childfenlei) === 'null') {
                this.childfenlei = [];
                this.errorBookparam.sceneCategoryId = val;
                this.handlePagechange(1);
            } else {
                this.childfenlei = childfenlei;
                this.errorBookparam.sceneCategoryId = val;
            }
        },
        handleChildfenleiToggle(val) {
            this.examCategoryId = val;
            this.errorBookparam.sceneCategoryId = val;
            this.handlePagechange(1);
        },
        handlenanduToggle(val) {
            this.errorBookparam.questionDifficulty = val;
            this.handlePagechange(1);
        },
        handlePagechange(page) {
            this.errorBookparam.pageNum = page || 1;
            this.errorBookFindByCondition(this.errorBookparam);
        },
        handleRemoveError(id) {
            this.$Modal.confirm({
                title: '删除提示',
                content: '<p>删除后数据将无法恢复，是否确认删除？</p>',
                onOk: () => {
                    this.deleteCarousel({ id });
                },
            });
        },
        deleteCarousel(param) {
            return learningsApi.questionRemove(param).then(() => {
                this.handlePagechange(1);
            });
        },
        errorBookFindByCondition(param) {
            return learningsApi.errorBookFindByCondition(param).then((data) => {
                console.log(data);
                this.errorList = data.data.list;
                this.total = data.data.total;
            });
        },
    },
};
</script>

<style lang="less" scoped>
.search {
    width: 343px;
    height: 40px;
    border-radius: 30px;
    border: 1px solid #e6e6e6;
    position: absolute;
    // float: right;
    transform: translate(-14px, -67px);
    right: 0;
    img {
        position: absolute;
        top: 11px;
        right: 12px;
        width: 20px;
        height: 20px;
        cursor: pointer;
    }
    input {
        width: 280px;
        position: absolute;
        height: 32px;
        top: 3px;
        left: 13px;
        border: none;
        outline: none;
    }
}
.error-filter {
    // height: 140px;
    padding: 24px;
    background: #fff;
    margin-top: 16px;
    .first-grade {
        display: flex;
        margin-bottom: 36px;
        font-size: 16px;
        .first-grade-title {
            width: 80px;
            font-weight: 500;
        }
        .first-grade-body {
            display: flex;
            flex-wrap: wrap;
            flex: 1;
            .task-item {
                color: #272f55;
                // width: 80px;
                text-align: center;
                cursor: pointer;
                flex-wrap: nowrap;
                margin-right: 10px;
            }
            .active {
                position: relative;
                color: #d14242;
                // &::after {
                //     content: " ";
                //     width: 14px;
                //     height: 4px;
                //     position: absolute;
                //     background: #d14242;
                //     bottom: -8px;
                //     left: 33px;
                //     border-radius: 4px;
                // }
            }
        }
    }
}
.content-error-box {
    margin-top: 20px;
    .content-item {
        height: 200px;
        font-size: 14px;
        background: #fff;
        position: relative;
        padding: 24px;
        margin-bottom: 16px;
        .title {
            color: #272f55;
            font-size: 18px;
            margin-bottom: 16px;
        }
        .rightAnswer {
            color: #272f55;
            font-size: 16px;
            margin-top: 32px;
            margin-bottom: 8px;
        }
        .xuanxiang {
            color: #919191;
        }
        .jiexi {
            color: #272f55;
        }
        .test {
            top: 137px;
            right: 42px;
            color: #4a90e2;
            position: absolute;
            cursor: pointer;
        }
    }
}
</style>
