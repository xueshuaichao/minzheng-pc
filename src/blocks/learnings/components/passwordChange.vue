<template>
    <Modal
        v-model="visible"
        title="修改密码"
    >
        <Form
            ref="passwordform"
            :model="passwordformValidate"
            :rules="passwordruleValidate"
            :label-width="80"
        >
            <FormItem
                label="密码"
                prop="password"
            >
                <Input
                    v-model="passwordformValidate.password"
                    placeholder="请输入原密码"
                />
            </FormItem>
            <FormItem
                label="新密码"
                prop="newPassword"
            >
                <Input
                    v-model="passwordformValidate.newPassword"
                    placeholder="请输入新密码"
                />
            </FormItem>
            <FormItem
                label="确认密码"
                prop="repeatPassword"
            >
                <Input
                    v-model="passwordformValidate.repeatPassword"
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
                @click="asyncok('passwordform')"
            >
                确认
            </Button>
        </div>
    </Modal>
</template>

<script>
import learningsApi from '../../../api/learnings';

const passwordvalidator = {
    validator: (rule, value) => {
        if (!value) {
            return true;
        }
        if (value.length < 6) {
            // eslint-disable-next-line
            rule.message = "密码位数不得小于6位";
            return false;
        }
        if (!/^(?![^a-zA-Z]+$)(?!\D+$)/.test(value)) {
            // eslint-disable-next-line
            rule.message = "请输入字母和数字的组合";
            return false;
        }
        return true;
    },
    trigger: 'blur',
};

export default {
    model: {
        prop: 'visible',
        event: 'change',
    },
    props: {
        visible: Boolean,
    },
    data() {
        return {
            modal_loading: false,
            passwordformValidate: {
                password: '',
                newPassword: '',
                repeatPassword: '',
            },
            passwordruleValidate: {
                password: [
                    {
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur',
                    },
                    passwordvalidator,
                ],
                newPassword: [
                    {
                        required: true,
                        message: '请输入新密码',
                        trigger: 'blur',
                    },
                    passwordvalidator,
                ],
                repeatPassword: [
                    {
                        required: true,
                        message: '请再次输入新密码',
                        trigger: 'blur',
                    },
                    passwordvalidator,
                ],
            },
        };
    },
    methods: {
        asyncok(item) {
            this.$refs[item].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                    learningsApi
                        .updatePassword(this.passwordformValidate)
                        .then((data) => {
                            console.log(data);
                            this.$refs[item].resetFields();
                            this.$emit('change', false);
                        })
                        .catch((data) => {
                            console.log(data, 'data123');
                        });
                } else {
                    this.$Message.error('Fail!');
                }
            });
        },
        cancel() {
            console.log('cancel');
            this.$refs.passwordform.resetFields();
            this.$emit('change', false);
        },
    },
};
</script>

<style></style>
