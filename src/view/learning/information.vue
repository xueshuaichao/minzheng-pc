<template>
    <div class="information-content">
        <div class="picture">
            <p class="text">
                基本信息
            </p>
            <i-button
                v-if="!informationShow"
                type="primary"
                class="btn conserve"
                @click="informationShow = true"
            >
                编辑
            </i-button>

            <div
                v-if="informationShow"
                class="uploading"
            >
                <page-upload-file
                    img
                    :on-before-upload="onBeforeUpload"
                    @on-end="uploadEnd"
                />
                <p><span style="color:#D84344;">*</span> 一寸正面免冠照片</p>
            </div>
            <div
                v-else
                class="portrait"
            >
                <img
                    :src="
                        information.picture
                            ? information.picture
                            : defaultpicture
                    "
                    alt=""
                >
            </div>
        </div>
        <div
            v-if="informationShow"
            class="information-form"
        >
            <Form
                ref="formInline"
                :model="information"
                :rules="ruleInline"
                inline
            >
                <div class="form-left">
                    <FormItem
                        prop="tuiyihouquxiang"
                        label="退役后去向"
                        class="dispositon"
                    >
                        <RadioGroup v-model="information.tuiyihouquxiang">
                            <Radio
                                v-for="(item, index) in city"
                                :key="index"
                                :label="item.label"
                                :value="item.value"
                            >
                                {{ item.value }}
                            </Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem
                        prop="direction"
                        label="拟选择方向"
                        class="direction"
                    >
                        <RadioGroup v-model="information.tuiyihoufangxiang">
                            <Radio
                                v-for="(item, index) in direction"
                                :key="index"
                                :label="item.label"
                                :value="item.value"
                            >
                                {{ item.value }}
                            </Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem
                        prop="name"
                        label="真实姓名"
                    >
                        <i-input
                            v-model="information.realName"
                            disabled
                        />
                    </FormItem>
                    <FormItem
                        prop="name"
                        label="身份证号"
                    >
                        <i-input
                            v-model="information.idcard"
                            disabled
                        />
                    </FormItem>
                    <FormItem
                        prop="name"
                        label="出生年月"
                    >
                        <i-input v-model="information.birthdate" />
                    </FormItem>
                    <FormItem
                        prop="identityCategory"
                        label="身份类别"
                    >
                        <Select v-model="information.identityCategory">
                            <Option
                                v-for="item in identityCategory"
                                :key="item.label"
                                :value="item.value"
                                disabled
                            >
                                {{ item.value }}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        prop="dispositon"
                        label="性别"
                    >
                        <RadioGroup v-model="information.sex">
                            <Radio
                                v-for="item in sexList"
                                :key="item.label"
                                :label="item.label"
                                :value="item.value"
                            >
                                {{ item.value }}
                            </Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem
                        prop="nativePlace"
                        label="籍贯"
                    >
                        <i-input
                            v-model="information.nativePlace"
                            placeholder="请输入籍贯信息"
                        />
                    </FormItem>
                    <FormItem
                        prop="nation"
                        label="民族"
                    >
                        <i-input
                            v-model="information.nation"
                            placeholder="请输入民族"
                        />
                    </FormItem>
                    <FormItem
                        prop="politicsStatus"
                        label="政治面貌"
                    >
                        <i-select v-model="information.politicsStatus">
                            <i-option
                                v-for="item in politicsStatus"
                                :key="item.id"
                                :value="item.value"
                            >
                                {{ item.value }}
                            </i-option>
                        </i-select>
                    </FormItem>
                </div>
                <div class="form-right">
                    <FormItem
                        prop="wechatNo"
                        label="微信号"
                    >
                        <i-input
                            v-model="information.wechatNo"
                            placeholder="请输入微信号"
                        />
                    </FormItem>
                    <FormItem
                        prop="email"
                        label="邮箱"
                    >
                        <i-input
                            v-model="information.email"
                            placeholder="请输入邮箱"
                        />
                    </FormItem>
                    <FormItem
                        prop="postalAddress"
                        label="通讯地址"
                    >
                        <i-input
                            v-model="information.postalAddress"
                            placeholder="请输入通讯地址"
                        />
                    </FormItem>
                    <FormItem
                        prop="postalCode"
                        label="邮政编码"
                    >
                        <i-input
                            v-model="information.postalCode"
                            placeholder="请输入邮政编码"
                        />
                    </FormItem>
                    <FormItem
                        prop="eduBackground"
                        label="学历"
                    >
                        <i-input
                            v-model="information.eduBackground"
                            placeholder="请输入学历"
                        />
                    </FormItem>
                    <FormItem
                        prop="graduateInstitution"
                        label="毕业院校"
                    >
                        <i-input
                            v-model="information.graduateInstitution"
                            placeholder="请输入毕业院校"
                        />
                    </FormItem>
                    <FormItem
                        prop="workUnit"
                        label="工作单位及职务"
                    >
                        <i-input
                            v-model="information.workUnit"
                            placeholder="请输入工作单位"
                        />
                    </FormItem>
                    <FormItem
                        prop="jobTitle"
                        label="职称"
                    >
                        <i-input
                            v-model="information.jobTitle"
                            placeholder="请输入职称"
                        />
                    </FormItem>
                    <FormItem
                        prop="workTelephone"
                        label="单位电话"
                    >
                        <i-input
                            v-model="information.workTelephone"
                            placeholder="请输入单位电话"
                        />
                    </FormItem>
                </div>
            </Form>
            <div class="button">
                <i-button
                    type="primary"
                    class="btn cancel"
                    @click="informationShow = false"
                >
                    取消
                </i-button>
                <i-button
                    type="primary"
                    class="btn conserve"
                    @click="saveInformation"
                >
                    保存
                </i-button>
            </div>
        </div>
        <div
            v-else
            class="information-form"
        >
            <div>
                <ul class="text-left">
                    <li>
                        退役后去向：{{
                            information.tuiyihouquxiang
                                ? information.tuiyihouquxiang
                                : "- -"
                        }}
                    </li>
                    <li>
                        拟方向选择：{{
                            information.tuiyihoufangxiang
                                ? information.tuiyihoufangxiang
                                : "- -"
                        }}
                    </li>
                    <li>
                        真实姓名：{{
                            information.realName ? information.realName : "- -"
                        }}
                    </li>
                    <li>
                        身份证号：{{
                            information.idcard ? information.idcard : "- -"
                        }}
                    </li>
                    <li>
                        出生年月：{{
                            information.birthdate
                                ? information.birthdate
                                : "- -"
                        }}
                    </li>
                    <li>
                        身份类别：{{
                            information.identityCategory
                                ? information.identityCategory
                                : "- -"
                        }}
                    </li>
                    <li>
                        性别：{{ information.sex ? information.sex : "- -" }}
                    </li>
                    <li>
                        籍贯：{{
                            information.nativePlace
                                ? information.nativePlace
                                : "- -"
                        }}
                    </li>
                    <li>
                        民族：{{
                            information.nation ? information.nation : "- -"
                        }}
                    </li>
                    <li>
                        政治面貌：{{
                            information.politicsStatus
                                ? information.politicsStatus
                                : "- -"
                        }}
                    </li>
                </ul>
                <ul class="text-right">
                    <li>
                        微信号：{{
                            information.wechatNo ? information.wechatNo : "- -"
                        }}
                    </li>
                    <li>
                        邮箱：{{
                            information.email ? information.email : "- -"
                        }}
                    </li>
                    <li>
                        通讯地址：{{
                            information.postalAddress
                                ? information.postalAddress
                                : "- -"
                        }}
                    </li>
                    <li>
                        邮政编码：{{
                            information.postalCode
                                ? information.postalCode
                                : "- -"
                        }}
                    </li>
                    <li>
                        学历：{{
                            information.eduBackground
                                ? information.eduBackground
                                : "- -"
                        }}
                    </li>
                    <li>
                        毕业院校：{{
                            information.graduateInstitution
                                ? information.graduateInstitution
                                : "- -"
                        }}
                    </li>
                    <li>
                        工作单位及职务：{{
                            information.workUnit ? information.workUnit : "- -"
                        }}
                    </li>
                    <li>
                        职称：{{
                            information.jobTitle ? information.jobTitle : "- -"
                        }}
                    </li>
                    <li>
                        单位电话：{{
                            information.workTelephone
                                ? information.workTelephone
                                : "- -"
                        }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import userApi from '../../api/user';
import pageUploadFile from '../components/upload-file.vue';
import { emailValidator } from '../../utils/validators';

export default {
    components: { pageUploadFile },
    props: {
        informationShow: {
            type: Boolean, // 定义接收到的数据的类型
            default: false,
            required: false, // 规定这个数据是否必传,默认false
        },
    },
    data() {
        return {
            defaultpicture: require('../../assets/images/home/portrait.png'),
            // informationShow: false,
            politicsStatus: [
                {
                    id: 1,
                    value: '群众',
                },
                {
                    id: 2,
                    value: '团员',
                },
                {
                    id: 3,
                    value: '预备党员',
                },
                {
                    id: 4,
                    value: '党员',
                },
            ],
            direction: [], // 方向
            city: [], // 去向
            identityCategory: [], // 身份职称
            sexList: [],
            information: {
                id: '', // 是   用户id
                realName: '', //   真实姓名   不可修改
                identityCategory: '',
                sex: '', // 性别    枚举
                idcard: '', //    身份证号    不可修改
                birthdate: '', //    出生年月    字符串类型
                nativePlace: '', //    是    籍贯
                nation: '', //    是    民族
                politicsStatus: '', //    是    政治面貌
                phoneNo: '', //    是    手机号
                wechatNo: '', //    是    微信号
                tuiyihouquxiang: '', //    是    就业后去向    枚举
                tuiyihoufangxiang: '', // 是    就业后方向    枚举
                eduBackground: '', //    否    学历
                graduateInstitution: '', //    否    毕业院校及专业
                workUnit: '', //    工作单位及职务
                jobTitle: '', //    否    职称
                workTelephone: '', //    否    单位电话
                postalAddress: '', //    否    通讯地址
                postalCode: '', //    否    通讯邮编
                email: '', //    否    邮编
                picture: '', //    否    头像
            },
            ruleInline: {
                email: [
                    {
                        required: true,
                        validator: emailValidator,
                        trigger: 'blur',
                        type: 'string',
                    },
                ],
            },
            userInfo: null,
        };
    },
    created() {
        this.userStaticInfo();
    },
    methods: {
        saveInformation() {
            return userApi.update(this.information).then((data) => {
                if (data.success) {
                    this.informationShow = false;
                }
            });
        },
        onBeforeUpload(file) {
            return {
                file,
                resourceType: 6,
                uploadType: 1,
                fileType: 2,
            };
        },

        uploadEnd({ fileUrl }) {
            this.information.picture = fileUrl;
        },
        userStaticInfo() {
            return userApi.userStaticInfo().then((data) => {
                Object.keys(data.data.tuiyihoufangxiang).forEach(
                    (item, index) => {
                        this.direction.push({
                            label: item,
                            value: Object.values(data.data.tuiyihoufangxiang)[
                                index
                            ],
                        });
                    },
                );
                Object.keys(data.data.tuiyihouquxiang).forEach(
                    (item, index) => {
                        this.city.push({
                            label: item,
                            value: Object.values(data.data.tuiyihouquxiang)[
                                index
                            ],
                        });
                    },
                );
                Object.keys(data.data.identityCategory).forEach(
                    (item, index) => {
                        this.identityCategory.push({
                            label: item,
                            value: Object.values(data.data.identityCategory)[
                                index
                            ],
                        });
                    },
                );
                Object.keys(data.data.sex).forEach((item, index) => {
                    this.sexList.push({
                        label: item,
                        value: Object.values(data.data.sex)[index],
                    });
                });
                this.getUserInfo();
            });
        },
        getUserInfo() {
            // todo fetch userInfo
            userApi.getUserInfo().then((res) => {
                this.information = res.data;
                console.log(res.data);
            });
        },
    },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
