<template>
    <div
        class="page-course-list"
        :class="{ 'page-container': mainBlock }"
    >
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
        <BackTop
            :height="100"
            :bottom="200"
        >
            <div class="BackTop" />
        </BackTop>
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
            mainBlock: true,
        };
    },
    beforeRouteUpdate(to, from, next) {
        console.log(to, 'to11');
        // react to route changes...
        // don't forget to call next()
        next();
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
            this.mainBlock = this.$route.path !== '/';
            this.renderPage();
        },
    },
    created() {
        console.log(this.$route);
        if (this.$route.path === '/') {
            this.mainBlock = false;
        }
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
<style lang="less" scoped>
.BackTop {
    width: 78px;
    height: 78px;
    background: url("../assets/images/home/Oval@2x(1).png") no-repeat;
    background-size: 100% 100%;
    &:hover {
        background: url("../assets/images/home/Oval@2x.png") no-repeat;
        background-size: 100% 100%;
    }
}
</style>
