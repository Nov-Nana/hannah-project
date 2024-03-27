<script setup lang='ts'>
import { computed, nextTick, watch } from 'vue'
import * as echarts from "echarts";
import { onMounted, onUnmounted } from "vue";
import { resize } from '../../utils'
import Westeros from '@/settings/westeros.json'
import Purple from '@/settings/purple-passion.json'
import {useDesignStore} from '@/store/modules/designStore/designStore'

let chart: echarts.ECharts
let props = defineProps(['chartData'])
// 更换图标数据
watch(() => props.chartData, (newValue) => {
    setOptions(newValue)
});

// 初始化
const initChart = (theme: string) => {
    chart = echarts.init(document.getElementById("myEcharts"),theme);

    // 设置图表配置和数据
    setOptions(props.chartData)

    // 自适应大小
    window.onresize = () => {
        chart.resize();
    };
};
// 设置图标项
const setOptions = (data: { expectedData: any; actualData: any; }) => {
    const { expectedData, actualData } = data;
    chart.setOption({
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
            data: expectedData,
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
    })
}
const theme = computed(()=>{
    return useDesignStore().getDarkTheme ? 'Purple' : 'westeros'
})
watch(theme,(newValue)=>{
    chart && chart.dispose();
    initChart(newValue)
})

onMounted(() => {
    nextTick(() => {
        echarts.registerTheme('westeros', Westeros)
        echarts.registerTheme('Purple', Purple)
        initChart(theme.value);
        // 解决自适应问题
        resize(chart)
    })

});


onUnmounted(() => {
    chart.dispose();
});
</script>
<template>
    <div id="myEcharts" :style="{ width: '100%', height: '350px' }"></div>
</template>
<style lang='scss' scoped></style>