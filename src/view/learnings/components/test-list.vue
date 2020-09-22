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

        <div class="content-box">
            <div class="content-item">
                <div class="title">
                    试卷的名称啊，名称啊试卷的名称啊，名称啊
                </div>
                <div class="time">
                    2018-08-16 12:02
                </div>
                <div class="result">
                    <span style="color:#119C7B">对题数</span>/总题数：<span
                        style="color:#119C7B"
                    >1</span>/5
                </div>
                <div class="lesson">
                    养老培训
                </div>
                <div class="detail">
                    查看详情
                </div>
                <div class="test">
                    重新测试
                </div>
            </div>
            <div class="content-item">
                <div class="title">
                    试卷的名称啊，名称啊试卷的名称啊，名称啊
                </div>
                <div class="time">
                    2018-08-16 12:02
                </div>
                <div>对题数/总题数：1/5</div>
                <div>养老培训</div>
                <a href="javascript:;">查看详情</a>
                <a href="javascript:;">重新测试</a>
            </div>
            <!-- <div class="content-item">
                <div style="height:126px;background:blue;">

                </div>
                <div style="padding-left: 10px;">
                    <div class="title">收到答复是否石帆胜丰</div>
                    <div class="time">2020/6/38</div>
                    <Progress :percent="25" stroke-color="#00B288" :stroke-width="5" />
                </div>
            </div> -->
        </div>
    </div>
    <!-- <div>
        <p>我的测评</p>
        <div>
            <div>试卷名称</div>
            <div>2020-8-16</div>
            <div>对题数/总体书</div>
            <div>养老培训</div>
            <Button>查看详情</Button>
            <Button>重新测试</Button>
        </div>
    </div> -->
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
        // display:flex;
        margin-top: 20px;
        .content-item {
            // width: 224px;
            height: 230px;
            // margin-right:20px;
            font-size: 14px;
            background: #fff;
            position: relative;
            div {
                position: absolute;
            }
            .title {
                color: #272f55;
                top: 24px;
                left: 24px;
                font-size: 18px;
            }
            .time {
                color: #737386;
                top: 65px;
                left: 24px;
            }
            .result {
                top: 99px;
                left: 24px;
                font-size: 16px;
            }
            .lesson {
                top: 135px;
                left: 24px;
            }
            .detail {
                top: 91px;
                right: 42px;
                color: #4a90e2;
            }
            .test {
                top: 137px;
                right: 42px;
                color: #4a90e2;
            }
        }
    }
}
</style>
