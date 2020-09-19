<template>
    <div class="job-detail-page m-container">
        <i-breadcrumb
            class="g-breadcrumb"
            separator=">"
        >
            <i-breadcrumb-item to="/">
                首页
            </i-breadcrumb-item>
            <i-breadcrumb-item :to="{ name: 'jobList' }">
                就业信息
            </i-breadcrumb-item>
            <i-breadcrumb-item>
                {{ job.name }}
            </i-breadcrumb-item>
        </i-breadcrumb>
        <div class="job-detail">
            <div class="hd">
                <div class="hd-content">
                    <h3 class="job-name">
                        {{ job.companyName }}
                    </h3>
                    <p class="sub">
                        <span class="salary">{{ job.salary }}</span>
                        <span>发布时间：{{ job.publishTime }}</span>
                    </p>
                    <ul class="tags">
                        <li
                            v-for="s in job.welfare"
                            :key="s"
                            class="tag"
                        >
                            {{ s }}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="bd">
                <div class="aside">
                    <div class="group">
                        <label>公司名称</label>
                        <p>{{ job.companyName }}</p>
                    </div>
                    <div class="group">
                        <label>联系人</label>
                        <p>{{ job.contactUserName }}</p>
                    </div>
                    <div class="group">
                        <label>联系电话</label>
                        <p>{{ job.contactPhone }}</p>
                    </div>
                    <div class="group">
                        <label>投递简历</label>
                        <p>{{ job.contactEmail }}</p>
                    </div>
                    <div class="group">
                        <label>工作地点</label>
                        <p>{{ job.companyAddress }}</p>
                    </div>
                    <div class="group">
                        <label>薪酬福利</label>
                        <p>{{ job.welfare }}</p>
                    </div>
                </div>
                <div class="main">
                    <h5>岗位信息</h5>
                    <div class="content">
                        <p>
                            1、主负责移动端、PC端产品UI视觉设计工作，能够独立且高品质完成产品设计任务；
                        </p>
                        2、参与相关设计流程、设计标准以及视觉元素规范的制定，与产品、技术同学密切合作，根据需求提供优秀合理的设计方案；<br>
                        3、跟踪把握交互、设计与创意流行趋势，对界面设计和用户体验提供创新想法和观点。<br>
                    </div>
                    <h5>岗位职责</h5>
                    <div class="content">
                        <p>
                            1、主负责移动端、PC端产品UI视觉设计工作，能够独立且高品质完成产品设计任务；
                        </p>
                        2、参与相关设计流程、设计标准以及视觉元素规范的制定，与产品、技术同学密切合作，根据需求提供优秀合理的设计方案；<br>
                        3、跟踪把握交互、设计与创意流行趋势，对界面设计和用户体验提供创新想法和观点。<br>
                    </div>
                    <h5>任职要求</h5>
                    <div class="content">
                        1、3-5年UI设计经验，有独立完成且上线的项目，有想法并能够落地实现，具备跨平台设计能力。
                        2、熟练使用AI、Ps、Sketch、Flash（或AE）等设计软件；
                        3、能够专注视觉的表达，具有较强的创新力，注重设计细节，对设计趋势具备敏锐的洞察力，能承受一定工作压力，对工作有较强的责任心;
                        4、具备一定的动效设计能力，手绘能力，可设计动态表情，能做界面交互动画优先考虑；
                        5、专科以上学历，美术、视觉传达、工业设计等设计相关专业毕业优先。
                        6、简历请附上具有代表性的相关设计作品链接。
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../../api/job';

export default {
    data() {
        return {
            job: {},
        };
    },
    created() {
        this.getDetail();
    },
    methods: {
        getDetail() {
            return api.getDetail(this.$route.params.id).then((data) => {
                this.job = data.data;
            });
        },
    },
};
</script>

<style lang="less" scoped>
@import "../../less/variables.less";

.job-detail-page {
    width: 100%;
}
.g-breadcrumb {
    width: 1200px;
    margin: 0 auto;
    margin-top: 32px;
}
.job-detail {
    margin-top: 14px;
    // padding: 0 30px;
    .hd {
        padding: 24px 0 12px;
        background: #f2f6fc;
        color: @textColor2;
        .hd-content {
            width: 1200px;
            margin: 0 auto;
            padding: 0 30px;
        }
    }
}
.job-name {
    margin: 0 0 24px;
    line-height: 1;
    font-size: 36px;
    color: @textColor1;
}
.sub {
    font-size: 18px;
}
.salary {
    margin-right: 18px;
    color: #d84344;
}
.tags {
    margin-top: 16px;
    list-style: none;
}
.tag {
    display: inline-block;
    margin-right: 24px;
    background: #fff;
    padding: 0 10px;
    font-size: 14px;
    line-height: 22px;
    border-radius: 11px;
}
.bd {
    padding: 32px 30px;
    width: 1200px;
    margin: 0 auto 50px;
    overflow: hidden;
}
.main {
    margin-right: 417px;
    color: @textColor1;

    h5 {
        margin-bottom: 14px;
        font-size: 18px;
        font-weight: bold;
    }
    .content {
        margin-bottom: 32px;
        line-height: 1.7;
    }
}
.aside {
    padding: 24px;
    float: right;
    width: 380px;
    box-shadow: 0px 0px 20px 0px rgba(43, 51, 59, 0.08);
    border-radius: 6px;
    .group {
        line-height: 1;
        &:not(:last-child) {
            margin-bottom: 24px;
        }
    }
    label {
        color: @textColor2;
    }
    p {
        margin-top: 14px;
        color: @textColor1;
    }
}
</style>
