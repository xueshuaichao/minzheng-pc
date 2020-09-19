<template>
    <div class="home m-container">
        <div class="block1 clearfix">
            <div class="left fl clearfix">
                <div class="tab is-left fl">
                    <div
                        class="active-bar"
                        :style="{ transform: `translateY(${tabIndex * 72}px)` }"
                    />
                    <div
                        v-for="(tab, index) in tabs"
                        :key="tab"
                        class="tab-item"
                        :class="{ active: tabIndex == index }"
                        @click="tabClick(index)"
                    >
                        {{ tab }}
                        <img
                            v-if="tabIndex == index"
                            src="../../assets/images/home/bottom-line.png"
                        >
                    </div>
                </div>
                <div class="tab-content">
                    <div
                        v-show="tabIndex == 0"
                        class="tab-pane notice"
                    >
                        <router-link
                            :to="{ name: 'noticeList' }"
                            class="cate-title"
                        >
                            通知公告
                        </router-link>
                        <router-link
                            v-for="(notice, index) in noticeList"
                            :key="index"
                            :to="{
                                name: 'noticeDetail',
                                params: { id: notice.id }
                            }"
                            class="clearfix notice-item"
                        >
                            <span class="fr">{{
                                notice.updateTime.split(" ")[0]
                            }}</span>
                            <div class="notice-title ellipsis">
                                {{ notice.title }}
                            </div>
                        </router-link>
                    </div>
                    <div
                        v-show="tabIndex == 1"
                        class="tab-pane policy"
                    >
                        <router-link
                            :to="{ name: 'policyList' }"
                            class="cate-title"
                        >
                            政策法规
                        </router-link>
                        <router-link
                            v-for="(policy, index) in policyList"
                            :key="index"
                            :to="{
                                name: 'policyDetail',
                                params: { id: policy.id }
                            }"
                            class="clearfix notice-item"
                        >
                            <span class="fr">{{
                                policy.updateTime.split(" ")[0]
                            }}</span>
                            <div class="notice-title ellipsis">
                                {{ policy.title }}
                            </div>
                        </router-link>
                    </div>
                    <div
                        v-show="tabIndex == 2"
                        class="tab-pane"
                    >
                        <div class="course-category">
                            <div
                                v-for="level1 in category"
                                :key="level1.id"
                                class="level-1"
                            >
                                <router-link
                                    :to="{
                                        name: 'courseList',
                                        query: { cate: level1.id }
                                    }"
                                >
                                    {{ level1.name }}
                                </router-link>
                                <div class="level-2">
                                    <span
                                        v-for="level2 in level1.children"
                                        :key="level2.id"
                                    >{{ level2.name }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        v-show="tabIndex == 3"
                        class="tab-pane exam"
                    >
                        <div
                            v-if="examList.length > 0"
                            class="exam"
                            @click="joinScene(examList[0])"
                        >
                            <p>{{ examList[0].name }}</p>
                            <span class="text">点击进入考试</span>
                        </div>
                        <div class="exam1">
                            <p>推荐能力测试</p>
                            <div
                                v-for="(item, index) in examList"
                                v-show="index > 0"
                                :key="index"
                                class="img"
                                @click="joinScene(item)"
                            >
                                {{ item.name }}
                                <span class="text">点击进入考试</span>
                            </div>
                        </div>
                    </div>
                    <div
                        v-show="tabIndex == 4"
                        class="tab-pane system"
                    >
                        <router-link
                            class="course-system"
                            :to="{ name: 'courseFramework' }"
                        >
                            <img src="../../assets/images/home/system.png">
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="login-pannel fr">
                <login-form
                    v-if="!userInfo"
                    @forgetPassword="forgetPassword"
                    @identity="identity"
                />

                <div
                    v-else
                    class="has-login"
                >
                    <div>
                        <div class="pic">
                            <img
                                :src="
                                    !userInfo.picture
                                        ? defaultpicture
                                        : userInfo.picture
                                "
                                class="picture"
                            >
                            <img
                                src="../../assets/images/home/icon-authentication.png"
                                class="authentication"
                            >
                        </div>
                        <div class="username">
                            <p class="name">
                                {{ userInfo.username }}
                            </p>
                            <p>欢迎回来，下午好！</p>
                        </div>
                        <div
                            v-if="userCourseHour != ''"
                            class="study"
                        >
                            <p class="title">
                                您的学习进度
                            </p>
                            <div class="required study-progress">
                                必修课程
                                <p>
                                    <span class="progress" />
                                    <span
                                        class="ywc"
                                        :style="{
                                            width:
                                                userCourseHour.requiredTotalUsedPercent
                                        }"
                                    />
                                    <span
                                        class="wwc"
                                        :style="{
                                            width:
                                                userCourseHour.requiredFrozenCourseHours
                                        }"
                                    />
                                    <span
                                        class="text"
                                    >剩余{{
                                        userCourseHour.requiredOddCourseHours
                                    }}学时</span>
                                </p>
                            </div>
                            <div class="elective study-progress">
                                选修课程
                                <p>
                                    <span class="progress" />
                                    <span
                                        class="ywc"
                                        :style="{
                                            width:
                                                userCourseHour.optionalTotalUsedPercent
                                        }"
                                    />
                                    <span
                                        class="wwc"
                                        :style="{
                                            width:
                                                userCourseHour.optionalFrozenCourseHours
                                        }"
                                    />
                                    <span
                                        class="text"
                                    >剩余{{
                                        userCourseHour.optionalOddCourseHours
                                    }}学时</span>
                                </p>
                            </div>
                            <div class="show">
                                <p class="ywc">
                                    <span class="ywc-1" />
                                    已完成课程
                                </p>
                                <p class="wwc">
                                    <span class="wwc-1" />
                                    已开始未完成课程
                                </p>
                            </div>
                            <i-button
                                type="primary"
                                size="large"
                                long
                                class="study-btn"
                                @click="studyClick"
                            >
                                开始学习
                            </i-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="!userInfo">
            <div class="steps">
                <span class="step-title">
                    流程速览
                </span>
                <span class="step-index"><em>1</em></span>
                <div
                    class="step-divider"
                    style="width: 175px"
                />
                <span class="step-index"><em>2</em></span>
                <div
                    class="step-divider"
                    style="width: 265px"
                />
                <span class="step-index"><em>3</em></span>
                <div
                    class="step-divider"
                    style="width: 265px"
                />
                <span class="step-index"><em>4</em></span>
                <div
                    class="step-divider"
                    style="width: 260px"
                />
            </div>
            <div class="step-detail">
                <div class="step-content step1">
                    <h4>注册账号</h4>
                    <p>通过手机号即可注册账号</p>
                    <p>注册后体验更多功能</p>
                </div>
                <div class="step-content step2">
                    <h4>认证账号</h4>
                    <p>通过身份证完成账户激活</p>
                    <p>仅针对培训计划内退役军人有效</p>
                </div>
                <div class="step-content step3">
                    <h4>学习必修课程</h4>
                    <p>进入教育培训完成必修课程</p>
                    <p>请在首次登录30天内完成必修课程</p>
                </div>
                <div class="step-content step4">
                    <h4>获得证书</h4>
                    <p>完成我的任务后可获得证书</p>
                    <p>证书将作为年审及后续服务的条件之一</p>
                </div>
            </div>
        </div>
        <div
            v-else
            class="task"
        >
            <p class="task-title">
                我的任务
            </p>
            <!-- 必修 -->
            <div
                v-if="taskcourseDetail != ''"
                class="list required-list"
            >
                <p class="title">
                    {{ taskcourseDetail.courseName }}
                </p>
                <p v-if="taskcourseDetail.lastStudyLog != null">
                    上次学到：第二章 第3讲
                </p>
                <p class="studyBtn">
                    继续学习 >>
                </p>
            </div>
            <!-- 考试 -->
            <!-- <div class="list exam-list">
                <p class="title">
                    课程名称考试名称问卷名称课程名称考试名称问…
                </p>
                <p>上次学到：第二章 第3讲</p>
                <p class="studyBtn">
                    继续学习 >>
                </p>
            </div> -->
            <!-- 问卷 -->
            <!-- <div class="list questionnaire-list">
                <p class="title">
                    课程名称考试名称问卷名称课程名称考试名称问…
                </p>
                <p>上次学到：第二章 第3讲</p>
                <p class="studyBtn">
                    继续学习 >>
                </p>
            </div> -->
            <!-- 证书 -->
            <!-- <div class="list certificate-list">
                <p class="title">
                    课程名称考试名称问卷名称课程名称考试名称问…
                </p>
                <p>上次学到：第二章 第3讲</p>
                <p>继续学习 >></p>
            </div> -->
        </div>

        <find-password-modal v-model="showPasswordModal" />
        <register-modal v-model="showRegisterModal" />
    </div>
</template>

<script>
// import { mapState } from 'vuex';
import store from '../../store/index';
import noticeApi from '../../api/notice';
import learningApi from '../../api/learning';

import examApi from '../../api/exam';
import api from '../../api/home';
import loginForm from './login-form.vue';
import findPasswordModal from './findPassword.vue';
import registerModal from './register.vue';

export default {
    components: {
        loginForm,
        findPasswordModal,
        registerModal,
    },
    data() {
        return {
            tabs: ['通知公告', '政策法规', '培训课程', '阶段考试', '课程体系'],
            tabIndex: 0,
            defaultpicture: require('../../assets/images/home/portrait.png'),
            noticeList: [],
            policyList: [],
            category: [],
            pageNum: 1,
            pageSize: 4,
            scene: {
                purposeType: 1, // 用途类型：1.考试，2.问卷
                sceneCategoryId: 0, // 考试（问卷）分类ID
            },
            examDetail: '',
            examList: [],
            showPasswordModal: false,
            showRegisterModal: false,
            userName: '',
            userInfo: null,
            userCourseHour: '',
            isComplete: 0,
            courseType: 0,
            taskcourseDetail: '',
        };
    },

    // computed: {
    //     ...mapState('user', ['userInfo']),
    // },
    watch: {
        '$store.state.user.userInfo': {
            handler(newval) {
                console.log(newval, 'newval');
                this.userInfo = newval;
                this.findUserCourseHour();
            },
            deep: true,
        },
    },
    created() {
        this.getNoticeList(0);
        this.getCategoryList();
        this.getExamList();
        this.userInfo = store.state.user.userInfo;
        if (localStorage.getItem('token')) {
            this.findUserCourseHour();
            this.findMyCourseOrderInfo();
        }
    },
    methods: {
        // 课程列表
        findMyCourseOrderInfo() {
            return learningApi
                .findMyCourseOrderInfo(this.isComplete, this.courseType)
                .then((data) => {
                    const index = 0;
                    this.taskcourseDetail = data.data[index];
                });
        },
        studyClick() {
            this.$router.push({
                name: 'learning',
            });
        },
        // 开始考试
        joinScene(exam) {
            const params = {
                sceneId: exam.id,
                userId: 0,
            };
            return examApi.joinScene(params).then((data) => {
                if (data.success) {
                    this.$router.push({
                        name: 'examDetail',
                        params: {
                            id: exam.id,
                            paperId: data.data,
                        },
                    });
                }
            });
        },
        // 获取学习进度
        findUserCourseHour() {
            return api.findUserCourseHour().then((data) => {
                if (data.success) {
                    this.userCourseHour = data.data;
                }
            });
        },
        // 阶段测试列表
        getExamList() {
            return examApi
                .getExamList(this.pageNum, this.pageSize, this.scene)
                .then((list) => {
                    this.examList = list.data.list.slice(0, 4);
                });
        },
        // 一级分类
        getCategoryList() {
            return examApi.getCategoryList().then((list) => {
                this.category = list.data;
            });
        },
        // 二级分类
        // getCategoryList2(id) {
        //     return api.getCategoryList2({ sceneCategoryId: id }).then((list) => {
        //         this.classifyList = list.data;
        //     });
        // },
        identity() {
            console.log(this.showRegisterModal, 'identity');
            this.$nextTick(() => {
                this.showRegisterModal = true;
            });
        },
        forgetPassword() {
            this.$nextTick(() => {
                this.showPasswordModal = true;
            });
        },
        tabClick(index) {
            this.tabIndex = index;
            if (this.tabIndex === 1) {
                this.getNoticeList(1);
            }
        },
        getNoticeList(type1) {
            return noticeApi.getNoticeList({ type: type1 }).then((data) => {
                if (this.tabIndex === 0) {
                    this.noticeList = data.data;
                } else if (this.tabIndex === 1) {
                    this.policyList = data.data;
                }
            });
        },
    },
};
</script>

<style lang="less" scoped>
@import "../../less/variables.less";

.home {
    margin-top: 14px;
}
.block1 {
    height: 360px;
    .left {
        width: 782px;
    }
    .left,
    .login-pannel {
        height: 100%;
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
    }
}
.task {
    margin-top: 15px;
    overflow: hidden;
    margin-bottom: 20px;
    .task-title {
        font-size: 18px;
        font-weight: 500;
        color: @mainColor;
        line-height: 25px;
        margin-bottom: 7px;
    }
    .list {
        float: left;
        width: 267px;
        height: 168px;
        background-size: 100%;
        margin-right: 15px;
        box-sizing: border-box;
        padding: 16px 21px 0 70px;
        position: relative;
    }
    .studyBtn {
        position: absolute;
        bottom: 21px;
        right: 26px;
        font-size: 14px;
        font-weight: 500;
        color: rgba(23, 56, 140, 1);
        line-height: 20px;
    }
    .required-list {
        background-image: url(../../assets/images/home/required-bg.png);
    }
    .exam-list {
        background-image: url(../../assets/images/home/exam-bg.png);
    }
    .questionnaire-list {
        background-image: url(../../assets/images/home/questionnaire-bg.png);
    }
    .certificate-list {
        width: 324px;
        height: 160px;
        margin-right: 0;
        padding-top: 25px;
        padding-left: 125px;
        background-image: url(../../assets/images/home/certificate-bg.png);
    }
}
.login-pannel {
    width: 380px;
    padding-top: 32px;
    .has-login {
        padding: 0 40px;
        .pic {
            position: relative;
            display: inline-block;
            vertical-align: middle;
            img {
                width: 70px;
            }
            .authentication {
                position: absolute;
                width: 48px;
                bottom: 0;
                right: -10px;
            }
        }
        .username {
            display: inline-block;
            vertical-align: middle;
            margin-left: 32px;
            p {
                font-size: 14px;
                font-weight: 400;
                color: @textColor3;
            }
            .name {
                font-size: 18px;
                line-height: 25px;
                letter-spacing: 1px;
                color: @textColor1;
            }
        }
        .study {
            margin-top: 15px;
            .title {
                font-size: 14px;
                font-weight: 500;
                color: @mainColor;
                line-height: 20px;
                margin-bottom: 7px;
            }
            .study-progress {
                font-size: 14px;
                font-weight: 400;
                color: @textColor2;
                line-height: 20px;
                margin-bottom: 15px;
                vertical-align: middle;
                p {
                    width: 228px;
                    height: 15px;
                    position: relative;
                    vertical-align: middle;
                    display: inline-block;
                    span {
                        display: inline-block;
                        width: 100%;
                        height: 100%;
                        border: 2px;
                        position: absolute;
                        top: 0;
                        left: 0;
                    }
                    .progress {
                        background: rgba(243, 243, 243, 1);
                        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.08);
                    }
                    .wwc {
                        background: linear-gradient(
                            180deg,
                            rgba(222, 228, 244, 1) 0%,
                            rgba(187, 200, 233, 1) 100%
                        );
                        z-index: 2;
                    }
                    .ywc {
                        background: linear-gradient(
                            180deg,
                            rgba(163, 191, 255, 1) 0%,
                            rgba(88, 130, 238, 1) 100%
                        );
                        z-index: 3;
                    }
                    .text {
                        text-align: right;
                        font-size: 10px;
                        font-weight: 500;
                        color: rgba(43, 51, 59, 1);
                        line-height: 15px;
                        z-index: 5;
                    }
                }
            }
            .show {
                margin-top: 25px;
                p {
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 20px;
                    color: @textColor2;
                    display: inline-block;
                    vertical-align: middle;
                    span {
                        display: inline-block;
                        width: 15px;
                        height: 15px;
                        border-radius: 2px;
                        vertical-align: middle;
                        margin-right: 3px;
                    }
                    &.ywc {
                        margin-right: 60px;
                    }
                    .ywc-1 {
                        background: rgba(88, 130, 238, 1);
                    }
                    .wwc-1 {
                        background: rgba(212, 224, 255, 1);
                    }
                }
            }
            .study-btn {
                width: 100%;
                height: 48px;
                font-size: 18px;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                line-height: 48px;
                letter-spacing: 1px;
                margin-top: 20px;
            }
        }
    }
}
.tab {
    position: relative;
    width: 120px;
    .active-bar {
        position: absolute;
        left: 0;
        width: 6px;
        height: 72px;
        background: @mainColor;
        transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    .tab-item {
        height: 72px;
        line-height: 72px;
        text-align: center;
        font-size: 18px;
        cursor: pointer;
        &.active {
            color: @mainColor;
            width: 141px;
            position: relative;
            img {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 122px;
            }
        }
    }
}
.tab-content {
    margin-left: 120px;
    // padding: 24px 30px 30px 16px;
    .tab-pane {
        padding: 24px 30px 30px 16px;
    }
    .system {
        padding: 17px;
    }
    .exam {
        padding: 17px;
        color: #fff;
        .exam {
            width: 247.2px;
            height: 148.8px;
            background: url(../../assets/images/home/bg1.png) no-repeat;
            background-size: 100%;
            margin-bottom: 16px;
            text-align: center;
            line-height: 148.8px;
            position: relative;
            font-size: 12px;
            font-family: FZLTCHJW--GB1-0, FZLTCHJW--GB1;
            font-weight: normal;
            cursor: pointer;
        }
        .exam1 {
            p {
                font-size: 18px;
                font-weight: 500;
                color: rgba(23, 56, 140, 1);
                line-height: 25px;
                letter-spacing: 1px;
                border-bottom: 2px solid @mainColor;
            }
            .img {
                width: 32.3%;
                height: 124px;
                text-align: center;
                line-height: 124px;
                position: relative;
                background: url(../../assets/images/home/bg1.png) no-repeat;
                background-size: 100% 100%;
                float: left;
                margin-top: 16px;
                margin-right: 8px;
                font-size: 12px;
                font-family: FZLTCHJW--GB1-0, FZLTCHJW--GB1;
                font-weight: normal;
                cursor: pointer;
                &:nth-child(5) {
                    margin-right: 0;
                }
            }
        }
        .text {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 118px;
            height: 30px;
            background: rgba(0, 0, 0, 0.7);
            box-shadow: -1px -1px 5px 0px rgba(0, 0, 0, 0.2);
            border-radius: 7px 0px 7px 0px;
            line-height: 30px;
            font-size: 14px;
            color: #fff;
            font-weight: 500;
        }
    }
}
.cate-title {
    display: block;
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 500;
}
.notice-item {
    margin-bottom: 15px;
    font-size: 18px;
    color: @blue;
    display: block;
    height: 25px;
    &:hover {
        color: @mainColor;
    }
}
.notice-title {
    margin-right: 85px;
}

.course-category {
    font-size: 16px;
    line-height: 22px;
    color: #4769c0;
    .level-1 {
        margin-top: 8px;
        color: #4769c0;
        &:nth-child(1) {
            margin-top: 0;
        }
    }
    .level-2 span {
        display: inline-block;
        margin-top: 8px;
        margin-right: 16px;
        color: @textColor2;
    }
}
.course-system {
    width: 100%;
    img {
        width: 100%;
        cursor: pointer;
    }
}
.steps {
    margin-top: 20px;
}
.step-title {
    font-size: 18px;
    line-height: 25px;
    color: @mainColor;
    margin-right: 5px;
}
.step-index {
    position: relative;
    display: inline-block;
    width: 22px;
    height: 22px;
    line-height: 22px;
    color: #fff;
    text-align: center;
    border-radius: 50%;
    background: #7bacf4;
    &::before {
        position: absolute;
        content: "";
        width: 14px;
        height: 14px;
        right: 0;
        top: 4px;
        border-radius: 50%;
        background: rgba(71, 105, 192, 0.6);
    }
    em {
        position: relative;
        z-index: 1;
        font-weight: bold;
        font-style: normal;
    }
}
.step-divider {
    display: inline-block;
    height: 0;
    font-size: 0;
    margin: 0 8px;
    vertical-align: middle;
    border: 1px dashed #3f6bb4;
}
.step-detail {
    height: 126px;
    margin: 15px 0 50px;
    h4 {
        color: @mainColor;
        font-size: 20px;
        line-height: 1;
        padding: 36px 0 8px;
    }
    p {
        margin: 0;
        padding: 0;
        font-size: 10px;
    }
    .step-content {
        float: left;
        width: 295px;
        height: 100%;
        padding-right: 16px;
        margin-right: 5px;
        background: 0 0 no-repeat;
        background-size: cover;
    }
    .step1 {
        padding-left: 136px;
        background-image: url(../../assets/images/home/step1@2x.png);
    }
    .step2 {
        padding-left: 114px;
        background-image: url(../../assets/images/home/step2@2x.png);
    }
    .step3 {
        padding-left: 130px;
        background-image: url(../../assets/images/home/step3@2x.png);
    }
    .step4 {
        padding-left: 120px;
        background-image: url(../../assets/images/home/step4@2x.png);
    }
}
</style>
