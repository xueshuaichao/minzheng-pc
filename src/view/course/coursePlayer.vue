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
            <i-breadcrumb-item
                :to="{
                    name: 'courseDetail',
                    params: { id: this.$route.params.id }
                }"
            >
                课程详情
            </i-breadcrumb-item>
            <i-breadcrumb-item>
                {{ courseName }}
            </i-breadcrumb-item>
        </i-breadcrumb>
        <div class="course-play">
            <h2>{{ courseName }}</h2>
            <div class="clearfix">
                <div class="content-left">
                    <div
                        id="player-con"
                        style="height: 440px"
                    />
                    <div
                        v-if="isfinish"
                        class="playend"
                    >
                        <div class="playend-content">
                            <h2>本课程播放结束</h2>
                        </div>
                    </div>
                </div>
                <div class="content-right">
                    <div class="course-list">
                        <h4>课程目录</h4>
                        <ul
                            v-for="lesson in catelogList"
                            :key="lesson.id"
                        >
                            <li
                                v-for="item in lesson.lessonList"
                                :key="item.id"
                                class="clearfix color1"
                                :class="playid === item.id ? 'color1' : ''"
                                @click="
                                    getVideoUrl(
                                        item.resourceId,
                                        item.id,
                                        null,
                                        item.complate
                                    )
                                "
                            >
                                <img
                                    src=""
                                    alt=""
                                >
                                <div
                                    class="item-info"
                                    :class="[
                                        {
                                            color2:
                                                saveLearningParams.lessId ===
                                                item.id
                                        },
                                        { color1: item.complate },
                                        {
                                            color3:
                                                saveLearningParams.lessId !==
                                                item.id && !item.complate
                                        }
                                    ]"
                                >
                                    <p class="item-name">
                                        {{ item.title }}
                                    </p>
                                    <p class="_clearfix">
                                        <span
                                            v-if="
                                                item.complate &&
                                                    resourceid !==
                                                    item.resourceId
                                            "
                                            class="status"
                                        >已完成</span>
                                        <span
                                            v-if="
                                                resourceid === item.resourceId
                                            "
                                            class="statusBtn"
                                        >
                                            播放中
                                        </span>
                                        <span class="num">
                                            第{{ lesson.index
                                            }}{{ lesson.typeName }}第{{
                                                item.index
                                            }}{{ item.typeName }}</span>
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import './index.less';
import api from '../../api/course';

export default {
    name: 'Courseplayer',
    data() {
        return {
            resourceid: null,
            isfinish: false,
            playid: null,
            catelogList: [],
            courseName: '',
            playend: false,
            courseUrl: null,
            loopList: [],
            nextCourseId: null,
            nextLessionId: null,
            player: null,
            saveLearningParams: {
                courseId: null,
                lessId: null,
                curSecond: null, // 观看秒数
            },
            IntervalName: {}, // 自动保存
            learningLog: [], // 上课记录
            hasContinue: false,
            continueTime: 0,
        };
    },
    mounted() {
        this.courseName = this.$route.params.name;
        this.getCourseList();
        this.timing();
    },
    beforeDestroy() {
        clearInterval(this.IntervalName);
        this.IntervalName = null;
    },
    methods: {
        // 查询上课记录,用来显示右侧目录课程的观看情况
        findLearningLog() {
            localStorage.setItem('token', 'f3e171a4e06f492d93cb328bbeec2dd1');
            return api.findLearningLog(this.$route.params.id).then((res) => {
                const { data } = res;
                if (res.success) {
                    this.learningLog = data;
                    if (this.learningLog.length > 0) {
                        for (let i = 0; i < this.learningLog.length; i += 1) {
                            for (
                                let j = 0;
                                j < this.catelogList.length;
                                j += 1
                            ) {
                                for (
                                    let o = 0;
                                    o < this.catelogList[j].lessonList.length;
                                    o += 1
                                ) {
                                    // eslint-disable-next-line max-len
                                    if (
                                        this.learningLog[i].isComplete === 1
                                        && this.learningLog[i].lessonId
                                            === this.catelogList[j].lessonList[o].id
                                    ) {
                                        // 显示已完成按钮
                                        this.catelogList[j].lessonList[
                                            o
                                        ].complate = 1;
                                        this.$forceUpdate();
                                    }
                                    // uniqueMark为1时，表示上次退出时观看的本次视频，用于继续播放
                                    if (this.learningLog[i].uniqueMark === 1) {
                                        this.hasContinue = true;
                                        this.continueTime = this.learningLog[
                                            i
                                        ].learningTime;
                                        this.resourceid = this.learningLog[
                                            i
                                        ].resourceId;
                                        this.saveLearningParams.lessId = this.learningLog[
                                            i
                                        ].lessonId;
                                        this.getVideoUrl(
                                            this.resourceid,
                                            this.saveLearningParams.lessId,
                                            'continue',
                                            this.learningLog[i].isComplete,
                                        );
                                    }
                                }
                            }
                        }
                    }
                }
            });
        },
        // 检查用户是否上完此课程
        checkComplete() {
            localStorage.setItem('token', 'f3e171a4e06f492d93cb328bbeec2dd1');
            return api
                .checkAndSignCompleteCourse(this.$route.params.id)
                .then((res) => {
                    if (
                        res.success
                        && res.code === 0
                        && this.$route.params.type === '必修'
                    ) {
                        this.checkRequiredClass();
                    }
                });
        },
        // 查看用户是否学完必修课
        checkRequiredClass() {
            return api.checkUserFinishRequiredClassHour().then((res) => {
                if (res.success && res.code === 0) {
                    this.findRecordByUserId();
                }
            });
        },
        // 查看用户下是否有问卷
        findRecordByUserId() {
            return api
                .findRecordByUserId({
                    userId: '',
                    purposeType: 2,
                })
                .then((res) => {
                    const { data } = res;
                    if (data.list.length > 0) {
                        this.$Modal.info({
                            title: '友情提示',
                            content:
                                '<p>恭喜您，本次学习中的必修课程已全部结束，您还需要参加一个问卷调查</p><p>方可获得结业证书，请与个人中心-我的任务中查看</p>',
                        });
                    }
                });
        },
        // 每隔15秒保存一下学习记录
        timing() {
            this.IntervalName = setInterval(() => {
                this.saveLearning();
            }, 15000);
        },
        // 保存学习记录的时候调
        saveLearning() {
            this.saveLearningParams.courseId = this.$route.params.id;
            this.saveLearningParams.curSecond = Math.round(
                this.player.getCurrentTime(),
            );
            localStorage.setItem('token', 'f3e171a4e06f492d93cb328bbeec2dd1');
            return api
                .saveUserCourseLearningLog(this.saveLearningParams)
                .then(() => {});
        },
        // 获取所有课程列表
        getAllCourseList() {
            for (let i = 0; i < this.catelogList.length; i += 1) {
                const item = this.catelogList[i];
                for (let j = 0; j < item.lessonList.length; j += 1) {
                    const arr = item.lessonList[j];
                    this.loopList.push(arr);
                }
            }
        },
        getNextid() {
            for (let arr = 0; arr < this.loopList.length; arr += 1) {
                if (this.resourceid === this.loopList[arr].resourceId) {
                    if (arr < this.loopList.length - 1) {
                        this.nextCourseId = this.loopList[arr + 1].resourceId;
                        this.nextLessionId = this.loopList[arr + 1].id;
                        console.log(this.loopList[arr + 1]);
                        this.getVideoUrl(
                            this.nextCourseId,
                            this.nextLessionId,
                            'auto',
                            this.loopList[arr + 1].complate,
                        );
                    } else {
                        return false;
                    }
                    return false;
                }
            }
            return true;
        },
        getaliPlay(courseUrl, seekTime, iscomplate) {
            let contTime = seekTime;
            if (!contTime) {
                contTime = 0;
            }
            $('#player-con').height('440px');
            if ($('#J_prismPlayer').length > 0) {
                this.player.dispose();
                $('#J_prismPlayer').remove();
            }
            const boarddiv = '<div id="J_prismPlayer"></div>';
            $('#player-con').append(boarddiv);
            $('#J_prismPlayer').height('100%');
            // eslint-disable-next-line no-undef
            this.player = new Aliplayer({
                id: 'J_prismPlayer',
                source: courseUrl,
                width: '100%',
                height: '500px',
                seek: contTime,
                cover: '',
                /* To set an album art, you must set 'autoplay' and 'preload' to 'false' */
                autoplay: true,
                preload: false,
                isLive: false,
                useH5Prism: true,
            });
            this.player.on('ready', () => {
                if (!iscomplate) {
                    $('.prism-progress').css({
                        height: '0',
                        overflow: 'hidden',
                    });
                }
                this.player.seek(contTime);
            });
            this.player.on('pause', () => {
                clearInterval(this.IntervalCount);
                this.IntervalCount = null;
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
                this.saveLearning();
                this.getNextid();
                this.checkComplete();
            });
        },
        getCourseList() {
            return api
                .findCourseItemByCourseId({
                    courseId: this.$route.params.id,
                })
                .then((res) => {
                    if (res.success) {
                        const { data } = res;
                        this.catelogList = data;
                        this.findLearningLog();
                        if (this.$route.params.resourceId) {
                            this.resourceid = this.$route.params.resourceId;
                            this.saveLearningParams.lessId = this.$route.params.lessonId;
                        } else {
                            this.resourceid = data[0].lessonList[0].resourceId;
                            this.saveLearningParams.lessId = data[0].lessonList[0].id;
                        }
                        // 上次没有未看完的视频时
                        if (!this.hasContinue) {
                            this.getVideoUrl(
                                this.resourceid,
                                this.saveLearningParams.lessId,
                            );
                        }
                        this.getAllCourseList();
                    }
                });
        },
        getVideoUrl(resourceid, lessonId, type, iscomplate) {
            this.resourceid = resourceid;
            this.saveLearningParams.lessId = lessonId;
            localStorage.setItem('token', 'f3e171a4e06f492d93cb328bbeec2dd1');
            return api.getVideoUrlByResourceId(resourceid).then((res) => {
                const { data } = res;
                if (res.success) {
                    if (data.videoUrlList) {
                        // eslint-disable-next-line prefer-destructuring
                        this.courseUrl = data.videoUrlList[0];
                        if (!type) {
                            this.getaliPlay(this.courseUrl, null, iscomplate);
                        } else if (type === 'auto') {
                            this.continueTime = 0;
                            this.getaliPlay(this.courseUrl, null, iscomplate);
                            this.player.loadByUrl(this.courseUrl);
                        } else if (type === 'continue') {
                            this.getaliPlay(
                                this.courseUrl,
                                this.continueTime,
                                iscomplate,
                            );
                        }
                    }
                }
            });
        },
    },
};
</script>
