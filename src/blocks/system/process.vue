<template>
    <div class="home-process-block">
        <div class="content">
            <h4>
                学习流程
            </h4>
            <p class="txt">
                为你提供正确的学习流程指引
            </p>
            <div class="step-wrap">
                <div class="item">
                    <img
                        class="img"
                        src="../../assets/images/index/step-0.png"
                    >
                    <p>
                        登录系统
                    </p>
                </div>
                <div class="item">
                    <img
                        class="next"
                        src="../../assets/images/index/next.png"
                    >
                </div>
                <div class="item">
                    <img
                        class="img"
                        src="../../assets/images/index/step-1.png"
                    >
                    <p>
                        课程学习
                    </p>
                </div>
                <div class="item">
                    <img
                        class="next"
                        src="../../assets/images/index/next.png"
                    >
                </div>
                <div class="item">
                    <img
                        class="img"
                        src="../../assets/images/index/step-2.png"
                    >
                    <p>
                        参加考试
                    </p>
                </div>
                <div class="item">
                    <img
                        class="next"
                        src="../../assets/images/index/next.png"
                    >
                </div>
                <div class="item">
                    <img
                        class="img"
                        src="../../assets/images/index/step-3.png"
                    >
                    <p>
                        成绩查询
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
.home-process-block {
    width: 100%;
    background: #fff;
    padding: 70px 0 108px;
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
            font-size: 16px;
            line-height: 22px;
            margin-bottom: 60px;
            text-align: center;
        }
        .step-wrap {
            display: flex;
            padding: 0 100px;
            .item {
                // width: 102px;
                text-align: center;
                color: #272f55;
                font-size: 23px;
                padding: 0 35px;
                .img {
                    width: 102px;
                    height: 102px;
                    margin-bottom: 14px;
                }
                .next {
                    width: 18px;
                    height: 14px;
                    margin-top: 50px;
                }
            }
        }
    }
}
</style>
