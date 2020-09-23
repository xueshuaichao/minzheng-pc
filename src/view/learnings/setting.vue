<template>
    <div class="content">
        <div class="title">
            个人设置
        </div>
        <div class="upload">
            <img
                src=""
                alt=""
            >
            <Upload action="//jsonplaceholder.typicode.com/posts/">
                <Button icon="ios-cloud-upload-outline">
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
                    prop="mail"
                >
                    <div
                        v-if="phoneShow"
                        style="display:flex;align-items:center"
                    >
                        <Input
                            v-model="formValidate2.mail"
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
                    prop="city"
                >
                    <div
                        v-if="cityShow"
                        style="display:flex;align-items:center"
                    >
                        <Select
                            v-model="formValidate3.city"
                            style="width:272px;margin-right:5px;"
                            placeholder="Select your city"
                        >
                            <Option value="beijing">
                                New York
                            </Option>
                            <Option value="shanghai">
                                London
                            </Option>
                            <Option value="shenzhen">
                                Sydney
                            </Option>
                        </Select>
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
            </Form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formValidate1: {
                name: '',
            },
            ruleValidate1: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                ],
            },
            formValidate2: {
                mail: '',
            },
            ruleValidate2: {
                mail: [
                    {
                        required: true,
                        message: '请输入手机号',
                        trigger: 'blur',
                    },
                    {
                        type: 'email',
                        message: '手机号格式不正确',
                        trigger: 'blur',
                    },
                ],
            },
            formValidate3: {
                city: '',
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
        };
    },
    methods: {
        handleSubmit(item) {
            this.$refs[item].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            });
        },
    },
};
</script>

<style lang="less">
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
