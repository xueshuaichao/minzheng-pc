<template>
    <div class="home">
        <div class="component-preview">
            <i-switch />
            <i-circle :percent="60" />
            <div>
                <i-button>Default</i-button>
                <i-button
                    type="primary"
                    size="large"
                >
                    Primary
                </i-button>
                <i-button type="dashed">
                    Dashed
                </i-button>
                <i-button type="text">
                    Text
                </i-button>
            </div>
            <div style="background: rgb(190, 200, 200);padding: 20px;">
                <i-button ghost>
                    default
                </i-button>
                <i-button
                    type="primary"
                    size="large"
                    ghost
                >
                    Primary
                </i-button>
                <i-button
                    type="dashed"
                    ghost
                >
                    Dashed
                </i-button>
                <i-button
                    type="text"
                    ghost
                >
                    Text
                </i-button>
            </div>
            <i-button
                type="info"
                shape="circle"
            >
                Info
            </i-button>
            <i-button type="success">
                Success
            </i-button>
            <i-button type="warning">
                Warning
            </i-button>
            <i-button type="error">
                Error
            </i-button>
            <i-input
                placeholder="请输入..."
                size="large"
            />
            <i-select>
                <i-option
                    v-for="i in cityList"
                    :key="i.value"
                    :value="i.value"
                >
                    {{ i.label }}
                </i-option>
            </i-select>
            <h6>radio</h6>
            <div>
                <i-radio-group>
                    <i-radio label="ios" />
                    <i-radio label="android" />
                    <i-radio label="windows" />
                </i-radio-group>
                <i-radio-group vertical>
                    <i-radio label="ios" />
                    <i-radio label="android" />
                    <i-radio label="windows" />
                </i-radio-group>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cityList: [
                {
                    value: 'New York',
                    label: 'New York',
                },
                {
                    value: 'London',
                    label: 'London',
                },
                {
                    value: 'Sydney',
                    label: 'Sydney',
                },
                {
                    value: 'Ottawa',
                    label: 'Ottawa',
                },
                {
                    value: 'Paris',
                    label: 'Paris',
                },
                {
                    value: 'Canberra',
                    label: 'Canberra',
                },
            ],
        };
    },
};
</script>
<style lang="less">
.home {
    width: 100%;
    height: 100%;
    font-size: 40px;
    color: #2c3e50;
}
.component-preview {
    width: 980px;
    margin: 32px auto;
}
</style>
