<template>
    <div class="login-form">
        <div class="tab">
            <div
                :class="{ active: loginType == 'password' }"
                class="tab-item"
                @click="switchLoginType('password')"
            >
                密码登录
            </div>
            <div
                :class="{ active: loginType == 'sms' }"
                class="tab-item"
                @click="switchLoginType('sms')"
            >
                验证码登录
            </div>
        </div>
        <i-form
            v-show="loginType == 'password'"
            ref="passwordForm"
            :model="passwordForm"
            :rules="passwordRules"
        >
            <i-form-item
                class="username"
                prop="username"
            >
                <i-input
                    v-model="passwordForm.username"
                    placeholder="请输入账号/手机号"
                >
                    <i-icon
                        slot="prepend"
                        type="ios-person-outline"
                    />
                </i-input>
            </i-form-item>
            <i-form-item
                class="password"
                prop="password"
            >
                <i-input
                    v-model="passwordForm.password"
                    type="password"
                    placeholder="请输入密码"
                >
                    <i-icon
                        slot="prepend"
                        type="ios-lock-outline"
                    />
                </i-input>
            </i-form-item>
            <i-checkbox
                v-model="saveCookie"
                class="text-color-1 cookie"
            >
                7天内自动登录
            </i-checkbox>
            <i-button
                type="primary"
                size="large"
                long
                class="login"
                @click="passwordLogin"
            >
                登录
            </i-button>
            <div class="fr link-color links">
                <a @click="identity">激活账号</a>
                <a @click="forgetPassword">忘记密码</a>
            </div>
        </i-form>

        <i-form
            v-show="loginType == 'sms'"
            ref="smsForm"
            class="sms-login-form"
            :model="smsForm"
            :rules="smsFormRules"
        >
            <i-form-item prop="mobile">
                <i-input
                    v-model="smsForm.mobile"
                    placeholder="请输入手机号"
                >
                    <i-icon
                        slot="prepend"
                        type="ios-person-outline"
                    />
                </i-input>
            </i-form-item>
            <i-form-item
                class="phone_code"
                prop="code"
            >
                <i-row :gutter="10">
                    <i-col span="14">
                        <i-input
                            v-model="smsForm.code"
                            placeholder="请输入验证码"
                        >
                            <i-icon
                                slot="prepend"
                                type="ios-lock-outline"
                            />
                        </i-input>
                    </i-col>
                    <i-col span="10">
                        <i-button
                            type="primary"
                            size="large"
                            long
                            :disabled="sms.sending"
                            :style="
                                sms.sending
                                    ? 'color: #4769C0;background-color:#E4ECFF;border:0'
                                    : 'color: #fff;'
                            "
                            @click="getCode"
                        >
                            {{
                                sms.sending
                                    ? sms.seconds + "s后重新发送"
                                    : "发送验证码"
                            }}
                        </i-button>
                    </i-col>
                </i-row>
            </i-form-item>

            <i-checkbox
                v-model="saveCookie"
                class="text-color-1 cookie"
            >
                7天内自动登录
            </i-checkbox>
            <i-button
                type="primary"
                size="large"
                long
                class="login"
                @click="smsLogin"
            >
                登录
            </i-button>
            <div class="fr link-color links">
                <a @click="identity">激活账号</a>
            </div>
        </i-form>
    </div>
</template>

<script>
import store from '../../store/index';
import api from '../../api/user';
import { phoneNumberValidator } from '../../utils/validators';
import { countdown } from '../../utils/helper';

export default {
    data() {
        return {
            loginType: 'password', // password | sms
            saveCookie: true,
            passwordForm: {
                username: '',
                password: '',
            },
            passwordRules: {
                username: {
                    required: true,
                    message: '请你输入账号/手机号',
                    trigger: 'blur',
                },
                password: {
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur',
                },
            },
            smsForm: {
                mobile: '',
                code: '',
            },
            smsFormRules: {
                mobile: [
                    {
                        required: true,
                        message: '请输入手机号',
                        trigger: 'blur',
                    },
                    {
                        validator: phoneNumberValidator,
                        message: '手机号格式不正确',
                        trigger: 'blur',
                    },
                ],
                code: [
                    {
                        required: true,
                        messasge: '请输入验证码',
                        trigger: 'blur',
                    },
                ],
            },
            sms: {
                sending: false,
                seconds: 0,
            },
        };
    },
    methods: {
        getCode() {
            // this.$refs.smsForm
            //     .validateField(this.smsForm.mobile)
            //     .then(() => {
            //         this.sms.sending = true;
            //         return api.getSmsCode(this.smsForm.mobile);
            //     })
            this.sms.sending = true;
            return api
                .getSmsCode(this.smsForm.mobile)
                .then(() => {
                    // todo countdown
                    const destroyCountdown = countdown(60, {
                        onProgress: (s) => {
                            this.sms.seconds = s;
                        },
                        onEnd: () => {
                            this.sms.sending = false;
                            this.sms.seconds = 0;
                            this.$off('destroyed', destroyCountdown);
                        },
                    });
                    this.$on('destroyed', destroyCountdown);
                })
                .catch((e) => {
                    this.sms.sending = false;
                    console.log(e);
                });
        },
        switchLoginType(type) {
            this.loginType = type;
        },
        passwordLogin() {
            this.$refs.passwordForm.validate((valid) => {
                if (valid) {
                    // submit here
                    // 登录有token后端报错
                    store.commit('setToken', '');
                    api.login(
                        this.passwordForm.username,
                        this.passwordForm.password,
                    ).then((res) => {
                        this.handleLoginSuccess(res);
                    });
                }
            });
        },
        smsLogin() {
            this.$refs.smsForm.validate((valid) => {
                if (valid) {
                    // submit here
                    api.smsLogin(this.smsForm.mobile, this.smsForm.code).then(
                        (res) => {
                            this.handleLoginSuccess(res);
                        },
                    );
                }
            });
        },
        handleLoginSuccess(res) {
            console.log(res);
            // todo fetch userInfo
            localStorage.setItem('token', res.data);
            const token = localStorage.getItem('token');
            store.commit('setToken', token);
            api.getUserInfo().then((res) => {
                store.commit('setUserInfo', res.data);
            });
            console.log(store.state);
        },
        identity() {
            this.$emit('identity', true);
        },
        forgetPassword() {
            this.$emit('forgetPassword', true);
        },
    },
};
</script>
<style lang="less">
.login-form .ivu-btn-large {
    font-size: 14px;
}
</style>
<style lang="less" scoped>
@import "../../less/variables.less";
.login-form {
    width: 300px;
    height: 100%;
    margin: 0 auto;
}
.login {
    font-size: 18px;
    color: #fff;
}
.tab {
    margin-bottom: 21px;
    font-size: 20px;
    line-height: 1.4;
    .tab-item {
        padding: 6px 28px;
        display: inline-block;
        cursor: pointer;
        &.active {
            color: @mainColor;
            border-bottom: 1px solid @mainColor;
        }
    }
}
.password,
.phone_code {
    margin-bottom: 20px;
}
.cookie {
    margin-bottom: 15px;
}
.links {
    line-height: 1;
    margin-top: 15px;
    a:not(:last-child) {
        margin-right: 8px;
    }
}
</style>
