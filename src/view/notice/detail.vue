<template>
    <div class="notice-detail-page m-container">
        <i-breadcrumb
            class="breadcrumb"
            separator=">"
        >
            <i-breadcrumb-item to="/">
                首页
            </i-breadcrumb-item>
            <i-breadcrumb-item :to="{ name: 'noticeList' }">
                通知公告
            </i-breadcrumb-item>
            <i-breadcrumb-item>
                {{ notice.title }}
            </i-breadcrumb-item>
        </i-breadcrumb>
        <div
            v-if="notice != ''"
            class="notice-detail"
        >
            <h4 class="notice-title">
                {{ notice.title }}
            </h4>
            <!-- <p class="notice-content">
                {{ notice.content }}
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
            notice: '',
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
                .then((notice) => {
                    this.notice = notice.data;
                    console.log(this.notice);
                    this.getResource(this.notice.resourceId);
                });
        },
        getResource(resourceId) {
            return api.getResourceId({ id: resourceId }).then((notice) => {
                this.pdfUrl = notice.data.url;
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

.notice-title {
    margin: 20px 0 16px;
    font-size: 24px;
    font-weight: 600;
    color: @blue;
    line-height: 33px;
    letter-spacing: 1px;
    text-align: center;
}
.notice-content {
    padding-bottom: 50px;
    color: @textColor2;
    font-size: 16px;
    text-indent: 2em;
}
.notice-detail {
    margin-bottom: 24px;
}
</style>
