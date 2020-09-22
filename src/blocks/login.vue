<template>
    <div class="saas-login">
        <Form>
            <FormItem>
                <Input
                    type="text"
                    placeholder="手机号"
                />
            </FormItem>
            <FormItem>
                <Input
                    type="password"
                    placeholder="密码"
                />
            </FormItem>
            <Button
                type="primary"
                long
            >
                登录
            </Button>
        </Form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                username: '',
                password: '',
            },
        };
    },
};
</script>

<style>
.saas-login {
    padding: 16px;
}
</style>
