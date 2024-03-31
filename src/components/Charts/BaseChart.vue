<script setup lang='ts'>
import { ref,watch } from 'vue';
import { useEcharts, EChartsOption } from '../../hooks/useEcharts.hook'

interface Props {
    option: EChartsOption
}
const props = defineProps<Props>()
const currentOption = ref(props.option)
const elEcharts = ref()
const {setOptions}=useEcharts(elEcharts, currentOption.value)

watch(() => props.option, (newVal) => {
    setOptions(newVal)
})
</script>
<template>
    <div ref="elEcharts" id="baseChart" :style="{ width: '100%', height: '300px' }"></div>
</template>
<style lang='scss' scoped></style>