<template>
    <div class="content">
        <div class="title">
            个人设置
            <div
                class="password"
                @click="visible1 = true"
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
                            style="width:272px;margin-right:5px;"
                            placeholder="Enter your e-mail"
                        />
                    </div>
                    <div
                        v-else
                        style="display:flex;align-items:center"
                    >
                        {{ formValidate1.phone }}
                    </div>
                </FormItem>
                <FormItem
                    v-if="!isEdit"
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
                            class="yanzhengma"
                            @click="handleyanzhengma"
                        >
                            发送验证码
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
                        {{ formValidate1.selectedList }}
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
            >
                保存
            </div>
            <div
                v-if="!isEdit"
                @click="isEdit = !isEdit"
            >
                取消
            </div>
            <!-- <Button type="primary">Submit</Button> -->
            <!-- <Button style="margin-left: 8px">Cancel</Button> -->
        </div>
        <Modal
            v-model="visible1"
            title="修改密码"
        >
            <Form
                ref="formValidate4"
                :model="formValidate4"
                :rules="ruleValidate4"
                :label-width="80"
            >
                <FormItem
                    label="密码"
                    prop="pasword"
                >
                    <Input
                        v-model="formValidate4.pasword"
                        placeholder="请输入密码"
                    />
                </FormItem>
                <FormItem
                    label="新密码"
                    prop="newPassword"
                >
                    <Input
                        v-model="formValidate4.newPassword"
                        placeholder="请输入新密码"
                    />
                </FormItem>
                <FormItem
                    label="确认密码"
                    prop="confirmPass"
                >
                    <Input
                        v-model="formValidate4.confirmPass"
                        placeholder="请再次输入新密码"
                    />
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="cancel">
                    取消
                </Button>
                <Button
                    type="primary"
                    :loading="modal_loading"
                    @click="asyncok('formValidate4')"
                >
                    确认
                </Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import learningsApi from '../../api/learnings';

export default {
    data() {
        return {
            visible1: false,
            modal_loading: false,
            formValidate4: {
                pasword: '',
                newPassword: '',
                confirmPass: '',
            },
            ruleValidate4: {
                pasword: [
                    {
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur',
                    },
                ],
                newPassword: [
                    {
                        required: true,
                        message: '请输入新密码',
                        trigger: 'blur',
                    },
                ],
                confirmPass: [
                    {
                        required: true,
                        message: '请再次输入新密码',
                        trigger: 'blur',
                    },
                ],
            },
            formValidate1: {
                name: '',
                phone: '',
                code: '',
                selectedList: [],
            },
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
                        type: 'phone',
                        message: '手机号格式不正确',
                        trigger: 'blur',
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
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                ],
            },
            isEdit: true,
            maxSize: 5 * 1024 * 1024,
            loading: false,
            organizations: [],
            portrait: '',
        };
    },
    created() {
        console.log('设置');
        this.userInfo();
    },
    methods: {
        handleyanzhengma() {},
        userInfo() {
            return learningsApi.userInfo({}).then((data) => {
                console.log(data);
                const userInfo = data.data;
                this.formValidate1.name = userInfo.name;
                this.formValidate1.phone = userInfo.phone;
                this.formValidate1.selectedList = userInfo.selectedList;
                this.organizations = userInfo.organizations;
                this.portrait = userInfo.portrait;
            });
        },
        asyncok(item) {
            this.$refs[item].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            });
        },
        cancel() {
            console.log('cancel');
            this.$refs.formValidate4.resetFields();
            this.visible1 = false;
        },
        handleSubmit(item) {
            this.$refs[item].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            });
        },
        // 手动上传图片
        handleBeforeUpload(data) {
            this.checkFile(data).then(() => {
                this.uploadImage(data);
            });
            return false;
        },
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
                    // file_type: '1',
                })
                .then(({ data }) => {
                    this.loading = false;
                    this.$emit('onSuccess', {
                        name: file.name,
                        url: data.path,
                    });
                    this.$Message.success('上传成功');
                })
                .catch(() => {
                    this.loading = false;
                    this.$Message.error('上传失败');
                });
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
}
</style>
