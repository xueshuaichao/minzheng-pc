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
                                        :class="
                                            lesson1.menuFlag
                                                ? 'firsttitle'
                                                : 'firstli-p'
                                        "
                                        @click="showresource(lesson1)"
                                    >
                                        <Icon
                                            v-if="
                                                !lesson1.menuFlag &&
                                                    isvedio(lesson1.detailType)
                                            "
                                            type="md-arrow-dropright-circle"
                                        />
                                        <img
                                            v-if="
                                                !lesson1.menuFlag &&
                                                    isPdf(lesson1.detailType)
                                            "
                                            class="pdficon"
                                            src="../../../assets/images/course/ks.png"
                                            alt=""
                                        >
                                        <span class="namestyle">{{
                                            lesson1.title
                                        }}</span>
                                        <span
                                            v-if="islaststudy(lesson1)"
                                            class="lastStudy"
                                        >上次学到</span>
                                        <span class="fr timestyle">
                                            {{
                                                secondsFormat(
                                                    lesson1,
                                                    lesson1.duration
                                                )
                                            }}
                                        </span>
                                    </p>
                                    <div
                                        v-for="lesson2 in lesson1.childrenList"
                                        :key="lesson2.id"
                                        class="secondP"
                                    >
                                        <p
                                            :class="
                                                lesson2.menuFlag
                                                    ? 'secondtitle'
                                                    : 'secondLi-span'
                                            "
                                            @click="showresource(lesson2)"
                                        >
                                            <Icon
                                                v-if="
                                                    !lesson2.menuFlag &&
                                                        isvedio(
                                                            lesson2.detailType
                                                        )
                                                "
                                                type="md-arrow-dropright-circle"
                                            />
                                            <img
                                                v-if="
                                                    !lesson2.menuFlag &&
                                                        isPdf(
                                                            lesson2.detailType
                                                        )
                                                "
                                                class="pdficon"
                                                src="../../../assets/images/course/ks.png"
                                                alt=""
                                            >
                                            <span class="namestyle">{{
                                                lesson2.title
                                            }}</span>
                                            <span
                                                v-if="islaststudy(lesson2)"
                                                class="lastStudy"
                                            >上次学到</span>
                                            <span class="fr timestyle">
                                                {{
                                                    secondsFormat(
                                                        lesson2,
                                                        lesson2.duration
                                                    )
                                                }}
                                            </span>
                                        </p>
                                        <div
                                            v-for="lesson3 in lesson2.childrenList"
                                            :key="lesson3.id"
                                            class="thirdP"
                                        >
                                            <span
                                                :class="
                                                    lesson3.menuFlag
                                                        ? 'thirdtitle'
                                                        : 'thirdSpan'
                                                "
                                                @click="showresource(lesson3)"
                                            ><Icon
                                                 v-if="
                                                     !lesson3.menuFlag &&
                                                         isvedio(
                                                             lesson3.detailType
                                                         )
                                                 "
                                                 type="md-arrow-dropright-circle"
                                             />
                                                <img
                                                    v-if="
                                                        !lesson3.menuFlag &&
                                                            isPdf(
                                                                lesson3.detailType
                                                            )
                                                    "
                                                    class="pdficon"
                                                    src="../../../assets/images/course/ks.png"
                                                    alt=""
                                                >
                                                <span class="namestyle">{{
                                                    lesson3.title
                                                }}</span>
                                                <span
                                                    v-if="islaststudy(lesson3)"
                                                    class="lastStudy"
                                                >上次学到</span>
                                                <span class="fr timestyle">
                                                    {{
                                                        secondsFormat(
                                                            lesson3,
                                                            lesson3.duration
                                                        )
                                                    }}
                                                </span>
                                            </span>
                                            <div
                                                v-for="lesson4 in lesson3.childrenList"
                                                :key="lesson4.id"
                                                class="fourP"
                                            >
                                                <p
                                                    :class="
                                                        lesson4.menuFlag
                                                            ? 'fourtitle'
                                                            : 'fourSpan'
                                                    "
                                                    @click="
                                                        showresource(lesson4)
                                                    "
                                                >
                                                    <Icon
                                                        v-if="
                                                            !lesson4.menuFlag &&
                                                                isvedio(
                                                                    lesson4.detailType
                                                                )
                                                        "
                                                        type="md-arrow-dropright-circle"
                                                    />
                                                    <img
                                                        v-if="
                                                            !lesson4.menuFlag &&
                                                                isPdf(
                                                                    lesson4.detailType
                                                                )
                                                        "
                                                        class="pdficon"
                                                        src="../../../assets/images/course/ks.png"
                                                        alt=""
                                                    >
                                                    <span class="namestyle">{{
                                                        lesson4.title
                                                    }}</span>
                                                    <span
                                                        v-if="
                                                            islaststudy(lesson4)
                                                        "
                                                        class="lastStudy"
                                                    >上次学到</span>
                                                    <span class="fr timestyle">
                                                        {{
                                                            secondsFormat(
                                                                lesson4,
                                                                lesson4.duration
                                                            )
                                                        }}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
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
                        :disabled="noJudge"
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
// import store from '../../../store/index';
/* eslint-disable */
export default {
    components: {},
    props: ["catelogList", "courseIntro", "zhjudge"],
    data() {
        return {
            myjudge: 0,
            changeInfo: "1",
            noJudge: false,
            isJudge: false,
            playing: false,
            lastCourse: {},
            judgeparam: {
                courseId: null,
                recordId: null,
                stars: 0,
                remark: ""
            }
        };
    },
    computed: {},
    mounted() {},
    methods: {
        isvedio(val) {
            if (val === "1" || val === "2") {
                return true;
            }
        },
        isPdf(val) {
            if (val === "3" || val === "4") {
                return true;
            }
        },
        islaststudy(val) {
            if (val.studyProcess) {
                return val.studyProcess.isLastPlay === 1;
            }
        },
        secondsFormat(item, s) {
            if (
                !item.menuFlag &&
                (item.detailType === "1" || item.detailType === "2")
            ) {
                const hour = Math.floor(s / 3600);
                const minute = Math.floor((s - hour * 3600) / 60);
                const second = s - hour * 3600 - minute * 60;
                return `${hour}小时${minute}分${second}秒`;
            }
            if (!item.menuFlag && item.detailType === "3") {
                return "";
            }
        },
        changeTab(num) {
            this.changeInfo = num;
            this.$emit("changeInfo", num);
            if (num === "3" && this.courseIntro.isEvaluate === 1) {
                this.noJudge = true;
                this.isJudge = true;
                this.myjudge = this.courseIntro.stars - 0;
            } else if (num === "3" && !this.courseIntro.recordId) {
                this.noJudge = true;
            }
        },
        submitCourseRatingForm() {
            this.judgeparam.courseId = this.courseIntro.id;
            this.judgeparam.recordId = this.courseIntro.recordId;
            this.judgeparam.stars = this.myjudge;
            api.submitCourseRatingForm(this.judgeparam).then(res => {
                if (res.success) {
                    this.isJudge = true;
                    this.noJudge = true;
                    this.$parent.courseDetail(this.courseIntro);
                    this.changeTab("3");
                }
            });
        },
        showresource(item) {
            if (this.courseIntro.recordId) {
                console.log(item);
                this.$emit("getrecourseId", item);
            } else {
                this.$Message.info("请先报名该课程");
            }
        }
    }
};
</script>

<style lang="less">
.infoLeft {
    .ivu-collapse {
        border: 0px !important;
    }
    .ivu-collapse-simple
        > .ivu-collapse-item.ivu-collapse-item-active
        > .ivu-collapse-header {
        border-bottom: 1px solid #f0f0f2;
        margin-bottom: 20px;
    }
    .ivu-icon {
        vertical-align: middle !important;
    }
    .ivu-icon-md-arrow-dropright-circle:before {
        font-size: 24px;
        color: rgba(0, 0, 0, 0.3);
        // line-height: 40px;
        padding-right: 5px;
    }
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
