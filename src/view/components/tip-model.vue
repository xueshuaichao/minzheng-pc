<template>
    <Modal
        v-model="show"
        class="my-tip-model"
        width="720"
    >
        <div
            slot="header"
            class="my-tip-header"
        >
            <Icon
                type="ios-close"
                class="my-tip-close"
                @click="toggle(0)"
            />
            <img src="../../assets/images/tip-model.png">
            考试须知
        </div>
        <div>
            <p class="txt">
                注意：进入考试后必须在<b>{{ detail.duration }}分钟</b>内提交试卷，时间截止后系统将自动交卷，中途意外退出也会计时，若异常退出，<b>请尽快再次回到考试。</b>
            </p>
            <ul>
                <li>
                    考核记录最高成绩
                </li>
                <li>
                    考核标准：<span>{{ detail.totalCount }}道题{{
                        detail.duration
                    }}分钟</span>
                </li>
                <li>
                    合格标准：<span>{{ detail.passingScore }}分及格、满分{{
                        detail.totalScore
                    }}分</span>
                </li>
                <li>
                    考试题型：<span>{{ detail.types }}</span>
                </li>
            </ul>
        </div>
        <div
            slot="footer"
            class="my-modal-btn"
            @click="toggle(1)"
        >
            开始考试
        </div>
    </Modal>
</template>
<script>
import api from '../../api/training';

export default {
    props: {
        show: {
            type: Boolean,
            default: true,
        },
        sceneId: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            detail: {
                questionType: [],
                duration: 0,
                totalScore: 0,
                passingScore: 0,
                totalCount: 0,
                types: '',
            },
        };
    },
    watch: {
        sceneId(val) {
            if (val) {
                this.getNote();
            }
        },
    },
    methods: {
        toggle(arg) {
            this.$emit('closeing', arg);
        },
        getNote() {
            api.getNote({ id: this.sceneId }).then((res) => {
                if (res.success) {
                    let types = '';
                    if (res.data.questionType && res.data.questionType.length) {
                        types = res.data.questionType.join('、');
                    }
                    this.detail = {
                        ...this.detail,
                        ...res,
                        duration: this.transferTime(res.data.duration),
                        types,
                    };
                }
            });
        },
        transferTime(time) {
            return Math.round(time / 60);
        },
    },
};
</script>
<style scoped lang="less">
.my-tip-model {
    /deep/.ivu-modal-header,
    /deep/.ivu-modal-footer {
        border: none !important;
    }
    /deep/.ivu-modal-close {
        display: none;
    }
    .my-tip-close {
        position: absolute;
        right: 20px;
        top: 20px;
        font-size: 34px;
        color: #9397aa;
    }
    .my-tip-header {
        font-size: 24px;
        color: #272f55;
        font-weight: 500;
        text-align: center;
        margin-top: 20px;
        img {
            position: relative;
            top: 6px;
            left: 8px;
        }
    }
    .my-modal-btn {
        background: #d14242;
        color: #fff;
        font-size: 20px;
        width: 198px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        margin: 0 auto 20px;
        border-radius: 6px;
        cursor: pointer;
    }

    .txt {
        color: #272f55;
        font-size: 18px;
        line-height: 28px;
        padding: 0 70px;
        b {
            color: #d14242;
            font-style: normal;
        }
    }
    ul {
        width: 400px;
        margin: 0 auto;
    }
    li {
        list-style: none;
        width: 400px;
        height: 40px;
        line-height: 40px;
        padding-left: 68px;
        box-sizing: border-box;
        background: #fef6f6;
        border-radius: 6px;
        color: #272f55;
        font-size: 20px;
        margin-top: 16px;
        font-weight: 500;
        span {
            font-weight: normal;
        }
    }
}
</style>
