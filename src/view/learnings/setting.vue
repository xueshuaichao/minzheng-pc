<template>
    <div class="content">
        <div class="title">
            个人设置
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
                        v-if="nameShow"
                        style="display:flex;align-items:center"
                    >
                        <Input
                            v-model="formValidate1.name"
                            style="width:176px;margin-right:5px;"
                        />
                        <img
                            style="margin-right:5px;"
                            src="@/assets/images/learnings/cc-yes.png"
                            @click="handleSubmit('formValidate1')"
                        >
                        <img
                            src="@/assets/images/learnings/error.png"
                            @click="nameShow = false"
                        >
                    </div>
                    <div
                        v-else
                        style="display:flex;align-items:center"
                    >
                        薛帅超<img
                            src="@/assets/images/learnings/edit.png"
                            @click="nameShow = true"
                        >
                    </div>
                </FormItem>
            </Form>
            <Form
                ref="formValidate2"
                :model="formValidate2"
                :rules="ruleValidate2"
                :label-width="80"
            >
                <FormItem
                    label="手机号"
                    prop="phone"
                >
                    <div
                        v-if="phoneShow"
                        style="display:flex;align-items:center"
                    >
                        <Input
                            v-model="formValidate2.phone"
                            style="width:272px;margin-right:5px;"
                            placeholder="Enter your e-mail"
                        />

                        <img
                            style="margin-right:5px;"
                            src="@/assets/images/learnings/cc-yes.png"
                            @click="handleSubmit('formValidate2')"
                        >
                        <img
                            src="@/assets/images/learnings/error.png"
                            @click="phoneShow = false"
                        >
                    </div>
                    <div
                        v-else
                        style="display:flex;align-items:center"
                    >
                        176<img
                            src="@/assets/images/learnings/edit.png"
                            @click="phoneShow = true"
                        >
                    </div>
                </FormItem>
            </Form>
            <Form
                ref="formValidate3"
                :model="formValidate3"
                :rules="ruleValidate3"
                :label-width="80"
            >
                <FormItem
                    label="养老机构"
                    prop="selectedList"
                >
                    <div
                        v-if="cityShow"
                        style="display:flex;align-items:center"
                    >
                        <Cascader
                            v-model="formValidate3.selectedList"
                            :data="organizations"
                        />
                        <img
                            style="margin-right:5px;"
                            src="@/assets/images/learnings/cc-yes.png"
                            @click="handleSubmit('formValidate3')"
                        >
                        <img
                            src="@/assets/images/learnings/error.png"
                            @click="cityShow = false"
                        >
                    </div>
                    <div
                        v-else
                        style="display:flex;align-items:center"
                    >
                        176<img
                            src="@/assets/images/learnings/edit.png"
                            @click="cityShow = true"
                        >
                    </div>
                </FormItem>
                <FormItem
                    label="账户安全"
                    style="margin-top:200px;"
                >
                    <div
                        style="color:#4A90E2;cursor:pointer;"
                        @click="visible1 = true"
                    >
                        修改密码
                    </div>
                </FormItem>
            </Form>
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
            },
            ruleValidate1: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                ],
            },
            formValidate2: {
                phone: '',
            },
            ruleValidate2: {
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
            },
            formValidate3: {
                selectedList: [],
            },
            ruleValidate3: {
                city: [
                    {
                        required: true,
                        message: 'Please select the city',
                        trigger: 'change',
                    },
                ],
            },
            nameShow: true,
            phoneShow: true,
            cityShow: true,
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
        userInfo() {
            return learningsApi.userInfo({}).then((data) => {
                console.log(data);
                const userInfo = data.data;
                this.formValidate1.name = userInfo.name;
                this.formValidate2.phone = userInfo.phone;
                this.formValidate3.selectedList = userInfo.selectedList;
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
    color: @textcolor100;
    position: relative;
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
}
</style>
