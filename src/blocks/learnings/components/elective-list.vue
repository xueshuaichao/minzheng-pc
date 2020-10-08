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
                    已完成
                </Radio>
            </RadioGroup>
            <div class="search">
                <input placeholder="请输入关键字">
                <img
                    src="@/assets/images/learnings/search-icon.png"
                    @click="handleSearch"
                >
            </div>
        </div>

        <div class="content-box">
            <div
                v-for="item in taskList"
                :key="item.id"
                class="content-item"
            >
                <img
                    :src="item.coverUrl"
                    style="height:126px"
                    alt="图片不存在"
                >
                <div style="padding-left: 10px;">
                    <div class="title">
                        {{ item.name }}
                    </div>
                    <Progress
                        :percent="item.progress"
                        stroke-color="#00B288"
                        :stroke-width="5"
                    />
                </div>
            </div>
        </div>
        <div style="margin-top:20px;">
            <Page
                :total="total"
                :current="listparam.pageNum"
                :page-size="listparam.pageSize"
                prev-text="上一页"
                next-text="下一页"
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
                pageSize: 9,
                status: '1',
                name: '',
            },
        };
    },
    created() {
        this.taskFindByCondition();
    },
    methods: {
        taskFindByCondition() {
            return learningsApi
                .userCourseElective(this.listparam)
                .then((data) => {
                    console.log(data);
                    this.taskList = data.data.list;
                    this.total = data.data.total;
                });
        },
        handleRadio() {
            this.listparam.pageNum = 1;
            this.taskFindByCondition();
        },
        handleSearch() {
            this.listparam.pageNum = 1;
            this.taskFindByCondition();
        },
        handlePagechange(page) {
            console.log(page);
            this.listparam.pageNum = page;
            this.taskFindByCondition();
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
    .content-box {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        .content-item {
            width: 224px;
            height: 230px;
            margin-right: 20px;
            font-size: 14px;
            background: #fff;
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
