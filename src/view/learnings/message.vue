<template>
    <div class="content">
        <div class="header">
            <div class="search">
                <input placeholder="请输入关键字">
                <img src="@/assets/images/learnings/search-icon.png">
            </div>
        </div>

        <div class="content-box">
            <div
                v-for="item in messageList"
                :key="item.id"
                class="content-item"
            >
                <div class="first-line">
                    <img src="@/assets/images/learnings/bell.png">
                    {{ item.submitTime }}
                </div>
                <div class="second-line">
                    任务修改
                </div>
                <div
                    v-if="show"
                    class="third-line"
                >
                    {{ item.content }}-12-25 23:59:00修改
                </div>
                <div
                    class="button"
                    @click="show = !show"
                >
                    <template v-if="show">
                        <img src="@/assets/images/learnings/up-arrow.png">
                        收起
                    </template>
                    <template v-else>
                        <img src="@/assets/images/learnings/up-arrow.png">
                        展开
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import learningsApi from '../../api/learnings';

export default {
    data() {
        return {
            show: false,
            messageList: [],
        };
    },
    created() {
        this.messageFindByCondition();
    },
    methods: {
        messageFindByCondition() {
            return learningsApi.messageFindByCondition({}).then((data) => {
                console.log(data);
                this.messageList = data.data.list;
            });
        },
    },
};
</script>

<style lang="less" scoped>
@import "./index.less";
.content {
    background: #fff;
    .header {
        height: 63px;
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
        // display: flex;

        margin-top: 20px;
        padding: 0 28px;
        color: @textcolor100;
        .content-item {
            // width: 224px;
            height: 169px;
            // margin-right: 20px;
            font-size: 14px;
            border-bottom: 1px solid #e6e6e6;
            position: relative;

            .first-line {
                position: absolute;
                top: 34px;
                left: 0px;
                font-size: 16px;
                img {
                    width: 14px;
                    height: 14px;
                }
            }
            .second-line {
                position: absolute;
                top: 68px;
                left: 16px;
                font-size: 18px;
            }
            .third-line {
                position: absolute;
                top: 111px;
                left: 16px;
                color: #9393a0;
                font-size: 16px;
            }
            .button {
                position: absolute;
                top: 70px;
                right: 36px;
                color: #d14242;
                cursor: pointer;
                img {
                    width: 7px;
                    height: 12px;
                }
            }
        }
    }
}
</style>
