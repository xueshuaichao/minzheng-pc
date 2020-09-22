<template>
    <div class="module-block module-block-course-player">
        <div class="main">
            <div class="left">
                <h2>{{ course.title }}</h2>
                <div class="catalog">
                    <Tree
                        :data="catalog"
                        children-key="lessonList"
                        @on-select-change="play"
                    />
                </div>
            </div>
            <div class="cover">
                <div
                    id="J_player"
                    ref="player"
                    class="player"
                />
            </div>
        </div>
    </div>
</template>

<script>
import api from '../../api/course';

export default {
    props: {
        routerParams: {
            type: Object,
            required: true,
        },
        setting: {
            type: [Object, Array],
            required: true,
        },
    },
    data() {
        return {
            course: {},
            playingChapter: null,
            catalog: [],
            videoSrc: '',
        };
    },
    watch: {
        playingChapter(val) {
            if (val == null) {
                this.videoSrc = '';
            } else {
                this.getResource(val.resourceId);
            }
        },
    },
    created() {
        this.getCatalog(this.routerParams.courseId);
        this.$watch('routeParams.courseId', (val) => {
            this.getCatalog(val);
        });
    },
    mounted() {
        this.isMouted = true;
    },
    methods: {
        getCatalog(courseId) {
            return api.getCourseCatalog(courseId).then(({ data }) => {
                data.forEach((item) => {
                    // eslint-disable-next-line no-param-reassign
                    item.expand = true;
                });
                this.catalog = data;
                // eslint-disable-next-line prefer-destructuring
                this.playingChapter = data.length
                    ? data[0].lessonList[0]
                    : null;
                console.log(this.playingChapter, data);
            });
        },
        getResource() {
            return api
                .getResource(this.playingChapter.resourceId)
                .then(({ data }) => {
                    // eslint-disable-next-line prefer-destructuring
                    this.videoSrc = data.videoUrlList[0];
                    this.playByUrl();
                });
        },
        play([chapter]) {
            console.log(chapter.resourceId);
            if (this.playingChapter !== chapter && !chapter.lessonList) {
                this.playingChapter = chapter;
            }
            console.log(this.playingChapter.resourceId);
        },
        playByUrl() {
            console.log(this.isMouted, this.videoSrc);
            if (!this.player) {
                // eslint-disable-next-line no-undef
                this.player = new Aliplayer(
                    {
                        id: 'J_player',
                        source: this.videoSrc,
                        width: '100%',
                        height: '100%',
                        autoplay: true,
                        isLive: false,
                        rePlay: false,
                        playsinline: true,
                        preload: true,
                        controlBarVisibility: 'hover',
                        useH5Prism: true,
                        language: 'zh-cn',
                    },
                    () => {
                        console.log('playerinit', this);
                    },
                );
            } else {
                this.player.loadByUrl(this.videoSrc);
            }
        },
    },
};
</script>

<style lang="less" scoped>
.main {
    display: flex;
    .left {
        width: 290px;
    }
    .cover {
        position: relative;
        flex: 1;
        padding-top: 56.25%;
        background: #f4f4f4;
    }
    .player {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
}
</style>
