<template>
    <!-- <div class="page"> -->
    <div class="infoLeft">
        <div class="infoTab">
            <span
                :class="changeInfo === '1' ? 'spanselect' : ''"
                @click="changeTab('1')"
            >简介</span>
            <span
                :class="changeInfo === '2' ? 'spanselect' : ''"
                @click="changeTab('2')"
            >目录</span>
            <span
                :class="changeInfo === '3' ? 'spanselect' : ''"
                @click="changeTab('3')"
            >评价</span>
        </div>
        <div class="infoContent">
            <div
                v-if="changeInfo === '1'"
                class="des"
            >
                {{ courseIntro }}
            </div>
            <div
                v-if="changeInfo === '2'"
                class="catalog"
            >
                <div class="chapter">
                    <div
                        v-for="item in catelogList"
                        :key="item.id"
                    >
                        <div class="title">
                            {{ item.title }}
                        </div>
                        <ul>
                            <ol
                                v-for="lesson in item.lessonList"
                                :key="lesson.id"
                            >
                                {{
                                    lesson.index
                                }}：
                                {{
                                    lesson.title
                                }}
                                <i-button v-if="showBtn">
                                    {{ btntext }}
                                </i-button>
                            </ol>
                        </ul>
                    </div>
                </div>
            </div>
            <div
                v-if="changeInfo === '3'"
                class="judge"
            >
                <div class="judge-top">
                    <span class="pingfen">综合评分：</span>
                    <Rate
                        v-model="zhjudge"
                        disabled
                        show-text
                    >
                        <span style="color: #f5a623">{{ zhjudge }}分</span>
                    </Rate>
                </div>
                <div class="judge-myjudge">
                    <span>我的评分</span>
                    <Rate
                        v-model="myjudge"
                        show-text
                    >
                        <span style="color: #f5a623">{{ myjudge }}分</span>
                    </Rate>
                </div>
            </div>
        </div>
    </div>
    <!-- </div> -->
</template>

<script>
export default {
    components: {},
    props: ['catelogList', 'courseIntro', 'zhjudge'],
    data() {
        return {
            changeInfo: '1',
            myjudge: 0,
        };
    },
    mounted() {},
    methods: {
        changeTab(num) {
            this.changeInfo = num;
        },
    },
};
</script>

<style lang="less">
.infoLeft {
    .ivu-rate-star-full:before {
        width: 18px;
        height: 18px;
        content: "";
        background-image: url("../../../assets/images/learning/icon-picture.png");
        background-size: 18px 18px;
    }
    .ivu-rate-star-content:before {
        width: 18px;
        height: 18px;
        content: "";
        background-image: url("../../../assets/images/learning/pic.png");
        background-size: 18px 18px;
    }
    .ivu-rate-star:before {
        width: 18px;
        height: 18px;
        content: "";
        // background-image: url('../../../assets/images/exam/icon-warning.png');
        // background-size: 18px 18px;
    }
    .ivu-rate {
        margin-top: -5px;
    }
    .ivu-rate-text {
        font-size: 17px;
        color: #58586b;
        margin-top: -7px;
    }
}
</style>
