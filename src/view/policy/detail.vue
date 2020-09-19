<template>
    <div class="policy-detail-page m-container">
        <i-breadcrumb
            class="breadcrumb"
            separator=">"
        >
            <i-breadcrumb-item to="/">
                首页
            </i-breadcrumb-item>
            <i-breadcrumb-item :to="{ name: 'policyList' }">
                政策法规
            </i-breadcrumb-item>
            <i-breadcrumb-item>
                {{ policy.title }}
            </i-breadcrumb-item>
        </i-breadcrumb>
        <div class="policy-detail">
            <h4 class="policy-title">
                {{ policy.title }}
            </h4>
            <!-- <p class="policy-content">
                {{ policy.content }}
            </p> -->
            <iframe
                :src="pdfUrl"
                style="width:100%;height:460px"
            />
        </div>
    </div>
</template>

<script>
import api from '../../api/notice';

export default {
    data() {
        return {
            policy: '',
            pdfUrl: '',
        };
    },
    created() {
        this.getNotice();
    },
    methods: {
        getNotice() {
            return api
                .getNoticeById({ id: this.$route.params.id })
                .then((policy) => {
                    this.policy = policy.data;
                    this.getResource(this.policy.resourceId);
                });
        },
        getResource(resourceId) {
            return api.getResourceId({ id: resourceId }).then((policy) => {
                this.pdfUrl = policy.data.url;
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

.policy-title {
    margin: 20px 0 16px;
    font-size: 24px;
    font-weight: 600;
    color: @blue;
    line-height: 33px;
    letter-spacing: 1px;
    text-align: center;
}
.policy-content {
    padding-bottom: 50px;
    color: @textColor2;
    font-size: 16px;
    text-indent: 2em;
}
.policy-detail {
    margin-bottom: 24px;
}
</style>
