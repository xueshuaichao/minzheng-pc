<template>
    <div id="wdc-app">
        <div class="wrap">
            <header>
                <div class="banner" />
                <div class="nav">
                    <div class="m-container clearfix">
                        <ul class="nav-bar fl">
                            <router-link
                                v-for="item in nav"
                                :key="item.label"
                                tag="li"
                                class="nav-item"
                                :to="item.to"
                                :exact="!!item.excat"
                            >
                                {{ item.label }}
                            </router-link>
                        </ul>
                        <div class="login-state fr">
                            <router-link
                                v-if="username"
                                tag="span"
                                class="username"
                                :to="{ name: 'learning' }"
                            >
                                {{ username }}
                            </router-link>
                            <span v-else>未登录</span>
                        </div>
                    </div>
                </div>
            </header>
            <router-view />
        </div>
        <footer />
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
        to: { path: '/course/list' },
        label: '试题中心',
    },
    {
        to: { path: '/exam/list' },
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
        };
    },
    computed: {
        ...mapState('user', ['userInfo']),
    },
    watch: {
        '$store.state.user.userInfo': {
            handler(newval) {
                this.username = newval.username;
            },
            deep: true,
        },
    },
    created() {
        if (localStorage.getItem('token')) {
            this.handleLoginSuccess();
        }
    },
    methods: {
        handleLoginSuccess() {
            // todo fetch userInfo
            api.getUserInfo().then((res) => {
                store.commit('setUserInfo', res.data);
            });
            // console.log(store.state);
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
    height: 60px;
    line-height: 60px;
    background: @mainColor;
    color: #fff;
    font-size: 18px;
    .nav-item {
        display: inline-block;
        padding: 0 40px;
        cursor: pointer;
    }
    .router-link-active {
        background: #4769c0;
    }
    .login-state {
        float: right;
    }
}
footer {
    margin-top: -120px;
    height: 120px;
    background: #dee4f4;
}
</style>
