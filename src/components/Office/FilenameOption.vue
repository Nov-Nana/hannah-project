<script setup lang='ts'>
import { icon } from '../../plugins'

const { FileExcelFilled } = icon.antd

const t = window['$t']

const props = defineProps({
    value: String
})

const emits = defineEmits(['update:value'])

const input = (value: string | number) => {
    emits('update:value', value)
}
</script>
<template>
    <n-flex :wrap="false">
        <div class="label">{{ t('office.filename') }}: </div>
        <n-input style="width: 70%;max-width: 300px;flex-flow: 2" size="small" :value="props.value" :on-input="input" type="text"
                :placeholder="t('office.filename_placeholder')">
                <template #prefix>
                    <n-icon size="22" :component="FileExcelFilled" />
                </template>
            </n-input>
    </n-flex>
</template>
<style lang='scss' scoped>
.label {
    // width: 120px;
    font-size: 14px;
    color: #606266;
    line-height: 24px;
    font-weight: bolder;
}
</style>