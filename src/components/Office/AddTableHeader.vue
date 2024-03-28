<script setup lang='ts'>
import { ref, watch, onMounted } from 'vue';


const props = defineProps(['data'])
const emits = defineEmits(['update'])

const dataRef = ref()
onMounted(() => {
    dataRef.value = props.data
})
watch(() => props.data, (newVal) => {
    dataRef.value = newVal
})
watch(dataRef, (newVal) => {
    emits('update', newVal)
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

</script>
<template>
    <n-dynamic-input v-model:value="dataRef" :on-create="onCreate">
        <template #create-button-default>
            请添加表头
        </template>
        <template #default="{ value }">
            <div style="display: flex; align-items: center; width: 100%">
                <n-input v-model:value="value.key" type="text" style="margin: 0 10px" />
                <n-input v-model:value="value.title" type="text" />
                <n-checkbox v-model:checked="value.ellipsis.tooltip" style="margin: 0 10px" />
            </div>
        </template>
    </n-dynamic-input>
    <pre>{{ JSON.stringify(dataRef?.value, null, 2),dataRef }}</pre>
</template>
<style lang='scss' scoped></style>