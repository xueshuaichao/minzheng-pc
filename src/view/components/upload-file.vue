<template>
    <div class="upload-img-wrapper flex-row">
        <template v-if="img">
            <div
                class="upload-btn upload-btn1 mar-r-20"
                @click="handleClick"
            />
            <div class="preview-img upload-btn">
                <!-- <img
                    src="../../assets/images/learning/pic.png"
                    alt=""
                > -->
                <img
                    :src="
                        imgSrc ? imgSrc : '../../assets/images/learning/pic.png'
                    "
                    alt=""
                >
            </div>
        </template>
        <template v-if="file">
            <i-button
                class="upload-file"
                :loading="loading"
                @click="handleClick"
            >
                上传文件
            </i-button>
        </template>
        <input
            v-show="false"
            ref="file"
            type="file"
            :accept="accept"
            @change="change"
        >
    </div>
</template>

<script>
// import { clientUpload } from '../../libs/upload';
import api from '../../api/learning';

export default {
    name: 'UploadImg',

    props: {
        img: {
            type: Boolean,
            default: false,
        },

        file: {
            type: Boolean,
            default: false,
        },

        accept: {
            type: String,
            default: 'image/*',
        },

        onBeforeUpload: {
            type: Function, // Function | Promise
            default() {
                return {
                    file: '', // file Object
                    resourceType: 1, // 资源类别：1.课程资源，2.政策解读，3.公告分类，4.政策法规，5.网站banner 6. 用户头像
                    uploadType: 1, // 上传类型：1.上传，2.重传
                    fileType: 2, // 文件格式类型：1.视频，2.图片，3.音频，4.文档
                };
            },
        },
    },

    data() {
        return {
            imgSrc: '',
            loading: false,
        };
    },

    methods: {
        handleClick() {
            this.$refs.file.click();
        },

        change(e) {
            const { onBeforeUpload } = this;
            const file = Array.prototype.slice.call(e.target.files)[0];
            const beforeUpload = onBeforeUpload && onBeforeUpload(file);
            if (beforeUpload.then) {
                onBeforeUpload.then((res) => {
                    this.upload(res);
                });
            } else {
                this.upload(beforeUpload);
            }
        },
        upload(data) {
            this.loading = true;
            // localStorage.setItem('token', 'f1356390506c44ccad9dd1c9bcb29129');
            console.log(data.file);
            return api
                .uploadFile(data)
                .then(({ data }) => {
                    console.log(data, 'data');
                    this.loading = false;

                    if (this.img) {
                        this.imgSrc = data.fileUrl;
                    }
                    this.$emit('on-end', data);
                })
                .catch(({ message }) => {
                    this.loading = false;
                    this.$Message.error(message);
                });
        },
    },
};
</script>

<style lang="less">
.upload-img-wrapper {
    position: relative;
    height: 120px;
    margin-bottom: 6px;
    .upload-btn {
        width: 120px;
        height: 120px;
        text-align: center;
        line-height: 100px;
        position: absolute;
        top: 0;
        left: 43%;
        &.upload-btn1 {
            z-index: 5;
        }
        .label {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 27px;
            line-height: 27px;
            text-align: center;
            font-size: 12px;
            color: #71777d;
            background: rgba(243, 243, 243, 1);
            border-radius: 3px;
        }
    }

    .preview-img {
        padding: 4px;
        img {
            width: 120px;
            border-radius: 50%;
        }
        .label {
            background: none;
        }
    }

    .upload-file {
        color: #2b333b;
        border: 1px solid rgba(220, 223, 230, 1);
    }
}
</style>
