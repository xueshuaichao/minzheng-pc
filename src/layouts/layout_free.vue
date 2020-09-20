<template>
    <div class="layout_free">
        <Row
            v-for="(row, index) in layout"
            :key="index"
        >
            <i-col
                v-for="col in row"
                :key="col.aid"
                :offset="col.offset"
                :span="col.span"
            >
                <slot :name="col.aid" />
            </i-col>
        </Row>
    </div>
</template>

<script>
export default {
    props: {
        config: {
            type: Array,
            required: true,
        },
    },
    computed: {
        layout() {
            const ret = [];
            let pos = 0;
            let row = [];
            const MAX_COL = 24;
            this.config.forEach((item) => {
                const col = item.column_num.split(',').map(i => +i);
                if (col[0] < pos) {
                    // 换行
                    ret.push(row);
                    row = [];
                    pos = 0;
                }
                row.push({
                    aid: `${item.aid}`,
                    offset: col[0] - (pos === MAX_COL ? 0 : pos) - 1,
                    span: col[1] - col[0] + 1,
                });
                // eslint-disable-next-line prefer-destructuring
                pos = col[1];
            });
            if (row.length > 0) {
                ret.push(row);
            }
            return ret;
        },
    },
};
</script>
