<template>
    <div>
        <div class="search">
            <input
                v-model="testParam.sceneName"
                placeholder="请输入关键字"
            >
            <img
                src="@/assets/images/learnings/search-icon.png"
                @click="handlePagechange(1)"
            >
        </div>
        <div class="content-box">
            <div
                v-for="item in testList"
                :key="item.id"
                class="content-item"
            >
                <div class="title">
                    {{ item.sceneName }}
                </div>
                <div class="time">
                    {{ item.commitTime }}
                </div>
                <div class="result">
                    <span style="color:#119C7B">对题数</span>/总题数：<span
                        style="color:#119C7B"
                    >{{ item.rightCount }}</span>/{{ item.totalCount }}
                </div>
                <div class="lesson">
                    <img src="@/assets/images/learnings/txt.png">
                    {{ item.sceneCategoryName }}
                </div>
                <div
                    class="detail"
                    @click="handleDetail"
                >
                    查看详情
                </div>
                <div
                    class="test"
                    @click="handleReTest(item.sceneId)"
                >
                    重新测试
                </div>
            </div>
        </div>
        <div style="margin-top:20px;">
            <Page
                :total="total"
                :current="testParam.pageNum"
                :page-size="testParam.pageSize"
                show-elevator
                @on-change="handlePagechange"
            />
        </div>
    </div>
</template>

<script>
import learningsApi from '../../../../api/learnings';

export default {
    data() {
        return {
            total: 0,
            testList: [],
            testParam: {
                pageNum: 1,
                pageSize: 9,
                sceneName: '',
            },
        };
    },
    created() {
        this.examFindByCondition(this.testParam);
    },
    methods: {
        handlePagechange(page) {
            this.testParam.pageNum = page || 1;
            this.examFindByCondition(this.testParam);
        },
        examFindByCondition(param) {
            return learningsApi.examFindByCondition(param).then((data) => {
                console.log(data);
                this.testList = data.data.list;
                this.total = data.data.total;
            });
        },
        handleDetail() {},
        handleReTest(id) {
            this.$router.push({
                path: `/exam/detail/${id}`,
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
    position: relative;
    float: right;
    transform: translate(-14px, -67px);
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
.content-box {
    margin-top: 20px;
    .content-item {
        height: 183px;
        margin-bottom: 16px;
        font-size: 14px;
        background: #fff;
        position: relative;
        padding: 24px 24px 15px;
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
            background-image: url("../../../../assets/images/learnings/label.png");
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
            cursor: pointer;
        }
        .test {
            position: absolute;
            top: 137px;
            right: 42px;
            color: #4a90e2;
            cursor: pointer;
        }
    }
}
</style>
