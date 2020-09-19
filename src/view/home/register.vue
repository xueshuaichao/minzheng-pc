<template>
    <i-modal
        :value="value"
        :loading="true"
        class="register-modal"
        :title="title"
        width="400"
        @on-cancel="close"
    >
        <i-form
            v-show="step == 1"
            ref="form"
            :model="form"
            :rules="formRules"
            class="find-password"
        >
            <i-form-item prop="mobile">
                <i-input
                    v-model="form.mobile"
                    text="text"
                    placeholder="请输入手机号"
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
                                sms.seconds > 0
                                    ? 'color: #4769C0;background-color:#E4ECFF;border:0'
                                    : 'color: #fff;'
                            "
                            @click="getCode"
                        >
                            {{
                                sms.seconds > 0
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
                :loading="loading"
                long
                @click="register('form')"
            >
                注册
            </i-button>
        </i-form>

        <i-form
            v-if="step == 2"
            ref="identityForm"
            :model="identityForm"
            :rules="identityRules"
            class="identity"
        >
            <div class="tab">
                <span
                    class="tab-1"
                    :class="{ active: step == 2 }"
                ><span>1</span> 认证身份</span>&nbsp;&nbsp;&nbsp;
                <span class="tab-2">>>></span>&nbsp;&nbsp;&nbsp;
                <span class="tab-3"><span>2</span> 个人信息</span>
            </div>
            <i-form-item prop="realname">
                <p>真实姓名</p>
                <i-input
                    v-model="identityForm.realname"
                    placeholder="请输入您的真实姓名"
                    type="text"
                />
            </i-form-item>
            <i-form-item prop="idcard">
                <p>身份证号</p>
                <i-input
                    v-model="identityForm.idcard"
                    placeholder="请输入您的身份证号"
                    type="text"
                />
            </i-form-item>
            <i-button
                type="primary"
                long
                size="large"
                @click="identity('identityForm')"
            >
                下一步
            </i-button>
        </i-form>

        <i-form
            v-if="step == 3"
            ref="extraForm"
            :model="information"
            :rules="extraRules"
        >
            <div class="tab">
                <span class="tab-1"><span>1</span> 认证身份</span>&nbsp;&nbsp;&nbsp;
                <span class="tab-2">>>></span>&nbsp;&nbsp;&nbsp;
                <span
                    class="tab-3"
                    :class="{ active: step == 3 }"
                ><span>2</span> 个人信息</span>
            </div>
            <i-form-item prop="nativePlace">
                <i-input
                    v-model="information.nativePlace"
                    placeholder="请输入籍贯信息"
                />
            </i-form-item>
            <i-form-item prop="salt">
                <i-select v-model="information.politicsStatus">
                    <label slot="prefix">政治面貌</label>
                    <i-option
                        v-for="item in politicsStatus"
                        :key="item.id"
                        :value="item.value"
                    >
                        {{ item.value }}
                    </i-option>
                </i-select>
            </i-form-item>
            <i-form-item prop="city">
                <p><span style="color:#D84344;">*</span> 退役后去向：</p>
                <i-radio-group v-model="information.tuiyihouquxiang">
                    <i-radio
                        v-for="item in city"
                        :key="item.label"
                        :label="item.label"
                    >
                        {{ item.value }}
                    </i-radio>
                </i-radio-group>
            </i-form-item>
            <i-form-item prop="job">
                <p><span style="color:#D84344;">*</span> 拟选择方向：</p>
                <i-radio-group v-model="information.tuiyihoufangxiang">
                    <i-radio
                        v-for="item in job"
                        :key="item.label"
                        :label="item.label"
                    >
                        {{ item.value }}
                    </i-radio>
                </i-radio-group>
            </i-form-item>
            <i-button
                type="primary"
                size="large"
                long
                :loading="loading"
                @click="update"
            >
                保存
            </i-button>
        </i-form>
        <div slot="footer" />
    </i-modal>
</template>

<script>
import userApi from '../../api/user';
import {
    phoneNumberValidator,
    idNumberValidator,
    nameValidator,
} from '../../utils/validators';
import store from '../../store/index';
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
            title: '注册账号',
            step: 3,
            loading: false,
            politicsStatus: [
                {
                    id: 1,
                    value: '群众',
                },
                {
                    id: 2,
                    value: '团员',
                },
                {
                    id: 3,
                    value: '预备党员',
                },
                {
                    id: 4,
                    value: '党员',
                },
            ],
            city: [],
            job: [],
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

            identityForm: {
                realname: '',
                idcard: '',
            },
            identityRules: {
                realname: [
                    {
                        required: true,
                        message: '请输入真实姓名',
                        trigger: 'blur',
                    },
                    {
                        validator: nameValidator,
                        trigger: 'blur',
                        type: 'string',
                    },
                ],
                idcard: [
                    {
                        required: true,
                        message: '请输入身份证号',
                        trigger: 'blur',
                    },
                    { validator: idNumberValidator, trigger: 'blur' },
                ],
            },

            extraForm: {
                nativePlace: '',
                salt: '',
                city: '',
                job: '',
            },
            extraRules: {
                nativePlace: [
                    {
                        required: true,
                        message: '请输入籍贯信息',
                        trigger: 'blur',
                    },
                ],
                salt: [
                    {
                        required: true,
                        message: '请选择政治面貌',
                        trigger: 'blur',
                    },
                ],
                city: [
                    {
                        required: true,
                        message: '请选择退役后去向',
                        trigger: 'blur',
                    },
                ],
                job: [
                    {
                        required: true,
                        message: '请选择就业方向',
                        trigger: 'blur',
                    },
                ],
            },

            sms: {
                sending: false,
                seconds: 0,
            },
            information: {
                id: '', // 是   用户id
                realName: '', //   真实姓名   不可修改
                sex: '', // 性别    枚举
                idcard: '', //    身份证号    不可修改
                birthdate: '', //    出生年月    字符串类型
                nativePlace: '', //    是    籍贯
                nation: '', //    是    民族
                politicsStatus: '', //    是    政治面貌
                phoneNo: '', //    是    手机号
                wechatNo: '', //    是    微信号
                tuiyihouquxiang: '', //    是    就业后去向    枚举
                tuiyihoufangxiang: '', // 是    就业后方向    枚举
                eduBackground: '', //    否    学历
                graduateInstitution: '', //    否    毕业院校及专业
                workUnit: '', //    工作单位及职务
                jobTitle: '', //    否    职称
                workTelephone: '', //    否    单位电话
                postalAddress: '', //    否    通讯地址
                postalCode: '', //    否    通讯邮编
                email: '', //    否    邮编
                picture: '', //    否    头像
            },
        };
    },
    created() {
        console.log(this.value);
        this.userStaticInfo();
    },
    methods: {
        // 保存
        update() {
            this.information.id = localStorage.getItem('userId');
            return userApi.update(this.information).then((data) => {
                console.log(data);
                this.close();
            });
        },
        //
        userStaticInfo() {
            return userApi.userStaticInfo().then((data) => {
                Object.keys(data.data.tuiyihoufangxiang).forEach(
                    (item, index) => {
                        this.job.push({
                            label: item,
                            value: Object.values(data.data.tuiyihoufangxiang)[
                                index
                            ],
                        });
                    },
                );
                Object.keys(data.data.tuiyihouquxiang).forEach(
                    (item, index) => {
                        this.city.push({
                            label: item,
                            value: Object.values(data.data.tuiyihouquxiang)[
                                index
                            ],
                        });
                    },
                );
            });
        },
        // 获取验证码
        getCode() {
            // this.$refs.form
            //     .validateField(this.form.mobile)
            //     .then(() => {
            //         ;
            //     })
            this.sms.sending = true;
            return userApi
                .getSmsCode(this.form.mobile)
                .then(() => {
                    // todo countdown
                    const destroyCountdown = countdown(60, {
                        onProgress: (s) => {
                            this.sms.seconds = s;
                        },
                        onEnd: () => {
                            this.sms.seconds = 0;
                            this.sms.sending = false;
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
        // 登录
        passwordLogin() {
            // submit here
            // 登录有token后端报错
            store.commit('setToken', '');
            userApi.login(this.form.mobile, this.form.password).then((res) => {
                this.handleLoginSuccess(res);
            });
        },
        register(name) {
            this.$refs[name].validate((isValid) => {
                if (isValid) {
                    userApi
                        .register({
                            username: this.form.mobile,
                            password: this.form.password,
                            repeatPassword: this.form.repeatPassword,
                            vcode: this.form.code,
                        })
                        .then(() => {
                            //
                            this.$Message.success('注册成功');
                            this.passwordLogin();
                            this.step = 2;
                            this.title = '认证身份';
                        });
                }
            });
        },
        handleLoginSuccess(res) {
            console.log(res);
            // todo fetch userInfo
            localStorage.setItem('token', res.data);
            const token = localStorage.getItem('token');
            store.commit('setToken', token);
            userApi.getUserInfo().then((res) => {
                store.commit('setUserInfo', res.data);
            });
            console.log(store.state);
        },
        // 身份保存
        identity(name) {
            this.$refs[name].validate((isValid) => {
                if (isValid) {
                    this.loading = true;
                    userApi
                        .identityAuth(
                            this.identityForm.realname,
                            this.identityForm.idcard,
                        )
                        .then(() => {
                            this.loading = false;
                            this.$Message.success('认证身份成功');
                            this.step = 3;
                            this.title = '个人信息';
                        })
                        .catch((e) => {
                            this.loading = false;
                            this.$Message.error(e.toString());
                        });
                }
            });
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
.register-modal {
    .ivu-modal-footer {
        border-top: none;
    }
    .identity {
        p {
            font-size: 12px;
            font-weight: 400;
            color: @textColor1;
            line-height: 17px;
            margin-bottom: 4px;
        }
    }
    .tab {
        margin-bottom: 15px;
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        color: @textColor3;
        text-align: center;
        .active {
            color: @mainColor;
        }
        .rab-2 {
        }
        .tab-1,
        .tab-3 {
            span {
                display: inline-block;
                //   width: 12px;
                //   height: 12px;
                border-radius: 50%;
                border: 1px solid @textColor3;
                font-size: 10px;
                padding: 0 6px;
                &.active {
                    border-color: @mainColor;
                }
            }
        }
    }
}
.register-modal {
    .ivu-modal-header-inner {
        font-size: 20px;
        font-weight: 500;
        color: rgba(69, 96, 163, 1);
        letter-spacing: 1px;
    }
    .ivu-btn-large {
        height: 48px;
        font-size: 14px;
    }
    .ivu-modal-body {
        padding: 0;
        padding-top: 17px;
    }
    .ivu-form-item {
        margin-bottom: 33px;
    }
    .ivu-input {
        height: 48px;
    }
    .ivu-modal-footer {
        border: 0;
    }
    .ivu-modal-header {
        border-bottom: 0;
        padding: 8px 0;
        text-align: center;
    }
    .ivu-modal-content {
        padding: 16px 50px 0;
    }
}
</style>
