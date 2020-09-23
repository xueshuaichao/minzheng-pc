<template>
    <div class="list-box">
        <div class="regi-status">
            <div>报名状态：</div>
            <div
                class="task-item"
                :class="{ active: showItem === 1 }"
                @click="handleToggle(1)"
            >
                任务
            </div>
            <div
                class="task-item"
                :class="{ active: showItem === 2 }"
                @click="handleToggle(2)"
            >
                选学
            </div>
            <div
                class="task-item"
                :class="{ active: showItem === 3 }"
                @click="handleToggle(3)"
            >
                测评
            </div>
        </div>
        <taskList v-if="showItem === 1" />
        <electiveList v-if="showItem === 2" />
        <testList v-if="showItem === 3" />
        <!-- <keep-alive>
            <component :is="currentTabComponent" />
        </keep-alive> -->
    </div>
</template>

<script>
import taskList from './components/task-list.vue';
import electiveList from './components/elective-list.vue';
import testList from './components/test-list.vue';

export default {
    components: {
        taskList,
        testList,
        electiveList,
    },
    data() {
        return {
            showItem: 1,
        };
    },
    created() {},
    methods: {
        handleToggle(val) {
            this.showItem = val;
        },
    },
};
</script>

<style lang="less" scoped>
.list-box {
    // background: #fff;
    .regi-status {
        height: 82px;
        display: flex;
        padding: 24px;
        border-bottom: 1px solid #e6e6e6;
        background: #fff;
        .task-item {
            width: 80px;
            text-align: center;
            cursor: pointer;
        }
        .active {
            position: relative;
            color: #d14242;
            &::after {
                content: " ";
                width: 14px;
                height: 4px;
                position: absolute;
                background: #d14242;
                bottom: 0;
                left: 33px;
                border-radius: 4px;
            }
        }
    }
}
</style>
