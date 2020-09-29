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
                            v-if="!hasresourceURl"
                            :src="courseInfo.picUrl"
                            alt=""
                        >
                        <div
                            v-else
                            id="player-con"
                            style="height: 373px"
                        />
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
                    :course-intro="courseInfo"
                    :catelog-list="catelogList"
                    :zhjudge="3"
                    @getrecourseId="getrecourseId"
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
            hasresourceURl: false,
            resourceUrl: '',
            player: null,
            saveLearningParams: {
                recordId: '',
                detailId: '',
                pollingTime: '15',
                curSecond: '',
            },
        };
    },
    computed: {},
    mounted() {
        this.courseDetail(this.$route.query.id);
    },
    beforeDestroy() {
        this.clearTimeing();
    },
    methods: {
        // 获取资源id
        getrecourseId(val) {
            // this.saveLearningParams.detailId = val;
            console.log(val);
            api.getVideoPlayURLById({ id: val }).then((res) => {
                // console.log(res);
                if (res.success) {
                    const { data } = res;
                    [this.resourceUrl] = data;
                    this.hasresourceURl = this.resourceUrl.length > 0;
                    this.$nextTick(() => {
                        this.getaliPlay(this.resourceUrl);
                    });
                }
            });
        },
        // 保存课程进度
        saveLearningLog() {
            this.saveLearningParams.detailId = this.courseInfo.courseItemDetailId;
            this.saveLearningParams.recordId = this.courseInfo.recordId;
            this.saveLearningParams.curSecond = Math.round(
                this.player.getCurrentTime(),
            );
            if (this.saveLearningParams.curSecond > 0) {
                return api
                    .saveLearningLog(this.saveLearningParams)
                    .then((res) => {
                        console.log(res);
                    });
            }
            return true;
        },
        timing() {
            this.IntervalName = setInterval(() => {
                this.saveLearningLog();
            }, 15000);
        },
        getaliPlay(courseUrl, seekTime, iscomplate) {
            let contTime = seekTime;
            if (!contTime) {
                contTime = 0;
            }
            $('#player-con').height('373px');
            if ($('#J_prismPlayer').length > 0) {
                this.player.dispose();
                $('#J_prismPlayer').remove();
            }
            const boarddiv = '<div id="J_prismPlayer"></div>';
            $('#player-con').append(boarddiv);
            $('#J_prismPlayer').height('100%');
            this.$nextTick(() => {
                // eslint-disable-next-line no-undef
                this.player = new Aliplayer({
                    id: 'J_prismPlayer',
                    source: courseUrl,
                    width: '100%',
                    height: '500px',
                    // seek: contTime,
                    cover: '',
                    /* To set an album art, you must set 'autoplay' and 'preload' to 'false' */
                    autoplay: true,
                    preload: false,
                    isLive: false,
                    useH5Prism: true,
                });
                this.player.on('error', () => {
                    this.clearTimeing();
                });
                this.player.on('ready', () => {
                    this.timing();
                    contTime = contTime >= Math.round(this.player.getDuration())
                        ? '0'
                        : contTime;
                    if (!iscomplate) {
                        const video = document.querySelector('video');
                        video.currentTime = contTime;
                        let supposedCurrentTime = 0;
                        let maxtime = contTime;
                        // 监听当前的播放位置发送改变时触发。
                        video.addEventListener('timeupdate', () => {
                            if (video.currentTime > maxtime) {
                                maxtime = video.currentTime;
                            }
                            if (!video.seeking) {
                                supposedCurrentTime = video.currentTime;
                            }
                        });
                        // prevent user from seeking
                        // 寻址中（Seeking）指的是用户在音频/视频中移动/跳跃到新的位置。
                        video.addEventListener('seeking', () => {
                            if (maxtime < video.currentTime) {
                                video.currentTime = supposedCurrentTime;
                            }
                        });
                    }
                    this.player.seek(contTime);
                });
                this.player.on('play', () => {
                    this.videoplay = true;
                });
                this.player.on('pause', () => {
                    this.videoplay = false;
                    // this.saveLearningParams.courseId = localStorage.getItem(
                    //     'courseId',
                    // );
                    this.saveLearningLog();
                    this.clearTimeing();
                });
                this.player.on('ended', () => {
                    for (let i = 0; i < this.catelogList.length; i += 1) {
                        const item = this.catelogList[i];
                        for (let j = 0; j < item.lessonList.length; j += 1) {
                            if (
                                this.saveLearningParams.lessId
                                === item.lessonList[j].id
                            ) {
                                item.lessonList[j].complate = 1;
                            }
                        }
                    }
                    // 保存记录
                    this.saveLearningLog();
                    // this.getNextid();
                });
            });
        },
        // 清除定时器
        clearTimeing() {
            if (this.IntervalName) {
                clearInterval(this.IntervalName);
                this.IntervalName = null;
                console.log('清楚定时器');
            }
        },
        // 加入选学
        startStudy(id) {
            api.startStudy(id).then((res) => {
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
            return api.findById(id).then((res) => {
                if (res.success) {
                    const { data } = res;
                    this.courseInfo = data;
                    this.courseName = this.courseInfo.name;
                    this.findCourseItemByCourseId();
                    this.btntext = this.courseInfo.recordId
                        ? '开始学习'
                        : '加入选学';
                }
            });
        },
        // 获取目录详情
        findCourseItemByCourseId() {
            const param = {
                courseId: this.courseInfo.id,
                recordId: this.courseInfo.recordId,
            };
            api.findCourseItemByCourseId(param).then((res) => {
                const { data } = res;
                this.catelogList = data;
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
