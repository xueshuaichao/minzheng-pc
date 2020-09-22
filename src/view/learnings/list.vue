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
        <testList v-if="showItem === 3" />
    </div>
</template>

<script>
import taskList from './components/task-list.vue';
import testList from './components/test-list.vue';

export default {
    components: {
        taskList,
        testList,
    },
    data() {
        return {
            taskList: [],
            showItem: 1,
        };
    },
    created() {
        this.taskFindByCondition();
    },
    methods: {
        taskFindByCondition() {
            this.taskList = [
                {
                    id: 1,
                    name: '任务 0',
                    status: 2,
                    progress: 96,
                    trainStartTime: '2020-09-19 19:45:42',
                    trainEndTime: '2020-09-19 19:45:42',
                },
            ];
        },
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
