<template>
    <div class="content">
        <div class="header">
            <div class="search">
                <input placeholder="请输入关键字">
                <img src="@/assets/images/learnings/search-icon.png">
            </div>
        </div>

        <div class="content-box">
            <!-- 0未读，1已读 -->
            <div
                v-for="item in messageList"
                :key="item.id"
                class="content-item"
            >
                <div class="first-line">
                    <div class="bell">
                        <img src="@/assets/images/learnings/bell.png">
                        <span v-if="item.status === 0" />
                    </div>
                    {{ item.createTime }}
                </div>
                <div class="second-line">
                    {{ item.typeName }}
                </div>
                <div
                    v-if="item.show"
                    class="third-line"
                >
                    {{ item.content }}
                </div>
                <div
                    class="button"
                    @click="item.show = !item.show"
                >
                    <template v-if="item.show">
                        <img src="@/assets/images/learnings/up-arrow.png">
                        收起
                    </template>
                    <template v-else>
                        <img src="@/assets/images/learnings/down-arrow.png">
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
            return learningsApi
                .messageFindByCondition({ pageSize: 10, pageNum: 1 })
                .then((data) => {
                    console.log(data);
                    this.messageList = data.data.list.map(item => ({
                        ...item,
                        show: false,
                    }));
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
            // height: 169px;
            // margin-right: 20px;
            font-size: 14px;
            border-bottom: 1px solid #e6e6e6;
            position: relative;
            padding-bottom: 20px;
            & > div {
                margin-left: 16px;
            }
            .first-line {
                font-size: 16px;
                margin-top: 34px;
                position: relative;
                .bell {
                    position: absolute;
                    top: 0;
                    left: -17px;
                    img {
                        width: 14px;
                        height: 14px;
                    }
                    span {
                        width: 8px;
                        height: 8px;
                        background: #d14242;
                        border-radius: 4px;
                        position: absolute;
                        top: 2px;
                        left: 7px;
                    }
                }
            }
            .second-line {
                margin-top: 10px;
                font-size: 18px;
            }
            .third-line {
                color: #9393a0;
                margin-top: 19px;
                font-size: 16px;
            }
            .button {
                position: absolute;
                top: 34px;
                right: 36px;
                color: #d14242;
                cursor: pointer;
                user-select: none;
                img {
                    width: 7px;
                    height: 12px;
                }
            }
        }
    }
}
</style>
