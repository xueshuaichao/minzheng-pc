<template>
    <div class="home-train-block">
        <div class="content">
            <h4>
                课程体系
            </h4>
            <p class="txt">
                专业课程体系，为你提供你想学的数千门技能课程
            </p>
            <div class="list-wrap clearfix">
                <img
                    src="../../assets/images/course/Mask2@2x.png"
                    alt=""
                >
                <img
                    src="../../assets/images/course/Mask@2x.png"
                    alt=""
                >
                <img
                    src="../../assets/images/course/Mask1@2x.png"
                    alt=""
                >
            </div>
        </div>
    </div>
</template>
<script>
import api from '../../api/course';

export default {
    components: {},
    data() {
        return {
            list1: {},
            list: [],
            listparam: {
                pageNum: 1,
                pageSize: 7,
                categoryId: null,
                type: 0,
            },
        };
    },
    created() {
        this.getList();
    },
    methods: {
        //  暂时用课程列表的数据， 精品课接口参数有问题
        getList() {
            api.findBoutiqueCourseList({ pageSize: '7' }).then((res) => {
                if (res.success) {
                    this.list = res.data.slice(1, 7);
                    [this.list1] = res.data.slice(0, 1);
                }
            });
        },
        jumpMore() {
            this.$router.push({
                path: '/course',
            });
        },
        goDetail(id) {
            this.$router.push({
                name: 'courseDetail',
                query: {
                    id,
                },
            });
        },
    },
};
</script>
<style scoped lang="less">
.home-train-block {
    background: #f7f7f9;
    padding: 60px 0 84px;
    .content {
        width: 1200px;
        margin: 0 auto;
        h4 {
            color: #272f55;
            font-size: 30px;
            line-height: 42px;
            margin-bottom: 14px;
            text-align: center;
        }
        .txt {
            text-align: center;
            color: #a7adbb;
            font-size: 16px;
            line-height: 22px;
            margin-bottom: 68px;
        }
        .list-wrap {
            img {
                widows: 380px;
                height: 503px;
                margin-right: 30px;
                display: inline-block;
                &:last-child {
                    margin-right: 0px;
                }
            }
        }
        .btn {
            cursor: pointer;
            width: 243px;
            height: 54px;
            background: #d14242;
            border-radius: 27px;
            margin: 55px auto 20px;
            text-align: center;
            font-size: 17px;
            font-weight: 500;
            color: #ffffff;
            line-height: 24px;
            border: none;
            outline: none;
            display: block;
        }
    }
}
</style>
