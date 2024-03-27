<script setup lang='ts'>
import { computed, nextTick, watch } from 'vue'
import * as echarts from "echarts";
import { onMounted, onUnmounted } from "vue";
import {resize} from '../../utils'
import Westeros from '@/settings/westeros.json'
import Purple from '@/settings/purple-passion.json'
import {useDesignStore} from '@/store/modules/designStore/designStore'

let chart: echarts.ECharts
const animationDuration = 6000
// 初始化
const initChart = (theme: string) => {
    chart = echarts.init(document.getElementById("barChart"),theme);

    // 设置图表配置和数据
    setOptions()

    // 自适应大小
    window.onresize = () => {
        chart.resize();
    };
};
// 设置图标项
const setOptions = () => {
    chart.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            top: 10,
            left: '2%',
            right: '2%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
                alignWithLabel: true
            }
        }],
        yAxis: [{
            type: 'value',
            axisTick: {
                show: false
            }
        }],
        series: [{
            name: 'pageA',
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            data: [79, 52, 200, 334, 390, 330, 220],
            animationDuration
        }, {
            name: 'pageB',
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            data: [80, 52, 200, 334, 390, 330, 220],
            animationDuration
        }, {
            name: 'pageC',
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            data: [30, 52, 200, 334, 390, 330, 220],
            animationDuration
        }]
    })
}

const theme = computed(() => {
    return useDesignStore().getDarkTheme ? 'Purple' : 'westeros'
})
watch(theme, (newValue) => {
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
<div id="barChart" :style="{ width: '100%', height: '300px' }"></div>
</template>
<style lang='scss' scoped>

</style>