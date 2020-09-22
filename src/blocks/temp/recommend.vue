<template>
    <div class="module-block module-block-recommend-course-list">
        <div class="block-title">
            课程推荐
        </div>
        <div class="recommend-list">
            <div
                v-for="item in recommendList"
                :key="item.id"
                class="recommend-course-item"
                @click="toDetail(item)"
            >
                <img
                    class="cover"
                    :src="item.icon"
                >
                <div class="flex">
                    <div class="title">
                        {{ item.name }}
                    </div>
                    <div class="play-times">
                        <Icon type="ios-eye-outline" />{{ item.playingTimes }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../../api/course';

export default {
    data() {
        return {
            recommendList: [],
        };
    },
    created() {
        this.fetch();
    },
    methods: {
        fetch() {
            return api.getRecommendList().then(({ data }) => {
                this.recommendList = data;
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
.module-block-recommend-course-list {
    padding: 32px;
    color: #0f134d;
    font-size: 16px;
    line-height: 20px;
    .block-title {
        color: @primary;
        font-size: 20px;
    }
    .cover {
        width: 100%;
    }
    .flex {
        display: flex;
    }
    .title {
        flex: 1;
        font-size: 16px;
    }

    .recommend-course-item {
        font-size: 14px;
        margin-top: 16px;
        .play-times {
            color: #929bff;
            line-height: 22px;
        }
        .ivu-icon {
            font-size: 20px;
            vertical-align: -4px;
        }
    }
}
</style>
