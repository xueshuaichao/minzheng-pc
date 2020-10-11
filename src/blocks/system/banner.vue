<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div
                v-for="(item, index) in bannerList"
                :key="index"
                class="swiper-slide"
            >
                <img
                    :src="getImageUrl(item)"
                    @click="goLink(item)"
                >
            </div>
        </div>
        <div class="swiper-pagination" />
    </div>
</template>
<script>
import Swiper from 'swiper';

import 'swiper/dist/css/swiper.min.css';

import api from '../../api/banner';

export default {
    data() {
        return {
            value1: 0,
            bannerList: [],
        };
    },

    mounted() {
        // this.initSwiper()
        api.findBanner({
            channel: 2,
        })
            .then((res) => {
                console.log('banner', res);
                this.bannerList = res.data;
                this.initSwiper();
            })
            .catch((error) => {
                console.log(error);
            });
    },
    methods: {
        initSwiper() {
            const swiper = new Swiper('.swiper-container', {
                effect: 'coverflow',
                centeredSlides: true,
                slidesPerView: 'auto',
                loopedSlides: this.bannerList.length,
                loop: true,
                spaceBetween: '18%',
                autoplay: {
                    delay: 6000,
                    disableOnInteraction: false,
                },
                coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    depth: 300,
                    modifier: 1,
                    slideShadows: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    // clickable: true,
                },
                observer: true,
                observerParents: true,
            });
            console.log(swiper);
        },
        getImageUrl(item) {
            if (item.banner && item.banner.startsWith('http')) {
                return item.banner;
            }
            return 'https://soldier-prod.oss-cn-beijing.aliyuncs.com/saas/image/0fa4e1ee5966edc6b903752e0ffca454.jpg';
        },
        goLink(item) {
            // 1、不跳转；2、课程；3、任务；4、外链
            const type = item.jumpType;
            const id = item.quoteId;
            const { outLink } = item;
            api.reportClick({
                id,
            });
            if (type === 2) {
                this.$router.push({
                    path: '/course/detail',
                    query: {
                        id,
                    },
                });
            } else if (type === 3) {
                this.$router.push({
                    path: '/trainingDetail',
                    query: {
                        id,
                    },
                });
            } else if (type === 4) {
                window.open(outLink);
            }
        },
    },
};
</script>
<style lang="less">
.swiper-container img {
    width: 90%;
    height: 482px;
}
.swiper-wrapper {
    width: 90% !important;
    margin: 0 5%;
}
.swiper-slide-prev {
    right: -8%;
}
.swiper-slide-next {
    left: -8%;
}
.swiper-container {
    --swiper-theme-color: #ff6600;
    --swiper-pagination-color: #ff6600;
}
</style>
