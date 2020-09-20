<script>
export default {
    props: {
        config: {
            type: Array,
            required: true,
        },
    },
    render(h) {
        const { $scopedSlots: $slots } = this;
        // console.log('recursive', $slots);
        function mapNode(layout) {
            return h(
                'div',
                {
                    attrs: {
                        class: 'layout_node',
                    },
                },
                [
                    ...layout.map((row, index) => h(
                        'Row',
                        {
                            key: index,
                        },
                        [
                            ...row.map((col, i) => h(
                                'i-col',
                                {
                                    key: i,
                                    props: {
                                        span: col.span,
                                        offset: col.offset,
                                    },
                                },
                                [
                                    col.children && col.children.length
                                        ? mapNode(col.children)
                                        : $slots[col.aid],
                                ],
                            )),
                        ],
                    )),
                ],
            );
        }
        return mapNode(this.$props.config);
    },
};
</script>
