<template>
    <!-- <div class="page"> -->
    <div class="infoLeft">
        <div class="infoTab">
            <span
                :class="changeInfo === '1' ? 'spanselect' : ''"
                @click="changeTab('1')"
            >简介</span>
            <span
                :class="changeInfo === '2' ? 'spanselect' : ''"
                @click="changeTab('2')"
            >目录</span>
            <span
                :class="changeInfo === '3' ? 'spanselect' : ''"
                @click="changeTab('3')"
            >评价</span>
        </div>
        <div class="infoContent">
            <div
                v-if="changeInfo === '1'"
                class="des"
            >
                {{ courseIntro.intro }}
            </div>
            <div
                v-if="changeInfo === '2'"
                class="catalog"
            >
                <div class="chapter">
                    <Collapse simple>
                        <Panel
                            v-for="item in catelogList"
                            :key="item.id"
                        >
                            <span><Icon
                                      v-if="!item.menuFlag"
                                      type="md-arrow-dropright-circle"
                                  />
                                {{ item.title }}</span>
                            <ul slot="content">
                                <li
                                    v-for="lesson1 in item.childrenList"
                                    :key="lesson1.id"
                                    class="firstli"
                                >
                                    <p
                                        class="firstli-p"
                                        @click="showresource(lesson1)"
                                    >
                                        <Icon
                                            v-if="!lesson1.menuFlag"
                                            type="md-arrow-dropright-circle"
                                        />
                                        {{ lesson1.detailName }}
                                    </p>
                                    <div
                                        v-for="lesson2 in lesson1.childrenList"
                                        :key="lesson2.id"
                                        class="secondP"
                                    >
                                        <span
                                            class="secondLi-span"
                                            @click="showresource(lesson2)"
                                        ><Icon
                                             v-if="!lesson2.menuFlag"
                                             type="md-arrow-dropright-circle"
                                         />
                                            {{ lesson2.detailName }}
                                        </span>
                                        <p
                                            v-for="lesson3 in lesson2.childrenList"
                                            :key="lesson3.id"
                                            class="thirdP"
                                        >
                                            <span
                                                class="thirdSpan"
                                                @click="showresource(lesson3)"
                                            ><Icon
                                                 v-if="!lesson3.menuFlag"
                                                 type="md-arrow-dropright-circle"
                                             />
                                                {{ lesson3.detailName }}
                                            </span>
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </Panel>
                    </Collapse>
                </div>
            </div>
            <div
                v-if="changeInfo === '3'"
                class="judge"
            >
                <div class="judge-top">
                    <span class="pingfen">综合评分：</span>
                    <Rate
                        v-model="zhjudge"
                        disabled
                        show-text
                    >
                        <span style="color: #f5a623">{{ zhjudge }}分</span>
                    </Rate>
                </div>
                <div class="judge-myjudge">
                    <span class="pingfen">我的评分：</span>
                    <Rate
                        v-model="myjudge"
                        show-text
                        @on-change="submitCourseRatingForm()"
                    >
                        <span style="color: #f5a623">{{ myjudge }}分</span>
                    </Rate>
                    <span
                        v-if="!isJudge"
                        class="judgeNo"
                    >请点击评分</span>
                    <span
                        v-else
                        class="judgeyes"
                    >您已评价，感谢您的评价！</span>
                </div>
            </div>
        </div>
    </div>
    <!-- </div> -->
</template>

<script>
import api from '../../../api/course';

export default {
    components: {},
    props: ['catelogList', 'courseIntro', 'zhjudge'],
    data() {
        return {
            changeInfo: '1',
            myjudge: 0,
            isJudge: false,
            playing: false,
            judgeparam: {
                courseId: null,
                recordId: null,
                stars: 0,
                remark: '',
            },
        };
    },
    mounted() {},
    methods: {
        changeTab(num) {
            console.log(num);
            this.changeInfo = num;
            this.$emit('changeInfo', num);
        },
        submitCourseRatingForm() {
            this.judgeparam.courseId = this.courseIntro.id;
            this.judgeparam.recordId = this.courseIntro.recordId;
            // console.log(this.courseIntro)
            this.judgeparam.stars = this.myjudge;
            api.submitCourseRatingForm(this.judgeparam).then((res) => {
                console.log(res);
                if (res.success) {
                    this.isJudge = true;
                }
            });
        },
        showresource(item) {
            this.$emit('getrecourseId', item);
        },
    },
};
</script>

<style lang="less">
.infoLeft {
    .ivu-rate-star-full:before {
        width: 18px;
        height: 18px;
        content: "";
        background-image: url("../../../assets/images/course/Star@2x(1).png");
        background-size: 18px 18px;
    }
    .ivu-rate-star-zero:before {
        width: 18px;
        height: 18px;
        content: "";
        background-image: url("../../../assets/images/course/Star@2x.png");
        background-size: 18px 18px;
    }
    .ivu-rate-star:before {
        content: "";
    }
    .ivu-rate {
        margin-top: -5px;
    }
    .ivu-rate-text {
        span {
            color: #58586b !important;
        }
        font-size: 17px;

        margin-top: -7px;
    }
}
</style>
