<template>
    <div class="page">
        <iframe
            id="aliyunPreview"
            :src="'../../../static/pdfjs/web/viewer.html?file=' + url"
            frameborder="0"
        />
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {};
    },
    mounted() {},
    methods: {},
};
</script>

<style scoped lang="less"></style>
