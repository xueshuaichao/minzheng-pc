<template>
    <Carousel
        v-if="bannerList"
        autoplay
        loop
        class="banner"
    >
        <Carousel-item
            v-for="item in bannerList"
            :key="item.id"
            class="bannerItem"
        >
            <div class="demo-carousel">
                <img
                    id="bannerImage"
                    :src="getImageUrl(item)"
                    @click="goLink(item)"
                >
            </div>
        </Carousel-item>
        <!-- <Carousel-item>
            <div class="demo-carousel"><img :src="bannerList[1].banner" /></div>
        </Carousel-item>
        <Carousel-item>
            <div class="demo-carousel"><img :src="bannerList[2].banner" /></div>
        </Carousel-item>
        <Carousel-item>
            <div class="demo-carousel"><img :src="bannerList[3].banner" /></div>
        </Carousel-item> -->
    </Carousel>
</template>
<script>
import api from '../../api/banner';

export default {
    name: 'Banner',
    data() {
        return {
            bannerList: [],
        };
    },
    created() {
        api.findBanner({
            channel: 2,
        })
            .then((res) => {
                console.log('banner', res);
                this.bannerList = res.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    methods: {
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
    // eslint-disable-next-line no-unused-vars
    // render(h) {
    //     return <div class="module-block">banner</div>;
    // },
};
</script>
<style scoped lang="less">
.banner {
    position: relative;
    background: linear-gradient(90deg, #e4e2ed 0%, #bbbdc9 100%);
    text-align: center;
    img {
        width: auto;
        height: 482px;
    }
}
</style>
