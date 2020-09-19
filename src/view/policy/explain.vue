<template>
    <div class="policy-explain-page m-container">
        <i-breadcrumb
            class="breadcrumb g-breadcrumb"
            separator=">"
        >
            <i-breadcrumb-item to="/">
                首页
            </i-breadcrumb-item>
            <i-breadcrumb-item>
                政策解读
            </i-breadcrumb-item>
        </i-breadcrumb>
        <div class="main">
            <div
                v-if="total > 10"
                class="pagebtn"
            >
                <p @click="policyPageUp">
                    <Icon type="ios-arrow-up" />
                </p>
                <p @click="policyPageDown">
                    <Icon type="ios-arrow-down" />
                </p>
            </div>
            <div class="left">
                <ul class="resource-types ulstyle">
                    <li
                        v-for="category1 in categories"
                        :key="category1.id"
                        class="categraybtn"
                        :class="{ selected: category1.id == selectedCategory }"
                        @click="setSelectedCategory(category1.id)"
                    >
                        {{ category1.name }}
                    </li>
                </ul>
                <i-button
                    class="moreCategory"
                    @click="getmoreCategory"
                >
                    {{ moreText }}
                </i-button>
                <ul
                    v-if="showmore"
                    class="resource-types-more"
                >
                    <li
                        v-for="item in categoriesMore"
                        :key="item.id"
                    >
                        <span
                            class="categraybtn"
                            :class="{ selected: item.id == selectedCategory }"
                            @click="setSelectedCategory(item.id)"
                        >{{ item.name }}</span>
                    </li>
                </ul>
                <ul class="resource-list">
                    <li
                        v-for="item in list"
                        :key="item.id"
                        :class="{ active: playingResource.id == item.id }"
                        @click="setPlayingResource(item, 'list')"
                    >
                        <span
                            class="point"
                            :class="{
                                pointactive: playingResource.id == item.id
                            }"
                        />
                        {{ item.title }}
                    </li>
                </ul>
            </div>
            <div class="right">
                <div class="title">
                    {{ playingResource.title }}
                </div>
                <div class="v-player">
                    <div
                        id="player-con"
                        style="height:358px"
                    />
                    <!-- <div
                        id="player-con"
                        class="prism-player"
                    /> -->
                </div>
                <div class="relate-resource-list">
                    <h3>相关推荐</h3>
                    <a
                        v-if="relatedResources.length > 3"
                        class="prev"
                        @click="prev"
                    />
                    <a
                        v-if="relatedResources.length > 3"
                        class="next"
                        @click="next"
                    />
                    <ul>
                        <li
                            v-for="resource in relatedResources1"
                            :key="resource.id"
                            class="related-resouce"
                            @click="setPlayingResource(resource, 'related')"
                        >
                            <img
                                :src="resource.coverUrl"
                                class="cover"
                            >
                            <p class="title">
                                {{ resource.name }}
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../../api/policy';
// import store from '../../store/index';

export default {
    data() {
        return {
            relatedResources1: [],
            showmore: false,
            category: 'category',
            categoryParam: {
                name: '',
                level: null,
            },
            categories: [],
            categoriesMore: [],
            list: [],
            listParam: {
                title: '',
                policyCategoryId: '',
                pageNum: 1,
                pageSize: 10,
            },
            showAllCategory: false,
            selectedCategory: '1',
            playingResource: {
                id: null,
                title: '',
                url: null,
            },
            relatedResources: [],
            resourseIndex: 0,
            nextIndex: null,
            prevIndex: null,
            total: 0,
            player: null,
            getmediaid: '',
            // loopList: [],
            nextmediaid: [],
            moreText: '更多',
        };
    },
    mounted() {
        this.getFindCategory();
        this.getaliPlay();
    },
    created() {},
    methods: {
        // 创建播放器
        getaliPlay(url) {
            $('#player-con').height('358px');
            if ($('#J_prismPlayer').length > 0) {
                this.player.dispose();
                $('#J_prismPlayer').remove();
            }
            const boarddiv = '<div id="J_prismPlayer"></div>';
            $('#player-con').append(boarddiv);
            $('#J_prismPlayer').height('100%');
            // eslint-disable-next-line no-undef
            this.player = new Aliplayer({
                id: 'J_prismPlayer',
                source: url,
                width: '100%',
                height: '500px',
                cover: '',
                /* To set an album art, you must set 'autoplay' and 'preload' to 'false' */
                autoplay: true,
                preload: false,
                isLive: false,
            });
            this.player.on('ended', () => {
                // console.log('播完了');
                this.getNextmediaId();
                const next = this.getNextmediaId();
                // console.log(next);
                this.setPlayingResource(next, 'list');
            });
            // console.log(player);
        },
        // 获取列表
        getList() {
            return api.findByCondition(this.listParam).then((res) => {
                const { data } = res;
                if (res.success) {
                    this.list = data;
                    if (this.list) {
                        this.total = this.list.length;
                        this.playingResource.id = data[0].id;
                        this.playingResource.title = data[0].title;
                        this.setPlayingResource(this.list[0], 'list');
                    }
                    // for (let i = 0; i < this.list.length; i += 1) {
                    //     this.loopList.push(this.list[i].resource);
                    // }
                    // console.log(this.loopList);
                }
            });
        },
        getNextmediaId() {
            for (let arr = 0; arr < this.list.length; arr += 1) {
                if (
                    this.playingResource.id === this.list[arr].id
                    && arr < this.list.length - 1
                ) {
                    // console.log(this.list[arr + 1]);
                    // if (arr < this.list.length - 1) {
                    // console.log(this.list[arr + 1]);
                    this.nextmediaid = this.list[arr + 1];
                    // this.setPlayingResource(this.nextmediaid, 'list');
                    // }
                }
            }
            return this.nextmediaid;
        },
        // 获取相关推荐
        getRelatedResources() {
            return api.findResourcesByCondition(1).then((res) => {
                const { data } = res;
                if (res.success) {
                    this.relatedResources = data;
                    this.relatedResources1 = this.relatedResources.slice(0, 3);
                }
            });
        },
        // 上一页
        policyPageUp() {
            if (this.listParam.pageNum > 1) {
                this.listParam.pageNum = this.listParam.pageNum - 1;
                console.log(this.listParam);
                console.log(this.listParam.pageNum);
                // this.getList();
            }
        },
        // 下一页
        policyPageDown() {
            this.listParam.pageNum = 1 + this.listParam.pageNum;
            console.log(this.listParam);
            console.log(this.listParam.pageNum);
        },
        getmoreCategory() {
            this.showmore = !this.showmore;
            if (this.showmore) {
                this.moreText = '收起';
            } else {
                this.moreText = '更多';
            }
            this.selectedCategory = '';
        },
        // 获取分类
        getFindCategory() {
            return api
                .findCategoryByCondition({
                    name: this.categoryParam.name,
                    level: this.categoryParam.level,
                })
                .then((res) => {
                    const { data } = res;
                    if (res.success) {
                        this.categories = data.slice(0, 4);
                        this.categoriesMore = data.slice(4);
                        this.setSelectedCategory(this.categories[0].id);
                    }
                });
        },
        setPlayingResource(item, type) {
            // const token = 'f3e171a4e06f492d93cb328bbeec2dd1';
            // store.commit('setToken', token);
            localStorage.setItem('token', 'f3e171a4e06f492d93cb328bbeec2dd1');
            if (type === 'list' || type === 'auto') {
                this.getmediaid = item.resource.mediaId;
                this.playingResource.title = item.title;
            } else if (type === 'related') {
                // console.log(item);
                this.getmediaid = item.mediaId;
                this.playingResource.title = item.name;
            }
            this.playingResource.id = item.id;
            return api.getVideoPlayURL(this.getmediaid).then((res) => {
                const { data } = res;
                if (res.success) {
                    [this.playingResource.url] = data;
                    if (type === 'list' || type === 'related') {
                        this.getaliPlay(this.playingResource.url);
                    }
                    this.player.loadByUrl(this.playingResource.url);
                }
            });
        },
        // 点击分类
        setSelectedCategory(id) {
            this.selectedCategory = id;
            this.listParam.policyCategoryId = id;
            this.getList();
            this.getRelatedResources(this.listParam.policyCategoryId);
        },
        prev() {
            if (this.nextIndex > this.relatedResources.length) {
                this.nextIndex = this.nextIndex - 1;
            }
            this.resourseIndex = this.resourseIndex - 1;
            this.nextIndex = this.nextIndex - 1;
            if (this.resourseIndex >= 0) {
                this.relatedResources1 = this.relatedResources.slice(
                    this.resourseIndex,
                    this.nextIndex,
                );
            }
        },
        next() {
            this.resourseIndex = this.resourseIndex < 0 ? 0 : this.resourseIndex;
            this.nextIndex = this.nextIndex < 3 ? 3 : this.resourseIndex;
            this.nextIndex = this.resourseIndex + 4;
            if (this.nextIndex <= this.relatedResources.length) {
                // eslint-disable-next-line no-plusplus
                this.resourseIndex++;
                this.relatedResources1 = this.relatedResources.slice(
                    this.resourseIndex,
                    this.nextIndex,
                );
            }
        },
    },
};
</script>
<style>
#J_prismPlayer .prism-controlbar {
    bottom: 20px !important;
}
</style>
<style lang="less" scoped>
@import "../../less/variables.less";
.main {
    position: relative;
    .pagebtn {
        position: absolute;
        left: 435px;
        bottom: 24px;
        z-index: 999;
        p {
            width: 32px;
            height: 32px;
            border-radius: 16px;
            background-color: @mainColor;
            text-align: center;
            cursor: pointer;
        }
    }
}
.left {
    position: relative;
    float: left;
    width: 456px;
    margin-left: 30px;
}
.categraybtn {
    display: inline-block;
    width: 80px;
    height: 26px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 26px;
    padding: 0 10px;
    margin-right: 10px;
    color: @textColor1;
    cursor: pointer;
    &.selected {
        background: @mainColor;
        border-radius: 6px;
        color: #fff;
    }
}
.ulstyle {
    padding: 14px 0;
    list-style: none;
    border-bottom: 1px solid #f8f8f8;
}
.resource-types-more {
    list-style: none;
    border-bottom: 1px solid #f8f8f8;
    li {
        display: inline-block;
        padding: 19px 0px 14px 0px;
        border-bottom: 1px solid #f8f8f8;
        &:nth-child(5n) {
            margin-right: 0px;
        }
    }
}
.moreCategory {
    position: absolute;
    right: 35px;
    top: 14px;
    width: 52px;
    height: 26px;
    border: 1px solid rgba(23, 56, 140, 1);
    color: @mainColor;
    padding: 0px 10px;
    border-radius: 6px;
}
.resource-list {
    margin-top: 16px;
    color: @textColor2;
    list-style: none;
    // height: 580px;
    li {
        line-height: 38px;
        cursor: pointer;
        .point {
            vertical-align: middle;
            display: inline-block;
            width: 3px;
            border-radius: 1px;
            height: 3px;
            background: @textColor2;
            margin-left: 10px;
        }
        .pointactive {
            color: @mainColor;
        }
    }
    .active {
        background: #f2f6fc;
        color: @mainColor;
        font-weight: 600;
    }
}

.right {
    margin: 14px 30px 14px 484px;
    background: #f2f6fc;
    padding: 24px 20px;

    .title {
        // height: 40px;
        font-size: 20px;
        line-height: 1;
        color: @textColor1;
    }

    .v-player {
        height: 358px;
        margin: 16px 0 24px;
        background: #ddd;
    }

    h3 {
        margin-bottom: 16px;

        font-size: 16px;
        color: @textColor1;
    }
}
.relate-resource-list {
    position: relative;
    cursor: pointer;
    ul {
        padding: 0 40px;
    }
    ul,
    li {
        list-style: none;
    }
    li {
        margin-right: 22px;
        width: 174px;
        display: inline-block;
        &:nth-child(3n) {
            margin-right: 0px;
        }
    }
    .prev,
    .next {
        position: absolute;
        top: 85px;
        width: 24px;
        height: 24px;
        background: url(../../assets/images/policy/icon_prev@2x.png) 0 0
            no-repeat;
        background-size: cover;
    }
    .prev {
        left: 0;
    }
    .next {
        right: 0;
        background-image: url(../../assets/images/policy/icon_next@2x.png);
    }
    .cover {
        width: 100%;
        height: 104px;
        border-radius: 6px;
    }
    .title {
        font-weight: bold;
        line-height: 20px;
        color: @textColor1;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-wrap: break-word;
    }
}
</style>
<style lang="less">
@import "../../less/variables.less";
.pagebtn {
    p {
        &:first-child {
            padding-top: 3px;
            margin-bottom: 24px;
        }
        &:last-child {
            padding-top: 6px;
        }
        .ivu-icon {
            font-size: 24px;
            color: @white;
        }
    }
}
</style>
