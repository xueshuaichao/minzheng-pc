<template>
    <div class="job-list-page m-container">
        <i-breadcrumb
            class="g-breadcrumb"
            separator=">"
        >
            <i-breadcrumb-item to="/">
                首页
            </i-breadcrumb-item>
            <i-breadcrumb-item>
                就业信息
            </i-breadcrumb-item>
        </i-breadcrumb>
        <div class="job-list">
            <i-table
                :columns="columns"
                :data="jobs"
                @on-row-click="handleRowClick"
            />
            <i-page
                class="pager"
                :current.sync="pager.pageNum"
                :total="pager.total"
                prev-text="上一页"
                next-text="下一页"
                @on-change="handlePageChange"
            />
        </div>
    </div>
</template>

<script>
import api from '../../api/job';

export default {
    data() {
        return {
            columns: [
                {
                    title: '公司名称',
                    key: 'companyName',
                    width: 460,
                },
                {
                    title: '招聘岗位',
                    key: 'name',
                    width: 460,
                },
                {
                    title: '薪资待遇',
                    key: 'salary',
                    className: 'salary',
                },
            ],
            jobs: [],
            pager: {
                pageNum: 1,
                pageSize: 10,
                total: 0,
            },
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            return api
                .getList(this.pager.pageNum, this.pager.pageSize)
                .then((data) => {
                    console.log(data);
                    this.jobs = data.data.list;
                    this.pager.total = data.total;
                });
        },
        handlePageChange() {
            this.getList();
        },
        handleRowClick(rowData) {
            this.$router.push({
                name: 'jobDetail',
                params: {
                    id: rowData.id,
                },
            });
        },
    },
};
</script>

<style lang="less">
@import "../../less/variables.less";

.job-list-page {
    .breadcrumb {
        margin-top: 32px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e7ebf3;
    }
    .job-list {
        margin-top: 14px;
        padding: 0 30px;
        td {
            cursor: pointer;
        }
    }
    td.salary {
        color: #d84344;
    }
    .pager {
        margin: 16px auto;
        text-align: center;
    }
    tr.ivu-table-row-hover td {
        background: #f2f6fc !important;
    }
    tr.ivu-table-row-hover td:nth-child(1) {
        color: @mainColor;
    }
    .ivu-table th,
    .ivu-table td {
        border-bottom: 1px solid transparent;
    }
}
</style>
