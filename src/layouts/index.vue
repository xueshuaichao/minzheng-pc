<script>
const mapTemplate = {
    layout_1: () => import('./layout_1.vue'),
    layout_2: () => import('./layout_2.vue'),
    layout_3: () => import('./layout_3.vue'),
    layout_free: () => import('./layout_free.vue'),
    layout_recursive: () => import('./layout_recursive.vue'),
};
const idMap = {
    2: () => import('./layout_1.vue'),
    3: () => import('./layout_2.vue'),
    4: () => import('./layout_3.vue'),
    layout_recursive: () => import('./layout_recursive.vue'),
};
// todo may be has a prop "config" or "data"
export default {
    name: 'NamedLayout',
    props: {
        name: {
            type: [String, Number],
            required: true,
        },
    },
    render(h) {
        const layout = mapTemplate[this.name] || idMap[this.name];
        if (!layout) {
            console.warn(`layout: "${this.name}" is not found`);
            return null;
        }
        return h(layout, {
            on: this.$listeners,
            attrs: this.$attrs,
            scopedSlots: this.$scopedSlots,
            props: this.$props,
        });
    },
};
</script>
