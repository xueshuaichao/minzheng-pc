<template>
    <div class="main-container courseDetail">
        <i-breadcrumb
            class="g-breadcrumb"
            separator=">"
        >
            <i-breadcrumb-item :to="{ path: '/course' }">
                课程中心
            </i-breadcrumb-item>
            <i-breadcrumb-item>
                课程详情
            </i-breadcrumb-item>
        </i-breadcrumb>
        <div class="resource-detail">
            <div class="resource-banner">
                <div class="left">
                    <div class="picture-wrapper">
                        <img
                            :src="courseInfo.picUrl"
                            alt=""
                        >
                    </div>
                </div>
                <div class="right">
                    <a :title="courseInfo.name">
                        {{ courseInfo.name }}
                    </a>
                    <ul class="info">
                        <li class="info-classify">
                            分类：{{ courseInfo.categoryName }}
                        </li>
                        <li class="info-classdiff">
                            课程难度：初级
                        </li>
                    </ul>
                    <ul class="info1">
                        <li class="info1-keshi">
                            <span>课时：{{ courseInfo.classHour }}课时</span>
                            <span>学分：{{ courseInfo.credit }}</span>
                        </li>
                        <li class="info1-jindu">
                            已学完：
                            <Progress
                                :percent="courseInfo.learningRate"
                                :stroke-width="5"
                            />
                        </li>
                    </ul>
                    <i-button
                        v-if="showBtn"
                        @click="startStudy(courseInfo.id)"
                    >
                        {{ btntext }}
                    </i-button>
                </div>
            </div>
            <div class="resource-info">
                <course-info
                    :course-intro="courseInfo.intro"
                    :catelog-list="catelogList"
                    :zhjudge="courseInfo.stars"
                />
            </div>
        </div>
    </div>
</template>
<script>
import './index.less';
import CourseInfo from './components/courseInfo.vue';
// import store from '../../store/index';
import api from '../../api/course';

export default {
    name: 'CourseDetail',
    components: {
        CourseInfo,
    },
    data() {
        return {
            // changeInfo: '1',
            courseInfo: {},
            catelogList: [],
            showBtn: true,
            btntext: '加入选学',
            courseName: '',
        };
    },
    computed: {},
    mounted() {
        this.courseDetail(this.$route.query.id);
    },
    methods: {
        // 加入选学
        startStudy(id) {
            api.startStudy({ courseId: id, userId: 1 }).then((res) => {
                if (res.success) {
                    this.btntext = '开始学习';
                }
                console.log(res);
            });
        },
        formatDate(inputTime) {
            const date = new Date(inputTime);
            const y = date.getFullYear();
            let m = date.getMonth() + 1;
            m = m < 10 ? `0${m}` : m;
            let d = date.getDate();
            d = d < 10 ? `0${d}` : d;
            let h = date.getHours();
            h = h < 10 ? `0${h}` : h;
            let minute = date.getMinutes();
            let second = date.getSeconds();
            minute = minute < 10 ? `0${minute}` : minute;
            second = second < 10 ? `0${second}` : second;
            return `${y}-${m}-${d} ${h}:${minute}:${second}`;
        },
        secondsFormat(s) {
            const day = Math.floor(s / (24 * 3600)); // Math.floor()向下取整
            const hour = Math.floor((s - day * 24 * 3600) / 3600);
            const minute = Math.floor((s - day * 24 * 3600 - hour * 3600) / 60);
            const second = s - day * 24 * 3600 - hour * 3600 - minute * 60;
            return `${day}天${hour}小时${minute}分${second}秒`;
        },
        courseDetail(id) {
            return api.findById({ id, userId: 1 }).then((res) => {
                if (res.success) {
                    const { data } = res;
                    this.courseInfo = data;
                    this.courseName = this.courseInfo.name;
                    this.findCourseItemByCourseId();
                }
            });
        },
        // 获取目录详情
        findCourseItemByCourseId() {
            const param = {
                courseId: this.courseInfo.id,
                recordId: this.courseInfo.recordId,
                userId: 1,
            };
            api.findCourseItemByCourseId(param).then((res) => {
                console.log(res);
            });
        },
    },
};
</script>
<style lang="less">
.courseDetail {
    .ivu-progress {
        width: 140px;
    }
    .ivu-progress-bg {
        background-color: #d14242;
    }
    .ivu-progress-inner {
        background-color: #e6e6e6;
    }
}
</style>
