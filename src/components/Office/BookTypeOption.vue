<script setup lang='ts'>
let options = [
    { label: 'xlsx', value: 'xlsx' },
    { label: 'csv', value: 'csv' },
    { label: 'txt', value: 'txt' },
]
const t = window['$t']

const props = defineProps({
    value: String
})

const emits = defineEmits(['update:value'])

const change = (value: string) => {
    emits('update:value', value)
}
</script>
<template>
    <n-flex :wrap="false">
        <div class="label">{{ t('office.book_type') }}: </div>
        <n-select size="small" style="width: 100px;" v-model:value="props.value" :on-update:value="change"
            :options="options" />
    </n-flex>
</template>
<style lang='scss' scoped>
.label {
    font-size: 14px;
    color: #606266;
    line-height: 24px;
    font-weight: bolder;
}
</style>