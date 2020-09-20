<template>
    <div class="module-block module-block-course-detail">
        <div class="main">
            <div class="left">
                <h2 v-if="hasTitle">
                    {{ course.name }}
                </h2>
                <p>难度: {{ course.difficultyName }}</p>
                <p>课时: {{ course.credit }}h</p>
                <i-button
                    type="primary"
                    class="start"
                    @click="start"
                >
                    开始学习
                </i-button>
            </div>
            <div class="cover">
                <img :src="course.icon">
            </div>
        </div>
        <Tabs
            v-if="hasTab"
            class="custom-tab"
        >
            <TabPane label="关于课程">
                {{ course.description }}
            </TabPane>
            <TabPane label="课程结构">
                <Tree
                    :data="catalog"
                    children-key="lessonList"
                />
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import api from '../../api/course';

export default {
    props: {
        routerParams: {
            type: Object,
            required: true,
        },
        setting: {
            type: [Object, Array],
            required: true,
        },
    },
    data() {
        return {
            course: {},
            catalog: [],
        };
    },
    computed: {
        hasTitle() {
            if (!this.setting || !this.setting.length) {
                return true;
            }
            const prop = this.setting.find(
                prop => prop.key === 'is_show_title',
            );
            return !prop || prop.value === 'true';
        },
        hasTab() {
            if (!this.setting || !this.setting.length) {
                return true;
            }
            const prop = this.setting.find(prop => prop.key === 'is_show_tab');
            return !prop || prop.value === 'true';
        },
    },
    created() {
        const { courseId } = this.routerParams;
        this.getDetail(courseId);
        this.getCatalog(courseId);
        this.$watch('routerParams.courseId', (val) => {
            this.getDetail(val);
            this.getCatalog(val);
        });
    },
    methods: {
        getDetail(courseId) {
            return api.getCourseDetail(courseId).then(({ data }) => {
                this.course = data;
            });
        },
        getCatalog(courseId) {
            return api.getCourseCatalog(courseId).then(({ data }) => {
                data.forEach((node) => {
                    // eslint-disable-next-line no-param-reassign
                    node.expand = true;
                });
                this.catalog = data;
            });
        },
        start() {
            this.$router.push({
                name: 'coursePlayer',
                params: {
                    id: this.routerParams.courseId,
                },
            });
        },
    },
};
</script>

<style lang="less">
.module-block-course-detail {
    padding-bottom: 32px;
    .main {
        display: flex;
        font-size: 16px;
    }
    .left {
        position: relative;
        width: 272px;
        padding: 200px 24px 0;
        background: rgba(236, 238, 255, 0.6);
        border-radius: 8px 0px 0px 8px;
        h2 {
            font-size: 28px;
        }
    }
    .start {
        position: absolute;
        left: 24px;
        bottom: 50px;
    }
    .cover {
        flex: 1;
        img {
            width: 100%;
        }
    }
    .custom-tab {
        margin-top: 48px;
        .ivu-tabs-nav-scroll {
            text-align: center;
        }
        .ivu-tabs-nav {
            float: none;
            display: inline-block;
        }
        .ivu-tabs-tab {
            padding: 8px 64px;
        }
    }
}
</style>
