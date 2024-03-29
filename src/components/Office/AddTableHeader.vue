<script setup lang='ts'>
import { ref, watch, onMounted } from 'vue';

const t = window['$t']
const props = defineProps(['data'])
const emits = defineEmits(['update'])

const dataRef = ref()
onMounted(() => {
    dataRef.value = props.data
})
watch(() => props.data, (newVal) => {
    dataRef.value = newVal
})
function onCreate() {
    return {
        key: '',
        title: '',
        ellipsis: {
            tooltip: false
        }
    }
}
function add() {
    window['$dialog'].success({
        title: t('office.edit_table_header'),
        positiveText: '确定',
        negativeText: '不确定',
        maskClosable: false,
        onPositiveClick: () => {
            emits('update', dataRef.value)
        },
    })
}

</script>
<template>
    <n-dynamic-input v-model:value="dataRef" :on-create="onCreate">
        <!-- <template #create-button-default>
            请添加表头
        </template> -->
        <template #default="{ value }">
            <div style="display: flex; align-items: center; width: 100%">
                <n-input v-model:value="value.key" type="text" style="margin: 0 10px" />
                <n-input v-model:value="value.title" type="text" />
                <n-checkbox v-model:checked="value.ellipsis.tooltip" style="margin: 0 10px" />
            </div>
        </template>
    </n-dynamic-input>
    <n-button class="button" strong secondary type="primary" size="small" round @click="add">
        {{ t('global.confirm') }}
    </n-button>
    <pre>{{ JSON.stringify(dataRef?.value, null, 2), dataRef }}</pre>
</template>
<style lang='scss' scoped>
.button{
    margin: 20px 10px;
    float: right;
}
</style>