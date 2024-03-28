<script setup lang='ts'>
const t = window['$t']

const props = defineProps({
    value: Boolean
})

const emits = defineEmits(['update:value'])

const change = (value:boolean) => {
    emits('update:value', value)
}
</script>
<template>
    <n-flex :wrap="false">
        <div class="label">{{ t('office.cell_auto_width') }}: </div>
        <n-radio-group size="small" v-model:value="props.value" :on-update:value="change" name="radiogroup">
            <n-flex>
                <n-radio :value="true">
                    TRUE
                </n-radio>  
                <n-radio :value="false">
                    FALSE
                </n-radio>  
            </n-flex>
        </n-radio-group>
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