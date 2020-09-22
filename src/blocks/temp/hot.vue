<template>
    <div class="module-block module-block-hot-course-list">
        <div class="block-title">
            课程排行
        </div>
        <div class="hot-list">
            <div
                v-for="(item, index) in hotList"
                :key="item.id"
                class="hot-course-item"
                @click="toDetail(item)"
            >
                <em
                    class="index"
                    :class="{ highlight: index < 3 }"
                >
                    {{ index + 1 }}
                </em>
                <span class="title">
                    {{ item.name }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../../api/course';

export default {
    data() {
        return {
            hotList: [],
        };
    },
    created() {
        this.fetch();
    },
    methods: {
        fetch() {
            return api.getHotList().then(({ data }) => {
                this.hotList = data;
            });
        },
        toDetail(course) {
            this.$router.push({
                name: 'courseDetail',
                params: {
                    courseId: course.id,
                },
            });
        },
    },
};
</script>

<style lang="less">
@import "../../less/variables.less";
.module-block-hot-course-list {
    padding: 32px;
    color: #0f134d;
    font-size: 16px;
    line-height: 20px;
    .block-title {
        color: @primary;
        font-size: 20px;
    }
    .index {
        display: inline-block;
        width: 23px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        background: #f1f1f5;
        border-radius: 2px;
        margin: 24px 5px 0 0;
        font-style: normal;
        &.highlight {
            color: #fff;
            background: @primary;
        }
    }
}
</style>
