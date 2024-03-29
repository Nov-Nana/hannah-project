<script setup lang='ts'>
import { computed, watch } from 'vue'
import { echarts } from '@/plugins'
import { onMounted, onUnmounted } from "vue";
import { resize } from '../../utils'
import { useDesignStore } from '@/store/modules/designStore/designStore'

let chart: echarts.ECharts
// 初始化
const initChart = (theme: string) => {
    chart = echarts.init(document.getElementById("pieChart"), theme);

    // 设置图表配置和数据
    setOptions()
};
// 设置图标项
const setOptions = () => {
    chart.setOption({
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            left: 'center',
            bottom: '10',
            data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
        },
        series: [
            {
                name: 'WEEKLY WRITE ARTICLES',
                type: 'pie',
                roseType: 'radius',
                radius: [15, 95],
                center: ['50%', '38%'],
                data: [
                    { value: 320, name: 'Industries' },
                    { value: 240, name: 'Technology' },
                    { value: 149, name: 'Forex' },
                    { value: 100, name: 'Gold' },
                    { value: 59, name: 'Forecasts' }
                ],
                animationEasing: 'cubicInOut',
                animationDuration: 2600
            }
        ]
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
    initChart(theme.value);
    // 解决自适应问题
    resize(chart)

});

onUnmounted(() => {
    chart.dispose();
});

</script>
<template>
    <div id="pieChart" :style="{ width: '100%', height: '300px' }"></div>
</template>
<style lang='scss' scoped></style>