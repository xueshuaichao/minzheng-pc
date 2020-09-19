<template>
    <i-modal
        :value="value"
        :loading="true"
        title="找回密码"
        width="400"
        class="findPassword"
        @on-cancel="close"
    >
        <i-form
            ref="form"
            :model="form"
            :rules="formRules"
            class="find-password"
        >
            <i-form-item prop="mobile">
                <i-input
                    v-model="form.mobile"
                    text="text"
                    placeholder="请输入绑定的手机号"
                />
            </i-form-item>
            <i-form-item
                class="phone_code"
                prop="code"
            >
                <i-row :gutter="10">
                    <i-col span="14">
                        <i-input
                            v-model="form.code"
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
            <i-form-item prop="password">
                <i-input
                    v-model="form.password"
                    type="password"
                    placeholder="新密码"
                />
            </i-form-item>
            <i-form-item prop="repeatPassword">
                <i-input
                    v-model="form.repeatPassword"
                    type="password"
                    placeholder="再次输入密码"
                />
            </i-form-item>
            <i-button
                type="primary"
                size="large"
                long
                @click="handleSubmit"
            >
                确认
            </i-button>
        </i-form>
        <div slot="footer" />
    </i-modal>
</template>

<script>
import api from '../../api/user';
import { phoneNumberValidator } from '../../utils/validators';
import { countdown } from '../../utils/helper';

export default {
    props: {
        value: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    data() {
        return {
            form: {
                mobile: '',
                code: '',
                password: '',
                repeatPassword: '',
            },
            formRules: {
                mobile: [
                    {
                        required: true,
                        message: '请输入手机号',
                        trigger: 'blur',
                    },
                    {
                        validator: phoneNumberValidator,
                        trigger: 'blur',
                    },
                ],
                code: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                ],
            },
            sms: {
                sending: false,
                seconds: 0,
            },
        };
    },
    created() {
        console.log(this.value, 'value');
    },
    methods: {
        // 发送验证码
        getCode() {
            // this.$refs.form
            //     .validateField(this.form.mobile)
            //     .then(() => {
            //         this.sms.sending = true;
            //         return api.getSmsCode(this.form.mobile);
            //     })
            this.sms.sending = true;
            return api
                .getSmsCode(this.form.mobile)
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
        handleSubmit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    // submit here
                    api.retrievePassword(
                        this.form.mobile,
                        this.form.password,
                        this.form.repeatPassword,
                        this.form.code,
                    ).then((res) => {
                        console.log(res);
                        if (res.success) {
                            this.$Message.success('修改成功');
                            this.close();
                        }
                    });
                }
            });
            // console.log('submit');
            // setTimeout(() => {
            //     this.close();
            // }, 1000);
        },
        close() {
            // v-model
            this.$emit('input', false);
        },
    },
};
</script>

<style lang="less">
@import "../../less/variables.less";
.findPassword {
    .ivu-modal-header-inner {
        font-size: 20px;
        font-weight: 500;
        color: rgba(69, 96, 163, 1);
        letter-spacing: 1px;
    }
    .ivu-btn-large {
        height: 48px;
    }
    .ivu-modal-body {
        padding: 0;
        padding-top: 17px;
    }
    .ivu-form-item {
        margin-bottom: 34px;
    }
    .ivu-input {
        height: 48px;
    }
    .ivu-modal-footer {
        border: 0;
    }
    .ivu-modal-header {
        border-bottom: 1px solid @mainColor;
        padding: 8px 0;
    }
    .ivu-modal-content {
        padding: 16px 50px 0;
    }
}
</style>
