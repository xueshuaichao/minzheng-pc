<template>
    <div class="menu-box">
        <div
            class="menu-item"
            :class="{ active: currentItem === 1 }"
            @click="handleToggle(1)"
        >
            <img
                v-show="currentItem === 1"
                src="@/assets/images/learnings/learn-select.png"
            >
            <img
                v-show="currentItem !== 1"
                src="@/assets/images/learnings/learn.png"
            >
            学习
        </div>
        <div
            class="menu-item"
            :class="{ active: currentItem === 2 }"
            @click="handleToggle(2)"
        >
            <img
                v-show="currentItem === 2"
                src="@/assets/images/learnings/message-select.png"
            >
            <img
                v-show="currentItem !== 2"
                src="@/assets/images/learnings/message.png"
            >
            消息
        </div>
        <div
            class="menu-item"
            :class="{ active: currentItem === 3 }"
            @click="handleToggle(3)"
        >
            <img
                v-show="currentItem === 3"
                src="@/assets/images/learnings/setting-select.png"
            >
            <img
                v-show="currentItem !== 3"
                src="@/assets/images/learnings/setting.png"
            >
            设置
        </div>
    </div>
</template>

<script>
export default {
    name: 'Menu',
    data() {
        return {
            currentItem: 1,
        };
    },
    methods: {
        handleToggle(val) {
            this.currentItem = val;
            this.$emit('toggle', val);
        },
    },
};
</script>

<style lang="less" scoped>
.menu-box {
    font-size: 20px;
    // width: 232px;
    background: #fff;
    height: 100%;
    .menu-item {
        height: 76px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        img {
            width: 20px;
            height: 20px;
            margin-right: 20px;
        }
    }
    .active {
        color: #d14242;
        background: #f6eeee;
        position: relative;
        &::before {
            position: absolute;
            content: " ";
            left: 0;
            width: 4px;
            background: #d14242;
            height: 100%;
        }
    }
}
</style>
