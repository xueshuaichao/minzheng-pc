<template>
    <div class="content">
        <div class="header">
            <RadioGroup
                v-model="listparam.status"
                type="button"
                style="color: #D14242;"
                @on-change="handleRadio"
            >
                <Radio label="">
                    全部
                </Radio>
                <Radio label="0">
                    未开始
                </Radio>
                <Radio label="1">
                    进行中
                </Radio>
                <Radio label="2">
                    未通过
                </Radio>
                <Radio label="3">
                    已通过
                </Radio>
            </RadioGroup>
            <div class="search">
                <input
                    v-model="listparam.name"
                    placeholder="请输入关键字"
                >
                <img
                    src="@/assets/images/learnings/search-icon.png"
                    @click="handleSearch"
                >
            </div>
        </div>

        <div
            v-if="taskList.length > 0"
            class="content-box"
        >
            <div
                v-for="item in taskList"
                :key="item.id"
                class="content-item"
                @click="handleDetail(item.id)"
            >
                <div style="height:126px">
                    <img
                        :src="item.coverUrl"
                        style="height:126px"
                        alt=""
                    >
                </div>
                <div style="padding-left: 10px;">
                    <div class="title">
                        {{ item.name }}
                    </div>
                    <div class="time">
                        {{ item.trainStartTime }}-{{ item.trainEndTime }}
                    </div>
                    <Progress
                        :percent="item.progress"
                        stroke-color="#00B288"
                        :stroke-width="5"
                    />
                </div>
            </div>
        </div>
        <div
            v-else
            class="noData"
        >
            <p>十分抱歉，您搜索的内容我们暂未收录，您可以尝试搜索其他内容</p>
        </div>
        <div style="margin-top:20px;">
            <Page
                :total="total"
                :current="listparam.pageNum"
                :page-size="listparam.pageSize"
                show-elevator
                @on-change="handlePagechange"
            />
        </div>
    </div>
</template>

<script>
import learningsApi from '../../../api/learnings';

export default {
    data() {
        return {
            taskList: [],
            total: 0,
            listparam: {
                pageNum: 1,
                pageSize: 12,
                status: '',
                name: '',
            },
        };
    },
    created() {
        this.taskFindByCondition();
    },
    methods: {
        handleSearch() {
            this.listparam.pageNum = 1;
            this.taskFindByCondition();
        },
        handleRadio() {
            this.listparam.pageNum = 1;
            this.taskFindByCondition();
        },
        taskFindByCondition() {
            return learningsApi
                .taskFindByCondition(this.listparam)
                .then((data) => {
                    console.log(data);
                    this.taskList = data.data.list || [];
                    console.log(this.taskList, 'this.taskList11');
                    this.total = data.data.total;
                });
        },
        handlePagechange(page) {
            console.log(page);
            this.listparam.pageNum = page;
            this.taskFindByCondition();
        },
        handleDetail(id) {
            this.$router.push({
                path: `/trainingDetail?id=${id}`,
            });
        },
    },
};
</script>

<style lang="less" scoped>
@import "../index.less";
.noData {
    margin-top: 60px;
    margin-bottom: 50px;
    p {
        font-size: 18px;
        text-align: center;
    }
}
.content {
    .header {
        height: 63px;
        background: #fff;
        padding: 15px 23px 0;
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
    }
    .content-box {
        display: flex;
        // justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 20px;
        width: 108%;
        .content-item {
            width: 224px;
            height: 230px;
            margin-bottom: 24px;
            font-size: 14px;
            background: #fff;
            margin-right: 17px;
            cursor: pointer;
            .title {
                color: @textcolor100;
                margin-top: 14px;
            }
            .time {
                color: #737386;
                font-size: 12px;
                margin-top: 6px;
            }
        }
    }
}
</style>
