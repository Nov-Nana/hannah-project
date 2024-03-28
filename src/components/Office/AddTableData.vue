<script setup lang='ts'>
import { ref, toRefs } from 'vue';
import { icon } from '@/plugins';

const t = window['$t']
const {AddCircleOutline} = icon.ionicons5
const props = defineProps(['columns'])
const { columns } = toRefs(props)

const formInfo: any = ref({})
const emits = defineEmits(['addData'])
const addData = () => {

    console.log(formInfo.value)
    emits('addData', formInfo.value)
    formInfo.value = {}
}

</script>
<template>
    <n-form :label-width="80" :model="formInfo">
        <n-form-item v-for="(item) in columns" :label="item.title" :path="item.key">
            <n-input v-model:value="formInfo[item.key]" />
        </n-form-item>
        <n-button strong secondary type="primary" size="small" round @click="addData">
            <n-icon size="20" style="margin-right: 5px">
                <AddCircleOutline></AddCircleOutline>
            </n-icon>
            {{ t('office.add_table_data') }}
        </n-button>
    </n-form>
</template>
<style lang='scss' scoped></style>