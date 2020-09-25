<template>
    <div class="home">
        <div style="width: 232px;">
            <menu1 @toggle="currentItem = $event" />
        </div>
        <div style="flex:1;padding-left:22px;padding-top:24px;">
            <div v-if="currentItem === 1">
                <statistics />
                <list />
            </div>
            <div v-if="currentItem === 2">
                <message />
            </div>
            <div v-if="currentItem === 3">
                <setting />
            </div>
        </div>
    </div>
</template>

<script>
import menu1 from './menu.vue';
import statistics from './statistics.vue';
import list from './list.vue';
import Message from './message.vue';
import Setting from './setting.vue';

export default {
    name: 'Index',
    components: {
        menu1,
        statistics,
        list,
        Message,
        Setting,
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
