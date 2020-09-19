<template>
    <div class="learning m-container">
        <i-breadcrumb
            class="g-breadcrumb"
            separator=">"
        >
            <i-breadcrumb-item to="/">
                首页
            </i-breadcrumb-item>
            <i-breadcrumb-item>
                个人中心
            </i-breadcrumb-item>
        </i-breadcrumb>
        <div class="learning-box">
            <div class="learning-top">
                <div
                    v-if="userInfo"
                    class="learning-left"
                >
                    <img
                        :src="
                            !userInfo.picture
                                ? defaultpicture
                                : userInfo.picture
                        "
                        class="portrait"
                        alt=""
                    >
                    <span
                        class="user-name"
                    >亲爱的 ，{{ userInfo.username }}</span>
                </div>
                <div
                    v-if="userCourseHour != ''"
                    class="learning-right"
                >
                    <div class="time-box">
                        <div>
                            <p class="text">
                                剩余学时
                            </p>
                            <p class="time">
                                {{
                                    userCourseHour.requiredOddCourseHours +
                                        userCourseHour.optionalOddCourseHours
                                }}
                                <span>h</span>
                            </p>
                        </div>
                        <div>
                            <p class="text">
                                已学学时
                            </p>
                            <p class="time">
                                {{
                                    userCourseHour.optionalTotalUsedPercent +
                                        userCourseHour.optionalFrozenCourseHours +
                                        userCourseHour.requiredTotalUsedPercent +
                                        userCourseHour.requiredFrozenCourseHours
                                }}
                                <span>h</span>
                            </p>
                        </div>
                    </div>
                    <div class="time-box">
                        <div>
                            <p class="text">
                                必修学时
                            </p>
                            <p class="time">
                                {{ userCourseHour.requiredTotalCourseHours }}
                                <span>h</span>
                            </p>
                        </div>
                        <div>
                            <p class="text">
                                选修学时
                            </p>
                            <p class="time">
                                {{ userCourseHour.optionalTotalCourseHours }}
                                <span>h</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="learning-buttom">
                <div class="left">
                    <div
                        v-for="(item, index) in tabs"
                        :key="index"
                        class="tab-item"
                        :class="{ active: tabIndex == index }"
                        @click="tabClick(index)"
                    >
                        <img
                            :src="[tabIndex == index ? item.img2 : item.img1]"
                            alt=""
                        >
                        <span :class="{ active: tabIndex == index }">{{
                            item.name
                        }}</span>
                    </div>
                </div>
                <div class="right">
                    <div class="tab-box">
                        <div
                            v-show="tabIndex == 0"
                            class="tab-page task"
                        >
                            <task ref="task" />
                        </div>
                        <div
                            v-show="tabIndex == 1"
                            class="tab-page certificate"
                        >
                            <div class="certificate-btn">
                                <i-button
                                    class="btn"
                                    @click="printClick"
                                >
                                    打印
                                </i-button>
                                <i-button
                                    class="btn"
                                    @click="exportClick"
                                >
                                    导出
                                </i-button>
                            </div>
                            <div
                                v-if="certificate"
                                ref="imageWrapper"
                                class="certificateImg"
                            >
                                <p class="userName">
                                    {{ certificate.userName }}
                                </p>
                                <p class="certificateNo">
                                    {{ certificate.certificateNo }}
                                </p>
                                <p class="issueDate">
                                    {{ certificate.issueDate.split(" ")[0] }}
                                </p>
                            </div>
                        </div>
                        <div
                            v-show="tabIndex == 2"
                            class="tab-page record"
                        >
                            <record ref="record" />
                        </div>
                        <div
                            v-show="tabIndex == 3"
                            class="tab-page information"
                        >
                            <div class="reminder">
                                <h1>友情提示</h1>
                                <p>
                                    1.
                                    此信息仅用于建立学籍档案和就业创业服务，我们将妥善保管。<br>
                                    2.请真实填写，并与报道时提报内容一致。<br>
                                    3.内容如有变化，可在个人资料中修改。<br>
                                </p>
                            </div>
                            <information
                                ref="information"
                                :information-show="informationShow"
                            />
                        </div>
                        <div
                            v-show="tabIndex == 4"
                            class="tab-page security"
                        >
                            <div class="reminder">
                                <h1>友情提示</h1>
                                <p>
                                    1.
                                    此信息仅用于建立学籍档案和就业创业服务，我们将妥善保管。<br>
                                    2.请真实填写，并与报道时提报内容一致。<br>
                                    3.内容如有变化，可在个人资料中修改。<br>
                                </p>
                            </div>
                            <security
                                ref="security"
                                :information-show="informationShow"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import html2canvas from 'html2canvas';
import information from './information.vue';
import security from './security.vue';
import task from './task.vue';
import record from './record.vue';
import store from '../../store';
import api from '../../api/learning';
import homeApi from '../../api/home';

export default {
    components: {
        information,
        task,
        record,
        security,
    },
    data() {
        return {
            informationShow: false,
            defaultpicture: require('../../assets/images/home/portrait.png'),
            resultShow: false,
            certificate: null,
            recordIndex: 0,
            recordTab: ['必修课程', '选修课程', '考试'],
            recordList: [],
            tabIndex: 0,
            userInfo: null,
            tabs: [
                {
                    img1: require('../../assets/images/learning/task-1.png'),
                    img2: require('../../assets/images/learning/task-2.png'),
                    name: '我的任务',
                },
                {
                    img1: require('../../assets/images/learning/certificate-1.png'),
                    img2: require('../../assets/images/learning/certificate-2.png'),
                    name: '我的证书',
                },
                {
                    img1: require('../../assets/images/learning/record-1.png'),
                    img2: require('../../assets/images/learning/record-2.png'),
                    name: '我的记录',
                },
                {
                    img1: require('../../assets/images/learning/data-1.png'),
                    img2: require('../../assets/images/learning/data-2.png'),
                    name: '个人资料',
                },
                {
                    img1: require('../../assets/images/learning/security-1.png'),
                    img2: require('../../assets/images/learning/security-2.png'),
                    name: '账号安全',
                },
                {
                    img1: require('../../assets/images/learning/exit.png'),
                    img2: require('../../assets/images/learning/exit.png'),
                    name: '退出登录',
                },
            ],
            imgUrl: '',
            userCourseHour: '',
        };
    },
    watch: {
        '$store.state.user.userInfo': {
            handler(newval) {
                console.log(newval, 'newval');
                this.userInfo = newval;
            },
            deep: true,
        },
    },
    created() {
        this.userInfo = store.state.user.userInfo;
        this.findUserCourseHour();
    },
    methods: {
        // 获取学习进度
        findUserCourseHour() {
            return homeApi.findUserCourseHour().then((data) => {
                if (data.success) {
                    this.userCourseHour = data.data;
                }
            });
        },
        printClick() {},
        exportClick() {
            window.pageYOffset = 0;
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            html2canvas(this.$refs.imageWrapper).then((canvas) => {
                const dataURL = canvas.toDataURL('image/png');
                this.imgUrl = dataURL;
                if (this.imgUrl !== '') {
                    this.dialogTableVisible = true;
                    const link = document.createElement('a');
                    link.href = this.imgUrl; // 下载链接
                    link.setAttribute('download', '证书.png');
                    link.style.display = 'none'; // a标签隐藏
                    const event = new MouseEvent('click'); // 创建一个单击事件
                    link.dispatchEvent(event); // 触发a的单击事件
                }
            });
        },

        tabClick(index) {
            this.tabIndex = index;
            if (index === 0) {
                this.$refs.task.findMyCourseOrderInfo();
            } else if (index === 1) {
                this.myCertificate();
            } else if (index === 2) {
                this.$refs.record.findMyCourseOrderInfo1();
            } else if (index === 4) {
                this.$refs.security.getUserInfo();
            } else if (index === 3) {
                this.$refs.information.getUserInfo();
            } else if (index === 5) {
                localStorage.removeItem('token');
                this.$router.push({ path: '/' });
            }
        },
        myCertificate() {
            return api.myCertificate().then((data) => {
                console.log(data);
                this.certificate = data.data;
            });
        },
    },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
<style lang="less">
.learning {
    .ivu-form .ivu-form-item-label {
        float: none;
    }
    .ivu-form-inline .ivu-form-item {
        display: block;
    }
    .ivu-input-wrapper {
        width: 300px;
    }
    .form-id {
        .ivu-input-wrapper,
        .ivu-form-item-content {
            width: 400px;
        }
    }
    .ivu-form-item-content {
        margin-top: 7px;
        width: 300px;
    }
    .ivu-form-item-label {
        margin-left: 8px;
        margin-bottom: 7px;
    }
    .ivu-input {
        height: 48px;
    }
    .exam-result-page {
        width: 100%;
        margin-top: 33px;
    }
    .exam-result {
        width: 100%;
        max-height: 650px;
        overflow-y: scroll;
        box-shadow: 0 0 0 0;
    }
    .exam-result .exam-top .score {
        top: 2px;
    }
}
</style>
