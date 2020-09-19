<template>
    <div class="service-detail m-container">
        <i-breadcrumb
            class="g-breadcrumb"
            separator=">"
        >
            <i-breadcrumb-item to="/">
                首页
            </i-breadcrumb-item>
            <i-breadcrumb-item>
                创业服务
            </i-breadcrumb-item>
            <i-breadcrumb-item>
                基地详情
            </i-breadcrumb-item>
        </i-breadcrumb>
        <div class="detail-info">
            <div class="info-top">
                <div class="top-left">
                    <img
                        src=""
                        alt=""
                    >
                </div>
                <div class="top-right">
                    <h3>
                        青岛市黄岛开发区无中生有暗度陈仓凭空想
                        象凭空捏造无言无语无可救药逝者安息一...
                    </h3>
                    <p>地址：青岛黄岛开发区中坤路紫露苑小区北门五十米初</p>
                    <p>电话：122-3344-5566</p>
                    <p>联系人：找萨德</p>
                </div>
            </div>
            <div class="info-bottom">
                <h4>基地简介</h4>
                <p>
                    先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍卫之臣不懈于内，忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝
                    遗德，恢弘志士之气，不宜妄自菲薄，引喻失义，以塞忠谏之路也。
                    宫中府中，俱为一体，陟罚臧否，不宜异同。若有作奸犯科及为忠善者，宜付有司论其刑赏，以昭陛下平明之理，不宜偏私，使内外异法也。
                    侍中、侍郎郭攸之、费祎、董允等，此皆良实，志虑忠纯，是以先帝简拔以遗陛下。愚以为宫中之事，事无大小，悉以咨之，然后施行，必能裨补阙漏，有所广益。
                    将军向宠，性行淑均，晓畅军事，试用于昔日，先帝称之曰能，是以众议举宠为督。愚以为营中之事，悉以咨之，必能使行阵和睦，优劣得所。
                    亲贤臣，远小人，此先汉所以兴隆也；亲小人，远贤臣，此后汉所以倾颓也。先帝在时，每与臣论此事，未尝不叹息痛恨于桓、灵也。侍中、尚书、长史、参军，此悉贞良死节之臣，
                    愿陛下亲之信之，则汉室之隆，可计日而待也。
                    臣本布衣，躬耕于南阳，苟全性命于乱世，不求闻达于诸侯。先帝不以臣卑鄙，猥自枉屈，三顾臣于草庐之中，咨臣以当世之事，由是感激，遂许先帝以驱驰。后值倾覆，受任于败军之
                    际，奉命于危难之间，尔来二十有一年矣。
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    created() {},
    methods: {},
};
</script>

<style lang="less" scoped>
@import "../../less/variables.less";
.service-detail {
    .detail-info {
        padding: 15px 30px;
        .info-top {
            box-shadow: 0px 0px 20px 0px rgba(43, 51, 59, 0.08);
            border-radius: 6px;
            .top-left {
                display: inline-block;
                img {
                    display: inline-block;
                    width: 640px;
                    height: 360px;
                    background: rgba(43, 51, 59, 1);
                    border-radius: 6px 0px 0px 6px;
                }
            }
            .top-right {
                vertical-align: top;
                display: inline-block;
                width: 500px;
                height: 360px;
                padding: 24px 20px;
                h3 {
                    font-size: 24px;
                    color: @textColor1;
                    line-height: 36px;
                    font-weight: 600;
                    margin-bottom: 24px;
                }
                p {
                    font-size: 16px;
                    color: @textColor2;
                    margin-bottom: 14px;
                }
            }
        }
        .info-bottom {
            padding-top: 15px;
            h4 {
                font-size: 18px;
                color: @textColor1;
                font-weight: 600;
                padding-bottom: 14px;
            }
            p {
                font-size: 14px;
                color: @textColor1;
                line-height: 30px;
                font-family: PingFangSC-Regular, PingFang SC;
            }
        }
    }
}
</style>
