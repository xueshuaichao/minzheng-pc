<template>
    <div class="module-block module-block-course-list">
        <i-input
            v-if="hasSearch"
            v-model="query"
            search
            placeholder="课程名称..."
        />
        <div
            class="course-list"
            :style="columnTemplateCss"
        >
            <div
                v-for="course in courseList"
                :key="course.id"
                class="course-item"
                @click="toDetail(course)"
            >
                <div class="aspect-ratio">
                    <img
                        class="course-cover"
                        :src="course.icon"
                    >
                </div>
                <div class="course-info">
                    <div class="title">
                        {{ course.name }}
                    </div>
                    <div class="play-times">
                        <Icon type="ios-eye" />{{ course.playingTimes }}
                    </div>
                </div>
            </div>
            <Page
                v-if="pager.total / pager.pageSize > 1"
                class="pagination"
                :total="pager.total"
                :current="pager.total"
                show-total
            />
        </div>
    </div>
</template>

<script>
import api from '../../api/course';

export default {
    props: {
        setting: {
            type: [Object, Array],
            required: true,
        },
    },
    data() {
        return {
            query: '',
            courseList: [],
            pager: {
                total: 0,
                current: 1,
                pageSize: 9,
            },
        };
    },
    computed: {
        columnTemplateCss() {
            if (!this.setting || !this.setting.length) {
                return null;
            }
            const prop = this.setting.find(
                prop => prop.key === 'num_of_items_in_line_of_course_list',
            );
            const col = +prop.value || 4;
            return {
                'grid-template-columns': new Array(col).fill('1fr').join(' '),
            };
        },
        hasSearch() {
            if (!this.setting || !this.setting.length) {
                return true;
            }
            const prop = this.setting.find(
                prop => prop.key === 'is_search_on_course_list',
            );
            return prop && prop.value === 'true';
        },
    },
    created() {
        this.getCourseList();
        console.log(this.setting);
    },
    methods: {
        getCourseList() {
            return api
                .getCourseList(
                    this.pager.current,
                    this.pager.pageSize,
                    this.query,
                )
                .then(({ data }) => {
                    this.pager.total = data.total;
                    this.courseList = data.list;
                    console.log('courseList', data);
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
.module-block-course-list {
    padding: 32px;
    .course-list {
        margin: 16px 0;
        list-style: none;

        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-row-gap: 20px;
        grid-column-gap: 20px;
        // .course-item {
        //     box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
        // }
        .aspect-ratio {
            position: relative;
            padding: 75% 0 0;
            img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
        }
        .course-info {
            display: flex;
            padding: 16px 0 16px;
            font-size: 14px;
        }
        .title {
            flex: 1;
            font-size: 20px;
            line-height: 1;
            font-weight: 400;
        }
        .play-times {
            line-height: 20px;
            // color: lighten(@primary, 9.4%);
            .ivu-icon {
                font-size: 20px;
                vertical-align: -4px;
            }
        }
    }
    .pagination {
        text-align: center;
    }
}
</style>
