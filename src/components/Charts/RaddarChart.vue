<script setup lang='ts'>
import { computed, nextTick, watch } from 'vue'
import * as echarts from "echarts";
import { onMounted, onUnmounted } from "vue";
import { resize } from '../../utils'
import Westeros from '@/settings/westeros.json'
import Purple from '@/settings/purple-passion.json'
import {useDesignStore} from '@/store/modules/designStore/designStore'

let chart: echarts.ECharts
const animationDuration = 3000
// 初始化
const initChart = (theme:string) => {
    chart = echarts.init(document.getElementById("raddarChart"),theme);

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
        radar: {
            radius: '66%',
            center: ['50%', '42%'],
            splitNumber: 8,
            splitArea: {
                areaStyle: {
                    color: 'rgba(127,95,132,.3)',
                    opacity: 1,
                    shadowBlur: 45,
                    shadowColor: 'rgba(0,0,0,.5)',
                    shadowOffsetX: 0,
                    shadowOffsetY: 15
                }
            },
            indicator: [
                { name: 'Sales' },
                { name: 'Administration' },
                { name: 'Information Technology' },
                { name: 'Customer Support' },
                { name: 'Development' },
                { name: 'Marketing' }
            ]
        },
        legend: {
            left: 'center',
            bottom: '10',
            data: ['Allocated Budget', 'Expected Spending', 'Actual Spending']
        },
        series: [{
            type: 'radar',
            symbolSize: 0,
            areaStyle: {
                shadowBlur: 13,
                shadowColor: 'rgba(0,0,0,.2)',
                shadowOffsetX: 0,
                shadowOffsetY: 10,
                opacity: 1
            },
            data: [
                {
                    value: [5000, 7000, 12000, 11000, 15000, 14000],
                    name: 'Allocated Budget'
                },
                {
                    value: [4000, 9000, 15000, 15000, 13000, 11000],
                    name: 'Expected Spending'
                },
                {
                    value: [5500, 11000, 12000, 15000, 12000, 12000],
                    name: 'Actual Spending'
                }
            ],
            animationDuration: animationDuration
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
    <div id="raddarChart" :style="{ width: '100%', height: '300px' }"></div>
</template>
<style lang='scss' scoped></style>