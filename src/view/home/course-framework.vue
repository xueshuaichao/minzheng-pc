<template>
    <div class="course-description m-container">
        <i-breadcrumb
            class="breadcrumb"
            separator=">"
        >
            <i-breadcrumb-item to="/">
                首页
            </i-breadcrumb-item>
            <i-breadcrumb-item>课程体系</i-breadcrumb-item>
        </i-breadcrumb>
        <div class="buttons">
            <a href="#s1">课程背景介绍</a>
            <a href="#s2">课程体系</a>
            <a href="#s3">课程分类</a>
            <a href="#s4">名师介绍</a>
        </div>
        <div
            id="s1"
            class="section"
        >
            <h5 class="section-title">
                课程背景介绍
            </h5>
            <p class="content">
                {{ courseDetail.courseBgIntro }}
            </p>
        </div>
        <div
            id="s2"
            class="section"
        >
            <h5 class="section-title">
                课程体系
            </h5>
            <div class="superiority">
                <div class="headline">
                    <img
                        src="../../assets/images/home/line-right.png"
                        alt=""
                    >
                    <span>五大优势</span>
                    <img
                        src="../../assets/images/home/line-left.png"
                        alt=""
                    >
                </div>
                <ul>
                    <li
                        v-for="item in superiorityList"
                        :key="item.id"
                    >
                        <img :src="item.img">
                        <p>{{ item.text }}</p>
                    </li>
                </ul>
            </div>
            <div class="modality">
                <div class="headline">
                    <img
                        src="../../assets/images/home/line-right.png"
                        alt=""
                    >
                    <span>课程形式</span>
                    <img
                        src="../../assets/images/home/line-left.png"
                        alt=""
                    >
                </div>
                <ul>
                    <li>
                        <img src="../../assets/images/home/video-img.png">
                        <img
                            class="tag"
                            src="../../assets/images/home/videotag.png"
                        >
                    </li>
                    <li>
                        <img
                            src="../../assets/images/home/cartoontag-img.png"
                        >
                        <img
                            class="tag"
                            src="../../assets/images/home/cartoontag.png"
                        >
                    </li>
                </ul>
            </div>
        </div>
        <div
            id="s3"
            class="section category"
        >
            <h5 class="section-title">
                课程分类
            </h5>
            <div class="headline">
                <img
                    src="../../assets/images/home/line-right.png"
                    alt=""
                >
                <span>课程体系（分类）目前共690门课程，3514个视频</span>
                <img
                    src="../../assets/images/home/line-left.png"
                    alt=""
                >
            </div>
            <div class="step1 step">
                <h1>适应性课程类型</h1>
                <ul>
                    <li
                        v-for="(item, index1) in step1"
                        :key="index1"
                    >
                        {{ item }}
                    </li>
                </ul>
            </div>
            <div class="step2 step">
                <h1>职业技能课程类型</h1>
                <ul style="margin-left: 68px;">
                    <li
                        v-for="(item, index21) in step21"
                        :key="index21"
                    >
                        {{ item }}
                    </li>
                </ul>
                <ul>
                    <li
                        v-for="(item, index22) in step22"
                        :key="index22"
                    >
                        {{ item }}
                    </li>
                </ul>
            </div>
            <div class="step3 step">
                <h1>创业课程类型</h1>
                <ul>
                    <li
                        v-for="(item, index3) in step3"
                        :key="index3"
                    >
                        {{ item }}
                    </li>
                </ul>
            </div>
        </div>
        <div
            id="s4"
            class="section"
        >
            <h5 class="section-title">
                名师介绍
            </h5>
            <ul class="teacher-list">
                <li
                    v-for="teacher in teacherList"
                    :key="teacher.id"
                >
                    <div class="img-wrap">
                        <img :src="teacher.pic">
                        <div class="name">
                            {{ teacher.name }}
                        </div>
                    </div>
                    <div class="intro">
                        <!--  eslint-disable vue/no-v-html  -->
                        <p v-html="teacher.jobExperience">
                            {{ teacher.jobExperience }}
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
// import api from '../../api/home';

export default {
    data() {
        return {
            courseDetail: {
                courseBgIntro:
                    '党的十八大以来，以习近平同志为核心的党中央高度重视退役军人工作，并多次作出重要指示；党的十九大提出组建退役军人管理保障机构，维护军人军属合法权益，让军人成为全社会尊崇的职业！为了帮助退役军人尽早适应社会，特制定本套适应性培训课程体系。',
            },
            teacherList: [
                {
                    id: 1,
                    pic: require('../../assets/images/home/teacher1.png'),
                    name: '邹波 管理学博士',
                    jobExperience:
                        '· 曾任全国双拥工作领导小组办公室政策研究处 处长 <br>· 曾任民政部优抚安置局退役士兵安置处 处长 <br> · 民政部政策研究中心 副主任<br>· 17年退役军人事务从业经历<br>专著：1.《退役了怎么办》<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.《优抚对象生存状况调查》<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.《美国退役军人事务管理》',
                },
                {
                    id: 2,
                    pic: require('../../assets/images/home/teacher2.png'),
                    name: '冯俏彬 经济学博士',
                    jobExperience:
                        '· 中央党校（国家行政学院）教授，博士生导师<br>· 第三届黄达—蒙代尔经济学奖获得者<br>专著：1.《国家治理与财税改革》<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.《私人产权与公共财政》<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.《应急财政：基于自然灾害的资金保障体系研究》<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.《应急管理与公共财政》',
                },
                {
                    id: 3,
                    pic: require('../../assets/images/home/teacher3.png'),
                    name: '赵守香 教授',
                    jobExperience:
                        '· 北京工商大学计算机与信息工程学院 教授<br>· 曾在芬兰依利维斯卡工学院进修国际商务，牛津大学 赫特福德学院 培训交流<br>专著：1.网络经济学<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.电子商务案例分析<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.网络营销与实务',
                },
                {
                    id: 4,
                    pic: require('../../assets/images/home/teacher4.png'),
                    name: '韩敏 执业律师 ',
                    jobExperience:
                        '· 8 年国家顶尖律所工作经验<br>· 1 年金融企业法务工作经验<br>· 在诉讼方面具有较强的实战经验，具备独立办理各类疑难复杂诉讼及非诉案件的能力。',
                },
                {
                    id: 5,
                    pic: require('../../assets/images/home/teacher5.png'),
                    name: '王好博 研究员',
                    jobExperience:
                        '· 空军航空医学研究所  研究员<br>· 国家二级心理咨询师<br>· 常年参与空军招飞心理选拔，是空军授予的“空军招飞心理选拔专家”； 2018年参与第三批航天员选拔。在军队从事心理服务保障工作；为执行高原、海岛、长航时、演习等特殊任务的部队进行心理授课。',
                },
                {
                    id: 6,
                    pic: require('../../assets/images/home/teacher6.png'),
                    name: '宋绍义 博士',
                    jobExperience:
                        '· 北京邮电大学  博士<br>· 北京工商大学  教师<br>· 主要研究方向为职业规划、互联网商业模式、创业教育、移动互联网创业、博弈论及安全治理。',
                },
                {
                    id: 7,
                    pic: require('../../assets/images/home/teacher7.png'),
                    name: '赵世东 人力资源实战教练',
                    jobExperience:
                        '· 管理咨询师<br>· 人力资源科班出身，先后在央企、外资500强、民营等知名企业从事人力资源工作15年，目前集企业HR、自由讲师、咨询顾问于一身。在招聘创新、激励设计、绩效管理、战略人力资源、人才管理等方面经验丰富。',
                },
                {
                    id: 8,
                    pic: require('../../assets/images/home/teacher8.png'),
                    name: '张峰 CEO',
                    jobExperience:
                        '· 曾在解放军陆海空三军仪仗队服役５年，2011年退役<br>· 原酒仙网创业团队成员<br>· 红峰科技CEO',
                },
            ],
            courseCategory: [],
            superiorityList: [
                {
                    id: 1,
                    img: require('../../assets/images/home/superiority1.png'),
                    text: '完善的配套课程',
                },
                {
                    id: 2,
                    img: require('../../assets/images/home/superiority2.png'),
                    text: '贴合退役军人的课程内容',
                },
                {
                    id: 3,
                    img: require('../../assets/images/home/superiority3.png'),
                    text: '丰富的课程资源',
                },
                {
                    id: 4,
                    img: require('../../assets/images/home/superiority4.png'),
                    text: '权威的师资',
                },
                {
                    id: 5,
                    img: require('../../assets/images/home/superiority5.png'),
                    text: '学习形式多样',
                },
            ],
            step1: [
                '退役军人政策问答',
                '经济形势分析',
                '退役军人就业前的准备',
                '退役军人如何找工作',
                '退役军人就业创业相关法律知识',
                '退役军人如何经商办企业',
                '退役军人社交礼仪',
                '退役后的心理调适',
            ],
            step21: [
                '技能认证课程',
                '中医养生课程',
                '网络营销课程',
                '汽车维修课程',
                '大数据课程',
                '人力资源课程',
            ],
            step22: [
                '人工智能课程',
                '铁路课程',
                '财务会计课程',
                '烹饪厨艺课程',
                '电子商务课程',
                '软件编程课程',
            ],
            step3: [
                '创业经验课程',
                '企业战略课程',
                '网络营销课程',
                '团队建设课程',
                '创新思维课程',
                '投资融资课程',
                '企业管理课程',
            ],
        };
    },
    created() {
        // this.findAll();
    },
    methods: {
        // findAll() {
        //     return api.findAll().then((data) => {
        //         const index = 0;
        //         this.courseDetail = data.data[index];
        //         this.teacherList = JSON.parse(data.data[index].teacherIntro);
        //         this.courseCategory = JSON.parse(
        //             data.data[index].courseCategory,
        //         );
        //     });
        // },
    },
};
</script>

<style lang="less">
@import "../../less/variables.less";
.breadcrumb {
    margin-top: 32px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e7ebf3;
}
.buttons {
    margin: 27px 0 57px;
    text-align: center;
}
.buttons a {
    display: inline-block;
    margin-right: 16px;
    width: 204px;
    height: 38px;
    line-height: 38px;
    color: #fff;
    text-align: center;
    background: url(../../assets/images/home/course-bg2@2x.png) 0 0 no-repeat;
    background-size: 100%;
    &:first-child {
        background-image: url(../../assets/images/home/course-bg1@2x.png);
    }
}
.headline {
    text-align: center;
    img {
        width: 74px;
        vertical-align: middle;
    }
    span {
        font-size: 16px;
        font-weight: 500;
        color: @mainColor;
        line-height: 22px;
        padding: 0 32px;
    }
}
.superiority {
    margin-bottom: 87px;
    ul {
        overflow: hidden;
        margin-top: 46px;
        padding: 0 60px;
    }
    ul li {
        float: left;
        text-align: center;
        padding: 0 46px;
        img {
            width: 110px;
        }
        p {
            font-size: 16px;
            font-weight: 500;
            color: @blue;
            line-height: 22px;
        }
    }
}
.modality {
    ul {
        text-align: center;
        margin-top: 30px;
    }
    ul li {
        display: inline-block;
        margin-left: 40px;
        img {
            width: 396px;
            display: block;
            margin: 0 auto;
        }
        .tag {
            width: 210px;
            margin-top: 40px;
        }
    }
}
.section {
    margin-bottom: 26px;
}
.category {
    .step {
        width: 330px;
        height: 340px;
        background-size: 100% 100%;
        font-size: 20px;
        font-weight: 400;
        color: @mainColor;
        line-height: 30px;
        display: inline-block;
        vertical-align: middle;
        margin-left: 30px;
        margin-top: 20px;
        h1 {
            font-size: 20px;
            font-weight: 600;
            color: @mainColor;
            line-height: 28px;
            text-align: center;
            margin-top: 6px;
        }
        ul {
            display: inline-block;
            margin-left: 24px;
            margin-top: 24px;
        }
    }
    .step1 {
        background-image: url(../../assets/images/home/classify-bg1.png);
    }
    .step2 {
        background-image: url(../../assets/images/home/classify-bg2.png);
        width: 403px;
    }
    .step3 {
        background-image: url(../../assets/images/home/classify-bg3.png);
        ul {
            text-align: center;
            display: block;
        }
    }
}
.category-list {
    width: 364px;
    height: 219px;
    background: #f1f3fa;
    float: left;
    margin-right: 23px;
    border-radius: 6px;
    &:nth-child(3n) {
        margin-right: 0;
    }
}
.section-title {
    padding-left: 10px;
    border-left: 4px solid @mainColor;
    color: @mainColor;
    font-size: 18px;
    line-height: 21px;
    margin-bottom: 16px;
}
.section .content {
    color: @textColor2;
    font-size: 16px;
    text-indent: 2em;
}
.teacher-list {
    // display: flex;
    justify-content: space-between;
    overflow: hidden;
    li {
        list-style: none;
        width: 267px;
        float: left;
        margin-bottom: 26px;
        margin-right: 25px;
        &:nth-child(4n) {
            margin-right: 0;
        }
    }
    .img-wrap {
        position: relative;
        width: 100%;
        height: 323px;
        background: #f1f3fa;
        border-radius: 6px 6px 6px 20px;
    }
    img {
        width: 100%;
        height: 100%;
    }
    .name {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 38px;
        line-height: 38px;
        background: url(../../assets/images/home/teacher-bg.png) no-repeat;
        background-size: 100% 100%;
        text-align: center;
        color: #fff;
        border-radius: 6px 20px 6px 20px;
    }
    .intro {
        margin-top: 12px;
        width: 100%;
        height: 179px;
        font-size: 12px;
        line-height: 20px;
        background: #f1f3fa;
        color: @textColor2;
        padding: 11px 10px 0;
        border-radius: 20px 6px 6px;
    }
}
</style>
