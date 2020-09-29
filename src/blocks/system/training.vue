<template>
    <div>
        trainig block
    </div>
</template>
<script>
import api from '../../api/training';

export default {
    data() {
        return {
            list: [],
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            api.getTaskList(this.filter).then((res) => {
                console.log(res, 'getTaskList');
                if (res.success) {
                    this.list = res.data.list;
                    this.total = res.data.total;
                }
            });
        },
    },
};
</script>
<style scoped lang="less"></style>
