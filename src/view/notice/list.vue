<template>
    <div class="notice-list-page m-container">
        <i-breadcrumb
            class="breadcrumb"
            separator=">"
        >
            <i-breadcrumb-item to="/">
                首页
            </i-breadcrumb-item>
            <i-breadcrumb-item>
                通知公告
            </i-breadcrumb-item>
        </i-breadcrumb>
        <ul class="notice-list">
            <router-link
                v-for="notice in noticeList"
                :key="notice.id"
                :to="{ name: 'noticeDetail', params: { id: notice.id } }"
                class="notice-item clearfix"
                tag="li"
            >
                <span class="fr">
                    {{ notice.updateTime.split(" ")[0] }}
                </span>
                <div class="title">
                    · {{ notice.title }}
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
            noticeList: [],
        };
    },
    created() {
        this.getNoticeList();
    },
    methods: {
        getNoticeList() {
            return api.getNoticeList({ type: 0 }).then((data) => {
                this.noticeList = data.data;
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
.notice-list {
    margin-top: 12px;
    padding: 0 40px 0 80px;
}
.notice-item {
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
