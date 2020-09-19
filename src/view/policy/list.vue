<template>
    <div class="policy-list-page m-container">
        <i-breadcrumb
            class="breadcrumb"
            separator=">"
        >
            <i-breadcrumb-item to="/">
                首页
            </i-breadcrumb-item>
            <i-breadcrumb-item>
                政策法规
            </i-breadcrumb-item>
        </i-breadcrumb>
        <ul class="policy-list">
            <router-link
                v-for="policy in policyList"
                :key="policy.id"
                :to="{ name: 'policyDetail', params: { id: policy.id } }"
                class="policy-item clearfix"
                tag="li"
            >
                <span class="fr">
                    {{ policy.updateTime.split(" ")[0] }}
                </span>
                <div class="title">
                    · {{ policy.title }}
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
import api from '../../api/notice';

export default {
    data() {
        return {
            policyList: [],
        };
    },
    created() {
        this.getPolicyList();
    },
    methods: {
        getPolicyList() {
            return api.getNoticeList({ type: 1 }).then((data) => {
                this.policyList = data.data;
            });
        },
    },
};
</script>

<style lang="less" scoped>
@import "../../less/variables.less";
.breadcrumb {
    margin-top: 32px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e7ebf3;
}
.policy-list {
    margin-top: 12px;
    padding: 0 40px 0 80px;
}
.policy-item {
    margin-bottom: 16px;
    font-size: 16px;
    color: @textColor3;
    cursor: pointer;
    .title {
        margin-right: 100px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: @textColor2;
    }
}
</style>
