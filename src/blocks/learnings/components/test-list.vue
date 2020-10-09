<template>
    <div class="content">
        <div class="header">
            <RadioGroup
                v-model="button1"
                type="button"
                @on-change="handleRadiochange"
            >
                <Radio label="我的测试" />
                <Radio label="错题本" />
            </RadioGroup>
        </div>
        <keep-alive>
            <component :is="currentTabComponent" />
        </keep-alive>
    </div>
</template>

<script>
import errorBook from './components/error-book.vue';
import myExam from './components/my-exam.vue';

export default {
    components: {
        errorBook,
        myExam,
    },
    data() {
        return {
            button1: '我的测试',
            currentTabComponent: myExam,
        };
    },
    created() {},
    methods: {
        handleRadiochange(button1) {
            if (button1 === '我的测试') {
                this.currentTabComponent = myExam;
            } else {
                this.currentTabComponent = errorBook;
            }
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
        padding: 15px 23px 0;
    }
}
</style>
