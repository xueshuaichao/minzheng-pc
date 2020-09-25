<template>
    <div class="page">
        <Page
            :total="total"
            :page-num="pagenum"
            :current="currCurrent"
            :page-size="pagesize"
            show-elevator
            @on-change="changePage"
        />
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        total: {
            type: Number,
            required: true,
            default: 0,
        },
        pagesize: {
            type: Number,
            required: true,
        },
        pagenum: {
            type: Number,
            required: true,
            default: 1,
        },
        currCurrent: {
            type: Number,
            required: true,
            default: 1,
        },
    },
    data() {
        return {};
    },
    mounted() {},
    methods: {
        changePage(index) {
            this.$emit('changepage', index);
        },
    },
};
</script>

<style scoped lang="less"></style>
