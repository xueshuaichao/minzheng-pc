<template>
    <div class="page-course-list page-container">
        <named-layout :name="config.templateId">
            <template
                v-for="item in layout"
                v-slot:[item.aid]
            >
                <block
                    v-for="block in item.blocks"
                    :key="block.blockInstanceId"
                    :name="block.blockId"
                    :setting="block.setting"
                    :router-params="routerParams"
                />
            </template>
        </named-layout>
    </div>
</template>

<script>
import NamedLayout from '../layouts/index.vue';
import Block from '../blocks/index.vue';
import store from '../store/index';

export default {
    components: {
        NamedLayout,
        Block,
    },
    data() {
        return {
            config: {},
            routerParams: {},
        };
    },
    computed: {
        layout() {
            try {
                const json = JSON.parse(this.config.layout);
                json.forEach((item) => {
                    // eslint-disable-next-line no-param-reassign
                    item.blocks = item.block_id.map((id, index) => {
                        const instanceId = item.block_instance_id
                            ? item.block_instance_id[index]
                            : id;
                        return {
                            blockId: id,
                            blockInstanceId: instanceId,
                            setting: this.settings[instanceId],
                        };
                    });
                });
                return json;
            } catch (e) {
                console.error(e);
                return [];
            }
        },
        settings() {
            const ret = {};
            this.config.setting.forEach((item) => {
                ret[item.bid] = JSON.parse(item.setting);
            });
            return ret;
        },
    },
    watch: {
        $route() {
            // this.routerParams = this.$routes.params;
            this.renderPage();
        },
    },
    created() {
        this.renderPage();
    },

    methods: {
        renderPage() {
            const { meta, params } = this.$route;
            this.config = store.getters.getConfigByPage(
                meta.moduleId,
                meta.name,
            );
            console.log(this.config, this.layout, params);
            this.routerParams = params;
        },
    },
};
</script>
