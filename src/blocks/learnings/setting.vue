<template>
    <div class="content">
        <div class="title">
            个人设置
            <div
                class="password"
                @click="visible = true"
            >
                修改密码
            </div>
        </div>
        <div class="upload">
            <!-- <img src="@/assets/images/learnings/card4.png"> -->
            <img :src="portrait">
            <Upload
                :show-upload-list="false"
                action
                accept="image/*"
                :before-upload="handleBeforeUpload"
            >
                <Button
                    icon="ios-cloud-upload-outline"
                    :loading="loading"
                >
                    更换头像
                </Button>
            </Upload>
        </div>
        <div class="form">
            <Form
                ref="formValidate1"
                :model="formValidate1"
                :rules="ruleValidate1"
                :label-width="80"
            >
                <FormItem
                    label="姓名"
                    prop="name"
                >
                    <div
                        v-if="!isEdit"
                        style="display:flex;align-items:center"
                    >
                        <Input
                            v-model="formValidate1.name"
                            style="width:176px;margin-right:5px;"
                        />
                    </div>
                    <div
                        v-else
                        style="display:flex;align-items:center"
                    >
                        {{ formValidate1.name }}
                    </div>
                </FormItem>
                <FormItem
                    label="手机号"
                    prop="phone"
                >
                    <div
                        v-if="!isEdit"
                        style="display:flex;align-items:center"
                    >
                        <Input
                            v-model="formValidate1.phone"
                            :avalible="phoneAvalible"
                            style="width:272px;margin-right:5px;"
                            placeholder="Enter your e-mail"
                            @on-blur="handlePhoneBlur"
                        />
                    </div>
                    <div
                        v-else
                        style="display:flex;align-items:center"
                    >
                        {{ formValidate1.phone | formatephone }}
                    </div>
                </FormItem>
                <FormItem
                    v-show="!isEdit"
                    label="验证码"
                    prop="code"
                >
                    <div style="display:flex;align-items:center">
                        <Input
                            v-model="formValidate1.code"
                            style="width:142px;margin-right:5px;"
                            placeholder="请输入验证码"
                        />
                        <div
                            v-if="isAvalible"
                            class="yanzhengma"
                            :class="{ disable: isSendCodeAvalible }"
                            @click="handleyanzhengma"
                        >
                            发送验证码
                        </div>
                        <div
                            v-if="!isAvalible"
                            class="yanzhengma disable"
                        >
                            {{ time }}(s)
                        </div>
                    </div>
                </FormItem>
                <FormItem
                    label="养老机构"
                    prop="selectedList"
                >
                    <div
                        v-if="!isEdit"
                        style="display:flex;align-items:center"
                    >
                        <Cascader
                            v-model="formValidate1.selectedList"
                            :data="organizations"
                        />
                    </div>
                    <div
                        v-else
                        style="display:flex;align-items:center"
                    >
                        {{ selectedLabels }}
                    </div>
                </FormItem>
            </Form>
        </div>
        <div class="button">
            <div
                v-if="isEdit"
                @click="isEdit = !isEdit"
            >
                编辑
            </div>
            <div
                v-if="!isEdit"
                style="margin-right: 20px;"
                @click="handleSubmit('formValidate1')"
            >
                保存
            </div>
            <div
                v-if="!isEdit"
                @click="isEdit = !isEdit"
            >
                取消
            </div>
        </div>
        <passwordChange v-model="visible" />
    </div>
</template>

<script>
import learningsApi from '../../api/learnings';
import passwordChange from './components/passwordChange.vue';

export default {
    components: {
        passwordChange,
    },
    filters: {
        formatephone(phone) {
            return `${phone.substr(0, 3)}****${phone.substr(7)}`;
        },
    },
    data() {
        return {
            visible: false,
            formValidate1: {
                name: '',
                phone: '',
                code: '',
                selectedList: [],
            },
            selectedLabels: [],
            ruleValidate1: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                ],
                phone: [
                    {
                        required: true,
                        message: '请输入手机号',
                        trigger: 'blur',
                    },
                    {
                        message: '手机号格式不正确',
                        trigger: 'blur',
                        validator(rule, value) {
                            if (!value) {
                                return true;
                            }
                            return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(value);
                        },
                    },
                ],
                city: [
                    {
                        required: true,
                        message: 'Please select the city',
                        trigger: 'change',
                    },
                ],
                code: [
                    {
                        required: false,
                        message: '请输入验证码',
                        trigger: 'blur',
                    },
                ],
            },
            isEdit: true,
            maxSize: 5 * 1024 * 1024,
            loading: false,
            organizations: [],
            portrait: '',
            isAvalible: true,
            time: 60,
            setId: '',
            initPhone: '',
            phoneAvalible: true,
            isSendCodeAvalible: true,
        };
    },
    created() {
        console.log('设置');
        this.fieldSearchDetail();
        this.userInfo();
    },
    methods: {
        async fieldSearchDetail() {
            learningsApi.fieldSearchDetail().then((data) => {
                console.log(data);
            });
        },
        async handlePhoneBlur() {
            console.log('blue');
            const result = await this.validatePhone('formValidate1');
            console.log(result, 'abc');
            if (result) {
                return;
            }

            if (this.initPhone === this.formValidate1.phone) {
                this.isSendCodeAvalible = true;
            } else {
                this.isSendCodeAvalible = false;
            }
        },
        async handleyanzhengma() {
            const result = await this.validatePhone('formValidate1');
            console.log(result, 'abc');
            if (result) {
                return;
            }
            learningsApi
                .userSendSms({ userMobile: this.formValidate1.phone })
                .then((data) => {
                    console.log(data);
                    this.isAvalible = false;
                    clearInterval(this.setId);
                    this.setId = setInterval(() => {
                        this.time -= 1;
                        if (this.time === 0) {
                            this.isAvalible = true;
                            clearInterval(this.setId);
                        }
                    }, 1000);
                });
        },
        // 对手机字段校验
        validatePhone(item) {
            return new Promise((resolve) => {
                this.$refs[item].validateField('phone', (valid) => {
                    console.log(valid, 'valid');
                    resolve(valid);
                });
            });
        },
        // 用户信息保存
        handleSubmit(item) {
            console.log('object');
            if (this.initPhone === this.formValidate1.phone) {
                // 如果手机号未改动
                this.$refs[item].validate((valid) => {
                    console.log(valid, 'valid手机号未改ian');
                    if (valid) {
                        this.$Message.success('Success!');
                        // learningsApi.abc(this.formValidate1).then((data) => {
                        //     console.log(data);
                        // });
                    } else {
                        this.$Message.error('Fail!');
                    }
                });
            } else {
                this.ruleValidate1.code[0].required = true;
                this.$refs[item].validate((valid) => {
                    console.log(valid, '手机号改动了');
                    if (valid) {
                        this.$Message.success('Success!');
                        learningsApi.abc(this.formValidate1).then((data) => {
                            console.log(data);
                        });
                    } else {
                        // this.$Message.error('Fail!');
                    }
                });
            }
            this.ruleValidate1.code[0].required = false;
        },
        // 请求用户基本信息
        userInfo() {
            return learningsApi
                .userInfo({ userId: '1000118612570987' })
                .then((data) => {
                    console.log(data);
                    const userInfo = data.data;
                    this.formValidate1.name = userInfo.username;
                    this.formValidate1.phone = userInfo.userMobile;
                    this.initPhone = userInfo.phone;
                    this.formValidate1.selectedList = userInfo.selectedList;
                    // this.selectedLabels = userInfo.selectedLabels.join('/');
                    const abc = [JSON.parse(userInfo.extensionInfo).areaUnit];
                    // abc[0].children.children = null;
                    this.organizations = abc;
                    console.log(this.organizations, 'sdfs');
                    this.portrait = userInfo.portrait;
                });
        },
        // 手动上传图片
        handleBeforeUpload(data) {
            this.checkFile(data).then(() => {
                this.uploadImage(data);
            });
            return false;
        },
        // 验证图片是否合适
        checkFile(data) {
            return new Promise((resolve, reject) => {
                if (data.size > this.maxSize) {
                    this.$Message.error('请上传合适大小的图片');
                    reject();
                } else if (!data.type.startsWith('image')) {
                    this.$Message.error('图片格式不正确');
                    reject();
                } else {
                    resolve();
                }
            });
        },
        // 上传图片函数
        uploadImage(file) {
            this.loading = true;
            console.log(file);
            learningsApi
                .fileUpload({
                    file,
                })
                .then(({ data }) => {
                    this.loading = false;
                    this.$emit('onSuccess', {
                        name: file.name,
                        url: data.path,
                    });
                    this.userUpdate({ portrait: data });
                    this.$Message.success('上传成功');
                })
                .catch(() => {
                    this.loading = false;
                    this.$Message.error('上传失败');
                });
        },
        // 更新用户信息
        userUpdate(param) {
            learningsApi
                .userUpdate(param)
                .then(({ data }) => {
                    console.log(data);
                    this.userInfo();
                })
                .catch(() => {});
        },
    },
};
</script>

<style lang="less" scoped>
@import "./index.less";

.content {
    background: #fff;
    // margin-top: 20px;
    padding: 0 28px;
    padding-top: 33px;
    color: @textcolor100;
    position: relative;
    min-height: 500px;
    .upload {
        position: absolute;
        top: 78px;
        right: 150px;
        img {
            width: 101px;
            height: 102px;
        }
    }
    .title {
        font-size: 26px;
        font-weight: 500;
        line-height: 37px;
        position: relative;
        .password {
            color: #4a90e2;
            cursor: pointer;
            font-size: 14px;
            position: absolute;
            top: 0px;
            left: 137px;
        }
    }
    .form {
        margin-top: 30px;
        width: 500px;
        .first-line,
        .second-line,
        .third-line,
        .four-line {
            display: flex;
            align-items: center;
            margin-top: 32px;
            label {
                width: 86px;
            }
            .input-style {
                display: flex;
                align-items: center;
                position: relative;
                // .ivu-input {
                //     border: 1px solid #ed4014;
                // }
                img {
                    width: 25px;
                }
                .errMsg {
                    position: absolute;
                    top: 40px;
                    color: red;
                }
            }
        }
        .four-line {
            margin-top: 80px;
        }
        .first-line-edit {
            display: flex;
            align-items: center;
            img {
                width: 20px;
            }
        }
    }
    .button {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 96px;
        div {
            width: 113px;
            height: 37px;
            background: #d14242;
            border-radius: 19px;
            cursor: pointer;
            text-align: center;
            color: #fff;
            line-height: 37px;
        }
    }
    .yanzhengma {
        width: 113px;
        height: 37px;
        background: #d14242;
        border-radius: 19px;
        cursor: pointer;
        text-align: center;
        color: #fff;
        line-height: 37px;
    }
    .disable {
        background: #b3b3b3;
    }
}
</style>
