<template>
    <div class="main-container">
        <i-breadcrumb
            class="g-breadcrumb"
            separator=">"
        >
            <i-breadcrumb-item to="/">
                首页
            </i-breadcrumb-item>
            <i-breadcrumb-item :to="{ name: 'courseList' }">
                教育培训
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
                            :src="courseInfo.courseCoverUrl"
                            alt=""
                        >
                        <div>
                            <!-- 15: 04 -->
                        </div>
                    </div>
                </div>
                <div class="right">
                    <a :title="courseInfo.name">
                        {{ courseInfo.name }}
                    </a>
                    <ul class="info">
                        <li>课程时长：{{ courseInfo.totalClassTime }}</li>
                        <li>课程有效期：{{ courseInfo.expireTime }}</li>
                        <li>课程学时：{{ courseInfo.courseHours }}学时</li>
                    </ul>
                    <i-button
                        v-if="showBtn"
                        type="primary"
                        size="large"
                        @click="startStudy(courseInfo.id)"
                    >
                        {{ btntext }}
                    </i-button>
                </div>
            </div>
            <div class="resource-info">
                <div class="infoLeft">
                    <div class="infoTab">
                        <span
                            :class="changeInfo === '1' ? 'spanselect' : ''"
                            @click="changeTab('1')"
                        >课程描述</span>
                        <span
                            :class="changeInfo === '2' ? 'spanselect' : ''"
                            @click="changeTab('2')"
                        >课程目录</span>
                    </div>
                    <div class="infoContent">
                        <div
                            v-if="changeInfo === '1'"
                            class="des"
                        >
                            {{ courseInfo.courseIntro }}
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
                                            <i-button
                                                v-if="showBtn"
                                                type="primary"
                                                @click="
                                                    startStudy(
                                                        courseInfo.id,
                                                        lesson.resourceId,
                                                        lesson.id
                                                    )
                                                "
                                            >
                                                {{ btntext }}
                                            </i-button>
                                        </ol>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="organ-info">
                    <div class="logo">
                        <img
                            src="../../assets/images/course/logo@2x.png"
                            alt=""
                        >
                    </div>
                    <div class="title">
                        北京伟云融兴
                    </div>
                    <div class="info">
                        融兴在线是北京伟云融兴主打产品，平台整合多方优势资源，为退役军人提供教育培训、就业安置、创业孵化、
                        政策咨询服务、实现知识学习普及化、政策宣传精准化、
                        人才定制多样化，助力军民融合发展战略。
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import './index.less';
// import store from '../../store/index';
import api from '../../api/course';

export default {
    name: 'CourseDetail',
    data() {
        return {
            changeInfo: '1',
            courseInfo: {},
            catelogList: [],
            showBtn: true,
            btntext: '',
            courseName: '',
        };
    },
    computed: {},
    mounted() {
        this.courseDetail(this.$route.params.id);
    },
    methods: {
        // 开始学习
        startStudy(id, resourceId, lessonId) {
            console.log(resourceId);
            this.$router.push({
                name: 'coursePlayer',
                params: {
                    id,
                    name: this.courseName,
                    resourceId,
                    lessonId,
                    type: this.$route.params.name,
                },
            });
            if (!this.courseInfo.curUserBindCourseTag) {
                // const token = '8eef8b53b6f64c4fa467135739ef3785';
                // store.commit('setToken', token);
                localStorage.setItem(
                    'token',
                    'f3e171a4e06f492d93cb328bbeec2dd1',
                );
                return api.startStudy(id).then(() => {});
            }
            return true;
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
            return api.findById({ id }).then((res) => {
                if (res.success) {
                    const { data } = res;
                    this.courseInfo = data;
                    this.courseName = this.courseInfo.name;
                    this.courseInfo.totalClassTime = this.secondsFormat(
                        this.courseInfo.totalClassTime,
                    );
                    const time = this.formatDate(new Date().getTime());
                    console.log(!(this.courseInfo.expireTime < time));
                    this.showBtn = !(this.courseInfo.expireTime < time);
                    if (this.courseInfo.curUserBindCourseTag) {
                        this.btntext = '继续学习';
                    } else {
                        this.btntext = '开始学习';
                    }
                }
            });
        },
        changeTab(index) {
            this.changeInfo = index;
            if (index === '2') {
                return api
                    .findCourseItemByCourseId({
                        courseId: this.$route.params.id,
                    })
                    .then((res) => {
                        if (res.success) {
                            const { data } = res;
                            this.catelogList = data;
                        }
                    });
            }
            return true;
        },
    },
};
</script>
