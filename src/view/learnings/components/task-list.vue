<template>
    <div class="content">
        <div class="header">
            <RadioGroup
                v-model="button1"
                type="button"
                style="color: #D14242;"
            >
                <Radio label="北京" />
                <Radio label="上海" />
                <Radio label="深圳" />
                <Radio label="杭州" />
            </RadioGroup>
            <div class="search">
                <input placeholder="请输入关键字">
                <img src="@/assets/images/learnings/search-icon.png">
            </div>
        </div>

        <div class="content-box">
            <div class="content-item">
                <div style="height:126px;background:blue;" />
                <div style="padding-left: 10px;">
                    <div class="title">
                        收到答复是否石帆胜丰
                    </div>
                    <div class="time">
                        2020/6/38
                    </div>
                    <Progress
                        :percent="25"
                        stroke-color="#00B288"
                        :stroke-width="5"
                    />
                </div>
            </div>
            <div class="content-item">
                <div style="height:126px;background:blue;" />
                <div style="padding-left: 10px;">
                    <div class="title">
                        收到答复是否石帆胜丰
                    </div>
                    <div class="time">
                        2020/6/38
                    </div>
                    <Progress
                        :percent="25"
                        stroke-color="#00B288"
                        :stroke-width="5"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            button1: '北京',
        };
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
