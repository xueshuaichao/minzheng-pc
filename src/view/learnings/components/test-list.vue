<template>
    <div class="content">
        <div class="header">
            <RadioGroup
                v-model="button1"
                type="button"
            >
                <Radio label="我的测试" />
                <Radio label="错题本" />
            </RadioGroup>
            <div class="search">
                <input placeholder="请输入关键字">
                <img src="@/assets/images/learnings/search-icon.png">
            </div>
        </div>

        <div
            v-if="button1 === '我的测试'"
            class="content-box"
        >
            <div
                v-for="item in testList"
                :key="item.id"
                class="content-item"
            >
                <div class="title">
                    {{ item.name }}
                </div>
                <div class="time">
                    {{ item.submitTime }}
                </div>
                <div class="result">
                    <span style="color:#119C7B">对题数</span>/总题数：<span
                        style="color:#119C7B"
                    >{{ item.rightNum }}</span>/{{ item.totalNum }}
                </div>
                <div class="lesson">
                    <img src="@/assets/images/learnings/txt.png">
                    {{ item.categoryName }}
                </div>
                <div class="detail">
                    查看详情
                </div>
                <div class="test">
                    重新测试
                </div>
            </div>
        </div>
        <div
            v-else
            class="content-error-box"
        >
            <div
                v-for="item in errorList"
                :key="item.id"
                class="content-item"
            >
                <div class="title">
                    {{ item.title }}
                </div>
                <div class="xuanxiang">
                    <RadioGroup v-model="item.userAnswer">
                        <Radio
                            v-for="item1 in JSON.parse(item.content)"
                            :key="item1.id"
                            :label="item1.code"
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
    </div>
</template>

<script>
import learningsApi from '../../../api/learnings';

export default {
    data() {
        return {
            button1: '错题本',
            testList: [],
            errorList: [],
        };
    },
    created() {
        this.examFindByCondition();
        this.questionFindByCondition();
    },
    methods: {
        examFindByCondition() {
            return learningsApi.examFindByCondition({}).then((data) => {
                console.log(data);
                this.testList = data.data.list;
            });
        },
        questionFindByCondition() {
            return learningsApi.questionFindByCondition({}).then((data) => {
                console.log(data);
                this.errorList = data.data.list;
            });
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
                this.questionFindByCondition();
            });
        },
    },
};
</script>

<style lang="less" scoped>
@import "../index.less";
.content {
    .header {
        height: 63px;
        background: #fff;
        padding-top: 15px;
        padding-left: 23px;
        .search {
            width: 343px;
            height: 40px;
            border-radius: 30px;
            border: 1px solid #e6e6e6;
            position: relative;
            float: right;
            img {
                position: absolute;
                top: 11px;
                right: 12px;
                width: 20px;
                height: 20px;
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
    .content-box {
        margin-top: 20px;
        .content-item {
            height: 183px;
            font-size: 14px;
            background: #fff;
            position: relative;
            padding: 24px;
            // div {
            //     position: absolute;
            // }
            .title {
                color: #272f55;
                font-size: 18px;
            }
            .time {
                color: #737386;
                margin-top: 16px;
                margin-bottom: 14px;
            }
            .result {
                font-size: 16px;
                margin-bottom: 10px;
            }
            .lesson {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 126px;
                height: 37px;
                background-image: url("../../../assets/images/learnings/label.png");
                background-size: 100% 100%;
                img {
                    width: 16px;
                }
            }
            .detail {
                position: absolute;
                top: 91px;
                right: 42px;
                color: #4a90e2;
            }
            .test {
                position: absolute;
                top: 137px;
                right: 42px;
                color: #4a90e2;
            }
        }
    }
}
</style>
