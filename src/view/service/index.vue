<template>
    <div class="pxjd m-container">
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
                孵化基地
            </i-breadcrumb-item>
        </i-breadcrumb>
        <div class="px_body clearfix">
            <div class="px_bread">
                <span class="triangle" />
                <p class="cylm_biaoti">
                    基地覆盖地区
                </p>
            </div>
            <div class="px_dt">
                <div
                    ref="myEchart"
                    :style="{ height: '600px', width: '1200px' }"
                />
            </div>
            <div class="mapborder" />
            <div class="px_list">
                <div class="px_bread">
                    <span class="triangle" />
                    <p class="cylm_biaoti">
                        本区所属地区
                    </p>
                </div>
                <ul>
                    <li
                        v-for="(item, index) of shanDongCenter"
                        :key="index"
                        @click="toDetail(item)"
                    >
                        <h5>{{ item.title }}</h5>
                        <span>地址：</span>
                        <p>{{ item.address }}</p>
                        <span>电话：</span>
                        <p>{{ item.telephone }}</p>
                        <span>联系人：</span>
                        <p>hahah</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import echarts from 'echarts';

const qingdaoMap = require('./citys/qingdao');

export default {
    data() {
        return {
            shanDongCenter: [
                {
                    title: '山东青岛莱西学习中心',
                    address: '山东省莱西市黄海9号甲莱西电大',
                    telephone: '0532-88468630；88483413转8000',
                },
                {
                    title: '山东青岛即墨学习中心',
                    address: '山东省即墨市新兴路353号，公交线路:5路、3路',
                    telephone: '0532-88500499',
                },
                {
                    title: '山东青岛城阳学习中心',
                    address:
                        '山东省青岛市城阳区明阳路260号;合作高校:大连理工大学/北京语言大学/福建师范大学.公交路线:306/103/374/373',
                    telephone: '0532-87868946 ',
                },
                {
                    title: '山东青岛学习中心',
                    address:
                        '山东省青岛市市北区大连路16号学习中心（青岛电大旁）',
                    telephone: '0532-82757305',
                },
                {
                    title: '山东青岛李沧学习中心',
                    address: '山东省青岛市李沧区金水路1309号 ',
                    telephone: '0532-87895177',
                },
                {
                    title: '山东青岛黄岛学习中心',
                    address:
                        '山东省青岛市经济技术开发区(黄岛)长江东路399号华阳公寓4楼开发区成教中心',
                    telephone: '0532-86099155',
                },
                {
                    title: '山东青岛胶南学习中心',
                    address: '青岛市军民融合学院',
                    telephone: '0532-86176505；86115801 ',
                },
            ],
            mapData: [
                { name: '莱西市', value: 10 },
                { name: '平度市', value: 20 },
                { name: '即墨区', value: 30 },
                { name: '城阳区', value: 40 },
                { name: '崂山区', value: 50 },
                { name: '胶州市', value: 60 },
                { name: '胶南市', value: 70 },
                { name: '黄岛区', value: 80 },
                { name: '李沧区', value: 90 },
                { name: '市北区', value: 100 },
                { name: '市南区', value: 110 },
                { name: '四方区', value: 120 },
            ],
            geoCoordMap: {
                莱西市: [120.5, 36.87],
                平度市: [119.95, 36.78],
                即墨区: [120.45, 36.38],
                城阳区: [119.95, 36.78],
                崂山区: [120.47, 36.1],
                胶州市: [120.03, 36.27],
                胶南市: [120.03, 35.87],
                黄岛区: [120.18, 35.97],
                李沧区: [120.43, 36.15],
                市北区: [120.38, 36.08],
                市南区: [120.38, 36.07],
                四方区: [120.35, 36.1],
            },
        };
    },
    mounted() {
        this.drawChinaMap();
    },
    methods: {
        toDetail() {
            this.$router.push({
                name: 'serviceDetail',
                params: {},
            });
        },
        convertData(data) {
            const res = [];
            for (let i = 0; i < data.length; i += i) {
                const geoCoord = this.geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value),
                    });
                }
            }
            return res;
        },
        drawChinaMap() {
            echarts.registerMap('qingdaoMap', qingdaoMap);
            const myChart = echarts.init(this.$refs.myEchart);
            // eslint-disable-next-line no-unused-vars
            let option;
            myChart.setOption(
                (option = {
                    tooltip: {
                        trigger: 'item',
                        // formatter: '{b}',
                    },
                    visualMap: {
                        min: 800,
                        max: 50000,
                        text: ['High', 'Low'],
                        realtime: false,
                        calculable: true,
                        show: false,
                        inRange: {
                            color: ['#134FC8', '#2783C3', 'orangered'],
                        },
                    },
                    series: [
                        {
                            name: '青岛',
                            type: 'map',
                            mapType: 'qingdaoMap', // 自定义扩展图表类型
                            label: {
                                show: true,
                                color: '#fff',
                            },
                            zoom: 1.2,
                            itemStyle: {
                                normal: {
                                    borderWidth: 2, // 区域边框宽度
                                    borderColor: '#14A5F1', // 区域边框颜色
                                    areaColor: 'red', // 区域颜色
                                    shadowColor: 'rgba(63, 218, 255, 0.5)', // 阴影
                                },
                                emphasis: { label: { show: true } },
                            },
                            data: this.mapData,
                        },
                    ],
                    dataRange: {
                        x: '-1000 px', // 图例横轴位置
                        y: '-1000 px', // 图例纵轴位置
                        splitList: [
                            {
                                start: 10,
                                end: 10,
                                label: '莱西市',
                                color: '#134FC8',
                            },
                            {
                                start: 20,
                                end: 20,
                                label: '平度市',
                                color: '#134FC8',
                            },
                            {
                                start: 30,
                                end: 30,
                                label: '即墨区',
                                color: '#134FC8',
                            },
                            {
                                start: 40,
                                end: 40,
                                label: '城阳区',
                                color: '#134FC8',
                            },
                            {
                                start: 50,
                                end: 50,
                                label: '崂山区',
                                color: '#134FC8',
                            },
                            {
                                start: 60,
                                end: 60,
                                label: '胶州市',
                                color: '#134FC8',
                            },
                            {
                                start: 70,
                                end: 70,
                                label: '胶南市',
                                color: '#134FC8',
                            },
                            {
                                start: 80,
                                end: 80,
                                label: '黄岛区',
                                color: '#134FC8',
                            },
                            {
                                start: 90,
                                end: 90,
                                label: '李沧区',
                                color: '#069DA7',
                            },
                            {
                                start: 100,
                                end: 100,
                                label: '市北区',
                                color: '#066383',
                            },
                            {
                                start: 110,
                                end: 110,
                                label: '市南区',
                                color: '#073C63',
                            },
                            {
                                start: 120,
                                end: 120,
                                label: '四方区',
                                color: '#fffed8',
                            },
                        ],
                    }, // 各省地图颜色；start：值域开始值；end：值域结束值；label：图例名称；color：自定义颜色值；
                }),
            );
            // 设置鼠标经过固定省份颜色不变
            myChart.on('mouseover', (params) => {
                // console.log(params);
                if (params.data.value !== undefined) {
                    myChart.dispatchAction({
                        type: 'downplay',
                    });
                }
            });
        },
    },
};
</script>

<style scoped lang="less">
@import "../../less/variables.less";
.pxjd {
    width: 114;
    .breadcrumb {
        margin-top: 32px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e7ebf3;
    }
    .clearfix {
        width: 100%;
        overflow: hidden;
    }
    .px_body {
        position: relative;
        width: 1200px;
        margin: 0 auto;
        height: 745px;
        padding: 0px 30px;
        .px_bread {
            margin: 15px 0px;
            .triangle {
                display: inline-block;
                width: 4px;
                height: 20px;
                margin-top: -4px;
                background-color: @mainColor;
                vertical-align: middle;
            }
            .cylm_biaoti {
                padding-left: 10px;
                display: inline-block;
                font-size: 18px;
                color: @mainColor;
                letter-spacing: 0.06px;
                font-weight: 600;
            }
        }
        .mapborder {
            position: absolute;
            width: 740px;
            height: 668px;
            border-radius: 6px;
            border: 1px solid rgba(23, 56, 140, 1);
        }

        .px_dt {
            position: absolute;
            left: -195px;
            top: 85px;
        }
        .px_list {
            position: absolute;
            right: 30px;
            width: 380px;
            height: 668px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 0px 20px 0px rgba(43, 51, 59, 0.08);
            border-radius: 6px;
            padding: 0px 15px;
            overflow-y: scroll;
            ul {
                list-style: none;
            }
            li {
                cursor: pointer;
                h5 {
                    font-size: 18px;
                    color: @textColor1;
                    letter-spacing: 0.06px;
                    text-align: justify;
                    line-height: 19px;
                    margin-bottom: 20px;
                }
                p {
                    font-size: 14px;
                    color: @textColor1;
                    letter-spacing: 0.06px;
                    text-align: justify;
                    line-height: 19px;
                    margin-bottom: 20px;
                }
                span {
                    display: inline-block;
                    font-size: 14px;
                    color: @textColor2;
                    margin-bottom: 10px;
                }
            }
        }
    }
}
</style>
