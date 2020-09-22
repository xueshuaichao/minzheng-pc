<template>
    <div class="information-content">
        <div class="title">
            <p class="text">
                账号安全
            </p>
            <i-button
                v-if="!informationShow"
                type="primary"
                class="btn conserve"
                @click="informationShow = true"
            >
                编辑
            </i-button>
        </div>
        <div
            v-if="informationShow"
            class="information-form"
        >
            <Form
                ref="formInline"
                :model="formInline"
                :rules="ruleInline"
                inline
            >
                <div class="form-id">
                    <FormItem
                        prop="userMobile"
                        label="手机号"
                    >
                        <i-input
                            v-model="formInline.userMobile"
                            placeholder="请输入手机号"
                        />
                    </FormItem>
                    <FormItem
                        prop="oldPassword"
                        label="旧密码"
                    >
                        <i-input
                            v-model="formInline.oldPassword"
                            placeholder="请输入密码"
                        />
                    </FormItem>
                    <FormItem
                        prop="password"
                        label="新密码"
                    >
                        <i-input
                            v-model="formInline.password"
                            placeholder="请输入8-16位字母和密码组合的新密码"
                        />
                    </FormItem>
                    <FormItem
                        prop="repeatPassword"
                        label="确认密码"
                    >
                        <i-input
                            v-model="formInline.repeatPassword"
                            placeholder="请再次输入密码"
                        />
                    </FormItem>
                </div>
            </Form>
            <div class="button">
                <i-button
                    type="primary"
                    class="btn cancel"
                    @click="informationShow = false"
                >
                    取消
                </i-button>
                <i-button
                    type="primary"
                    class="btn conserve"
                    @click="changePassword"
                >
                    保存
                </i-button>
            </div>
        </div>
        <div
            v-else
            class="information-form"
        >
            <div class="password-box">
                <ul class="password-content">
                    <li>
                        手机号码：{{
                            formInline.userMobile
                                ? formInline.userMobile
                                : "- -"
                        }}
                    </li>
                    <li>
                        密码：<input
                            type="password"
                            value="123456"
                        >
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import userApi from '../../api/user';
// import {
//     password1Validator,
// } from '../../utils/validators';
export default {
    props: {
        informationShow: {
            type: Boolean, // 定义接收到的数据的类型
            default: false,
            required: false, // 规定这个数据是否必传,默认false
        },
    },
    data() {
        return {
            // informationShow: false,
            formInline: {
                userMobile: '',
                oldPassword: '',
                password: '',
                repeatPassword: '',
            },
            ruleInline: {},
        };
    },
    created() {},
    methods: {
        getUserInfo() {
            // todo fetch userInfo
            userApi.getUserInfo().then((res) => {
                this.formInline.userMobile = res.data.phoneNo;
            });
        },
        changePassword() {
            // todo fetch userInfo
            userApi.changePassword(this.formInline).then((res) => {
                if (res.success) {
                    this.informationShow = false;
                }
            });
        },
    },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
