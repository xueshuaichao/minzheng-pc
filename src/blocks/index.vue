<script>
import Vue from 'vue';

const idMap = {
    23: () => import('./course/index.vue'),
    16: () => import('./course/detail.vue'),
    // 17: () => import('./course/player.vue'),
    // 14: () => import('./course/hot.vue'),
    // 15: () => import('./course/recommend.vue'),

    11: () => import('./system/banner.vue'),
    12: () => import('./system/course.vue'),
    20: () => import('./system/hotclass.vue'),
    17: () => import('./system/training.vue'),
    19: () => import('./system/coursesystem.vue'),
    18: () => import('./system/process.vue'),
    13: () => import('./training/list.vue'),
    14: () => import('./training/detail.vue'),
    15: () => import('./learnings/index.vue'),
};

export default {
    props: {
        name: {
            type: [String, Number],
            required: true,
        },
        routerParams: {
            type: Object,
            default() {
                return {};
            },
        },
        setting: {
            type: [Object, Array],
            default() {
                return {};
            },
        },
    },
    render(h) {
        const block = idMap[this.name];
        if (block) {
            return h(block, {
                on: this.$listeners,
                attrs: this.$attrs,
                scopedSlots: this.$scopedSlots,
                props: this.$props,
            });
        }
        if (Vue.config.productionTip) {
            return h('div', [`unrecongnized block "${this.name}"`]);
        }
        return null;
    },
};
</script>
