<template>
    <div id="wdc-app">
        <div class="wrap">
            <header>
                <!-- <div class="banner" /> -->
                <div class="nav">
                    <div class="m-container clearfix">
                        <img
                            class="fl logo"
                            src="@/assets/images/logo.png"
                            alt=""
                        >
                        <ul class="nav-bar fl">
                            <router-link
                                v-for="item in nav"
                                :key="item.label"
                                :to="item.to"
                                :exact="!!item.excat"
                            >
                                <li
                                    class="nav-item"
                                    :class="{
                                        active: currentRoute === item.to.path
                                    }"
                                    @click="handleRouterchange(item.to)"
                                >
                                    {{ item.label }}
                                </li>
                            </router-link>
                        </ul>
                        <div
                            class="fr admin"
                            @click="jumpAdmin"
                        >
                            学习管理
                        </div>
                        <div class="login-state fr">
                            <router-link
                                v-if="username"
                                tag="span"
                                class="username"
                                :to="{ name: 'learning' }"
                            >
                                {{ username }}
                            </router-link>
                            <span
                                v-else
                                @click="goLogin"
                            >未登录</span>
                        </div>
                        <div class="mobile fr">
                            <p class="btn">
                                移动端
                            </p>
                            <div class="mobile-content">
                                <div class="flex">
                                    <div class="item">
                                        <div class="qrcode" />
                                        <p>APP下载</p>
                                    </div>
                                    <div class="item border" />
                                    <div class="item">
                                        <div class="qrcode" />
                                        <p>手机版网站</p>
                                    </div>
                                </div>

                                <div class="arror" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <router-view />
        </div>
        <footer>
            <div class="main-content">
                <div class="company-infos">
                    <div class="info">
                        <p>
                            主办方: 青岛市民政局
                        </p>
                        <p>
                            地址: 青岛市延安三路民政大厦
                        </p>
                    </div>
                    <div class="info">
                        <p>
                            邮政编码: 266071
                        </p>
                        <p>
                            电话: 010-66490665
                        </p>
                    </div>
                    <div class="qrcode-wrap">
                        <div class="qc-item">
                            <div class="qrcode" />
                            <p>
                                下载app
                            </p>
                        </div>
                        <div class="qc-item">
                            <div class="qrcode" />
                            <p>
                                进入H5
                            </p>
                        </div>
                    </div>
                </div>
                <p class="copyright">
                    伟东集团有限责任公司@版权所有 京ICP 备 10026535 号-24
                </p>
            </div>
        </footer>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import api from './api/user';
import store from './store/index';

const NAV = [
    {
        to: { path: '/' },
        label: '首页',
        excat: true,
    },
    {
        to: { path: '/course' },
        label: '课程中心',
        excat: true,
    },
    {
        to: { path: '/exam' },
        label: '试题中心',
    },
    {
        to: { path: '/learnings1' },
        label: '学习中心',
    },
    // {
    //     to: { path: '/job/list' },
    //     label: '就业信息',
    // },
    // {
    //     to: { path: '/service' },
    //     label: '创业服务',
    // },
];
export default {
    data() {
        return {
            nav: NAV,
            username: '',
            currentRoute: '',
        };
    },
    computed: {
        ...mapState('user', ['userInfo']),
    },
    watch: {
        '$store.state.user.userInfo': {
            handler(newval) {
                console.log(newval);
                this.username = newval.username;
            },
            deep: true,
            immediate: true,
        },
    },
    created() {
        if (localStorage.getItem('token')) {
            this.handleLoginSuccess();
        }
    },
    mounted() {
        setTimeout(() => {
            console.log(this.$router, 'rout');
            this.currentRoute = this.$router.currentRoute.path;
        }, 100);
    },
    methods: {
        goLogin() {
            this.$passport.goPcLogin();
        },
        jumpAdmin() {
            window.open('http://madmin.testing1.wdeduc.com/');
        },
        handleRouterchange(to) {
            this.currentRoute = to.path;
        },
        handleLoginSuccess() {
            // todo fetch userInfo
            api.getUserInfo().then((res) => {
                store.commit('setUserInfo', res.data);
            });
        },
    },
};
</script>

<style lang="less" scoped>
@import "./less/variables.less";
.wrap {
    min-height: 100%;
    /* 底部 */
    padding-bottom: 120px;
    background: #f7f7f9;
}
.banner {
    width: 100%;
    height: 218px;
    background: url(./assets/images/common/banner.png) 0 0 no-repeat;
    background-size: cover;
}
.username {
    cursor: pointer;
}
.nav {
    height: 88px;
    line-height: 88px;
    background: #d14242;
    color: #fff;
    font-size: 18px;
    .nav-item {
        display: inline-block;
        padding: 0 40px;
        cursor: pointer;
        color: #fff;
    }
    .router-link-active {
        background: #d14242;
    }
    .login-state {
        float: right;
    }
    .admin {
        margin-left: 40px;
        cursor: pointer;
    }
    .logo {
        margin-top: 24px;
        width: 140px;
        height: 40px;
        margin-right: 92px;
    }
    .mobile {
        position: relative;
        margin-right: 20px;
        cursor: pointer;
        .btn {
            width: 123px;
            height: 35px;
            background: #fff;
            color: #d14242;
            border-radius: 20px;
            line-height: 35px;
            margin-top: 30px;
            text-align: center;
        }
        &:hover .mobile-content {
            display: block;
        }
        .mobile-content {
            display: none;
            position: absolute;
            bottom: -174px;
            left: -100px;
            background: #fff;
            font-size: 16px;
            color: #4a4a4a;
            z-index: 10;
            line-height: 34px;
            border-radius: 6px;
            box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.2);
            .flex {
                display: flex;
            }
            .arror {
                position: absolute;
                top: -10px;
                left: 155px;
                border-bottom: 10px solid #fff;
                border-left: 11px solid transparent;
                border-right: 11px solid transparent;
            }
            .qrcode {
                width: 91px;
                height: 91px;
                background: #eee;
            }
            .item {
                padding: 20px 38px 10px;
                text-align: center;
                &.border {
                    padding: 0;
                    position: relative;
                    &::before {
                        width: 2px;
                        height: 94px;
                        border-right: 1px solid #d8d8d8;
                        content: "";
                        display: block;
                        margin-top: 30px;
                    }
                }
            }
        }
    }
    .active {
        background: #a32525;
    }
}
footer {
    // margin-top: -120px;
    height: 301px;
    background: #000000;
    .main-content {
        width: 1200px;
        margin: 0 auto;
        .copyright {
            text-align: center;
            font-size: 16px;
            margin-top: 36px;
            line-height: 36px;
            color: #737882;
        }
        .company-infos {
            display: flex;
            font-size: 20px;
            line-height: 28px;
            justify-content: space-between;
            .qrcode-wrap {
                display: flex;
                margin-left: 360px;
                margin-top: 60px;
                .qc-item {
                    width: 102px;
                    text-align: center;
                    margin-left: 25px;
                }
                .qrcode {
                    width: 102px;
                    height: 102px;
                    background: #fff;
                    margin-bottom: 19px;
                }
            }
            .info {
                margin-top: 100px;
            }
        }
    }
}
</style>
