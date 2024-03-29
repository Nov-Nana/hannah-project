<script setup lang='ts'>
import { ref, toRefs } from 'vue';

const t = window['$t']
const props = defineProps(['columns'])
const { columns } = toRefs(props)

const formInfo: any = ref({})
const emits = defineEmits(['addData'])
const addData = () => {
    window['$dialog'].success({
        title: t('office.add_table_data'),
        positiveText: '确定',
        negativeText: '不确定',
        maskClosable: false,
        onPositiveClick: () => {
            emits('addData', formInfo.value)
            formInfo.value = {}
        },
    })

}

</script>
<template>
    <n-form :label-width="80" :model="formInfo">
        <n-form-item v-for="(item) in columns" :label="item.title" :path="item.key">
            <n-input v-model:value="formInfo[item.key]" />
        </n-form-item>
        <n-button class="button" strong secondary type="primary" size="small" round @click="addData">
            {{ t('global.confirm') }}
        </n-button>
    </n-form>
</template>
<style lang='scss' scoped>
.button {
    float: right;
    margin: 20px 10px;
}
</style>