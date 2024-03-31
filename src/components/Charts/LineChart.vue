<script setup lang='ts'>
import { watch, ref } from 'vue'
import { BaseChart } from './index'

let props = defineProps(['chartData'])
watch(() => props.chartData, (newVal) => {
    setOption(newVal.expectedData, newVal.actualData)
}, { deep: true })
let option = ref({
    xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        boundaryGap: false,
        axisTick: {
            show: false
        }
    },
    grid: {
        left: 10,
        right: 10,
        bottom: 20,
        top: 30,
        containLabel: true
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        },
        padding: [5, 10]
    },
    yAxis: {
        axisTick: {
            show: false
        }
    },
    legend: {
        data: ['expected', 'actual']
    },
    series: [{
        name: 'expected',
        smooth: true,
        type: 'line',
        data: props.chartData.expectedData,
        animationDuration: 2800,
        animationEasing: 'cubicInOut'
    },
    {
        name: 'actual',
        smooth: true,
        type: 'line',
        data: props.chartData.actualData,
        animationDuration: 2800,
        animationEasing: 'quadraticOut'
    }]
})
function setOption(expectedDate: [], actualData: []) {
    option.value = {
        xAxis: {
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            boundaryGap: false,
            axisTick: {
                show: false
            }
        },
        grid: {
            left: 10,
            right: 10,
            bottom: 20,
            top: 30,
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            padding: [5, 10]
        },
        yAxis: {
            axisTick: {
                show: false
            }
        },
        legend: {
            data: ['expected', 'actual']
        },
        series: [{
            name: 'expected',
            smooth: true,
            type: 'line',
            data: expectedDate,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
        },
        {
            name: 'actual',
            smooth: true,
            type: 'line',
            data: actualData,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
        }]
    }
}


</script>
<template>
    <BaseChart :option="option"></BaseChart>
</template>
<style lang='scss' scoped></style>