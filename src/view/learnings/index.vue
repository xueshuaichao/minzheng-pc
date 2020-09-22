<template>
    <div class="home">
        <div style="width: 232px;">
            <menu1 @toggle="currentItem = val" />
        </div>
        <div style="flex:1;">
            <statistics />
            <list />
        </div>
    </div>
</template>

<script>
import menu1 from './menu.vue';
import statistics from './statistics.vue';
import list from './list.vue';

export default {
    name: 'Index',
    components: {
        menu1,
        statistics,
        list,
    },
    data() {
        return {
            currentItem: 1,
        };
    },
    created() {},
    methods: {},
};
</script>

<style lang="less">
@import "../../less/variables.less";
.flex-row {
    display: flex;
    flex-flow: row;
    -webkit-box-align: center;
    align-items: center;
    justify-content: space-between;
}
.home {
    display: flex;
    background: #f3f3f3;
}
</style>
