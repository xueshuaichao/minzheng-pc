<template>
    <div class="layout_1">
        <Row class="row">
            <i-col span="24">
                <slot name="aid_1" />
            </i-col>
        </Row>
        <Row
            :gutter="20"
            class="row"
        >
            <i-col span="16">
                <slot name="aid_2" />
            </i-col>
            <i-col span="8">
                <slot name="aid_3" />
            </i-col>
        </Row>
    </div>
</template>

<style scoped lang="less">
.layout_1 .row {
    margin-top: 16px;
}
</style>
