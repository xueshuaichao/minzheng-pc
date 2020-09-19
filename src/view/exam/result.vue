<template>
    <div class="exam-result-page m-container">
        <i-breadcrumb
            class="g-breadcrumb"
            separator=">"
        >
            <i-breadcrumb-item to="/">
                首页
            </i-breadcrumb-item>
            <i-breadcrumb-item :to="{ name: 'examList' }">
                考试测评
            </i-breadcrumb-item>
            <i-breadcrumb-item v-if="examName != ''">
                {{ examName }}
            </i-breadcrumb-item>
        </i-breadcrumb>
        <result @exam-name="getname" />
    </div>
</template>

<script>
import Result from './resultpage.vue';

export default {
    components: { Result },
    data() {
        return {
            examName: '',
        };
    },
    created() {},
    methods: {
        getname(data) {
            this.examName = data;
        },
    },
};
</script>

<style lang="less" scoped>
@import "../../less/variables.less";
</style>
