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
                            v-if="hasvideo"
                            id="player-con"
                            style="height: 373px"
                        />
                        <!-- <iframe
                            v-if="ispdf"
                            src="https://mz-tet.oss-cn-beijing.aliyuncs.com/minzheng/doc/nginx课件v1.0.pdf"
                            style="width: 663px;height: 373px;position: absolute; left: 0px"
                        /> -->
                        <div
                            v-if="ispdf"
                            class="playCon"
                            style="position: relative;height:400px"
                        >
                            <!-- <iframe
                                id="aliyunPreview"
                                :src="pdfurl"
                                style="width: 100%;height: 100%;position: absolute;"
                            /> -->
                            <iframe
                                :src="'js/pdfjs/web/viewer.html?file=' + pdfurl"
                                style="width: 100%;height: 100%;position: absolute;"
                            />
                        </div>
                        s
                    </div>
                </div>
                <div class="right">
                    <div class="right-top">
                        <a :title="courseInfo.name">
                            {{ courseInfo.name }}
                        </a>
                        <ul class="info">
                            <li class="info-classify">
                                分类：{{ courseInfo.categoryName }}
                            </li>
                            <li class="info-classdiff">
                                课程难度：{{ courseInfo.difficulty }}
                            </li>
                        </ul>
                    </div>
                    <ul class="info1">
                        <li class="info1-keshi">
                            <span>课时：{{
                                courseInfo.lessonCount
                                    ? courseInfo.lessonCount
                                    : 0
                            }}课时</span>
                            <span>学分：{{
                                courseInfo.credit ? courseInfo.credit : 0
                            }}</span>
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
                    :key="timer"
                    ref="courseInfo"
                    :course-intro="courseInfo"
                    :catelog-list="catelogList"
                    :zhjudge="courseInfo.starAvg - 0"
                    @getrecourseId="getrecourseId"
                    @changeInfo="changeInfo"
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
import apitask from '../../api/exam';
/* eslint-disable */
export default {
    name: "CourseDetail",
    components: {
        CourseInfo
    },
    data() {
        return {
            timer: "",
            hasvideo: false,
            ispdf: false,
            pdfPage: 1,
            pdfurl: "",
            lastCourse: {},
            // changeInfo: '1',
            courseInfo: {},
            catelogList: [],
            showBtn: true,
            btntext: "加入选学",
            courseName: "",
            hasresourceURl: false,
            resourceUrl: "",
            player: null,
            continueTime: 0,
            detailparam: {
                id: null,
                taskId: null
            },
            saveLearningParams: {
                recordId: "",
                detailId: "",
                pollingTime: "15",
                curSecond: ""
            },
            IntervalName: null
        };
    },
    computed: {},
    mounted() {
        this.detailparam.id = this.$route.query.id;
        this.detailparam.taskId = this.$route.query.taskId;
        this.courseDetail(this.detailparam);
    },
    beforeDestroy() {
        this.clearTimeing();
    },
    methods: {
        changeInfo(val) {
            if (val === "2") {
                this.findCourseItemByCourseId();
            }
        },
        getPDFandYinpin(val) {
            api.getAudioOrDocUrl({ id: val.detailId }).then(res => {
                if (res.success) {
                    const { data } = res;

                    if (val.detailType === "2") {
                        this.resourceUrl = data;
                        this.ispdf = false;
                        this.hasresourceURl = this.resourceUrl.length > 0;
                        this.hasvideo = true;
                        console.log(this.resourceUrl);
                        this.$nextTick(() => {
                            this.getaliPlay(this.resourceUrl, "2");
                        });
                    } else if (val.detailType === "3") {
                        this.pdfurl = data;
                        if (
                            this.pdfurl.includes("docx") ||
                            this.pdfurl.includes("xls") ||
                            this.pdfurl.includes("ppt") ||
                            this.pdfurl.includes("txt")
                        ) {
                            this.$Message.info(
                                "文件格式暂不支持，请选择其他课程"
                            );
                            this.ispdf = false;
                            this.hasresourceURl = false;
                        } else {
                            this.ispdf = true;
                            this.hasresourceURl = true;
                            this.hasvideo = false;
                        }
                        if ($("#J_prismPlayer").length > 0) {
                            this.player.dispose();
                            $("#J_prismPlayer").remove();
                        }
                    }
                }
            });
        },
        getVideo(val) {
            api.getVideoPlayURLById({ id: val }).then(res => {
                if (res.success) {
                    const { data } = res;
                    [this.resourceUrl] = data;
                    this.ispdf = false;
                    this.hasvideo = true;
                    this.hasresourceURl = this.resourceUrl.length > 0;
                    this.$nextTick(() => {
                        this.getaliPlay(this.resourceUrl, "1");
                    });
                }
            });
        },
        // 获取资源id
        getrecourseId(val) {
            if (!val.menuFlag) {
                this.courseItemDetailId = val.courseItemDetailId;
                console.log(val.detailType);
                // 视频
                if (val.detailType === "1") {
                    this.getVideo(val.detailId);
                } else if (val.detailType === "3" || val.detailType === "2") {
                    console.log(val.detailType);
                    // 文档、音频
                    this.getPDFandYinpin(val);
                } else if (val.detailType === "4") {
                    // 试题
                    //  console.log(val);
                    this.joinScene(val);
                }
            }
        },
        // 报名考试
        joinScene(exam) {
            const params = {
                sceneId: exam.detailId,
                businessId: 1, //
                businessType: 1
                // userId: store.state.user.userInfo ? store.state.user.userInfo.id : 1000,
            };
            return apitask.joinScene(params).then(data => {
                this.$router.push({
                    name: "examDetail",
                    params: {
                        id: exam.detailId,
                        paperId: data.data
                        // type: exam.purposeType,
                    }
                });
            });
        },
        // 保存课程进度L
        saveLearningLog() {
            this.saveLearningParams.detailId = this.courseItemDetailId;
            this.saveLearningParams.recordId = this.courseInfo.recordId;
            this.saveLearningParams.maxLength = Math.round(
                this.player.getDuration()
            );
            this.saveLearningParams.curSecond = Math.round(
                this.player.getCurrentTime()
            );
            if (this.saveLearningParams.curSecond > 0) {
                return api
                    .saveLearningLog(this.saveLearningParams)
                    .then(res => {
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
        getaliPlay(courseUrl, type, seekTime, iscomplate) {
            let contTime = seekTime;
            if (!contTime) {
                contTime = 0;
            }
            $("#player-con").height("373px");
            if ($("#J_prismPlayer").length > 0) {
                this.player.dispose();
                $("#J_prismPlayer").remove();
            }
            const boarddiv = '<div id="J_prismPlayer"></div>';
            $("#player-con").append(boarddiv);
            $("#J_prismPlayer").height("100%");
            this.$nextTick(() => {
                // eslint-disable-next-line no-undef
                this.player = new Aliplayer({
                    id: "J_prismPlayer",
                    source: courseUrl,
                    width: "100%",
                    height: "500px",
                    // seek: contTime,
                    cover: "",
                    /* To set an album art, you must set 'autoplay' and 'preload' to 'false' */
                    autoplay: true,
                    preload: false,
                    isLive: false,
                    useH5Prism: true
                });
                this.player.on("error", () => {
                    this.clearTimeing();
                });
                this.player.on("ready", () => {
                    this.timing();
                    contTime =
                        contTime >= Math.round(this.player.getDuration())
                            ? "0"
                            : contTime;
                    if (!iscomplate) {
                        let video = null;
                        if (type === "2") {
                            video = document.querySelector("audio");
                        } else if (type === "1") {
                            video = document.querySelector("video");
                        }
                        video.currentTime = contTime;
                        let supposedCurrentTime = 0;
                        let maxtime = contTime;
                        // 监听当前的播放位置发送改变时触发。
                        video.addEventListener("timeupdate", () => {
                            if (video.currentTime > maxtime) {
                                maxtime = video.currentTime;
                            }
                            if (!video.seeking) {
                                supposedCurrentTime = video.currentTime;
                            }
                        });
                        // prevent user from seeking
                        // 寻址中（Seeking）指的是用户在音频/视频中移动/跳跃到新的位置。
                        video.addEventListener("seeking", () => {
                            if (maxtime < video.currentTime) {
                                video.currentTime = supposedCurrentTime;
                            }
                        });
                    }
                    this.player.seek(contTime);
                });
                this.player.on("play", () => {
                    // this.videoplay = true;
                });
                this.player.on("pause", () => {
                    // this.videoplay = false;
                    // this.saveLearningParams.courseId = localStorage.getItem(
                    //     'courseId',
                    // );
                    this.saveLearningLog();
                    // this.clearTimeing();
                });
                this.player.on("ended", () => {
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
                // console.log("清楚定时器");
            }
        },
        // 加入选学
        startStudy(id) {
            // console.log(this.btntext);
            if (this.btntext === "加入选学") {
                const param = {
                    courseId: id,
                    taskId: this.$route.query.taskId
                        ? this.$route.query.taskId
                        : ""
                };
                api.startStudy(param).then(res => {
                    if (res.success) {
                        this.btntext = "开始学习";
                        this.courseDetail(this.detailparam);
                        this.$Message.success("加入成功");
                    }
                    // console.log(res);
                });
            } else {
                this.$refs.courseInfo.changeTab("2");
                // console.log(this.$refs.courseInfo.lastCourse);
                // 如果有上次看过的记录  就继续播放上次的课程
                if (this.btntext === "继续学习") {
                    // console.log(this.getlastCourse(this.catelogList))
                    // console.log(111111111111,'继续学习')
                    setTimeout(() => {
                        this.lastCourse = this.getlastCourse(this.catelogList);
                        // }
                        // console.log(this.lastCourse);
                        this.getrecourseId(this.lastCourse);
                    }, 900);
                }
                // 没有记录  默认播放第一个
                if (this.btntext === "开始学习") {
                    setTimeout(() => {
                        this.lastCourse = this.getfirstCourse(this.catelogList);
                        // }
                        // console.log(this.lastCourse);
                        this.getrecourseId(this.lastCourse);
                    }, 900);
                }
            }
        },
        // formatDate(inputTime) {
        //     const date = new Date(inputTime);
        //     const y = date.getFullYear();
        //     let m = date.getMonth() + 1;
        //     m = m < 10 ? `0${m}` : m;
        //     let d = date.getDate();
        //     d = d < 10 ? `0${d}` : d;
        //     let h = date.getHours();
        //     h = h < 10 ? `0${h}` : h;
        //     let minute = date.getMinutes();
        //     let second = date.getSeconds();
        //     minute = minute < 10 ? `0${minute}` : minute;
        //     second = second < 10 ? `0${second}` : second;
        //     return `${y}-${m}-${d} ${h}:${minute}:${second}`;
        // },
        courseDetail(id) {
            return api.findById(id).then(res => {
                if (res.success) {
                    const { data } = res;
                    this.courseInfo = data;
                    this.courseName = this.courseInfo.name;
                    if (
                        this.courseInfo.recordId &&
                        !this.courseInfo.learningRate
                    ) {
                        this.btntext = "开始学习";
                    } else if (this.courseInfo.learningRate) {
                        this.btntext = "继续学习";
                    } else if (!this.courseInfo.recordId) {
                        this.btntext = "加入选学";
                    } else if (
                        !this.courseInfo.recordId &&
                        this.detailparam.taskId
                    ) {
                        this.btntext = "开始学习";
                    }
                    if (this.courseInfo.difficulty === 0) {
                        this.courseInfo.difficulty = "初阶";
                    } else if (this.courseInfo.difficulty === 1) {
                        this.courseInfo.difficulty = "进阶";
                    } else if (this.courseInfo.difficulty === 2) {
                        this.courseInfo.difficulty = "高阶";
                    }
                    this.timer = new Date().getTime();
                }
            });
        },
        // 获取目录详情
        findCourseItemByCourseId() {
            const param = {
                courseId: this.courseInfo.id,
                recordId: this.courseInfo.recordId
            };
            api.findCourseItemByCourseId(param).then(res => {
                const { data } = res;
                this.catelogList = data;
                // console.log(this.datachang());
            });
        },
        getlastCourse(data) {
            let result = null;
            if (!data) {
                return;
            }
            for (const i in data) {
                if (result !== null) {
                    break;
                }
                const item = data[i];
                if (item.studyProcess && item.studyProcess.isLastPlay === 1) {
                    result = item;
                    break;
                } else if (item.childrenList && item.childrenList.length > 0) {
                    result = this.getlastCourse(item.childrenList);
                }
            }
            return result;
        },
        getfirstCourse(data) {
            let result = null;
            if (!data) {
                return;
            }
            for (const i in data) {
                if (result !== null) {
                    break;
                }
                const item = data[i];
                if (!item.menuFlag) {
                    result = item;
                    break;
                } else if (item.childrenList && item.childrenList.length > 0) {
                    result = this.getfirstCourse(item.childrenList);
                }
            }
            return result;
        }
    }
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
