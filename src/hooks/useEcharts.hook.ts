import { echarts } from "@/plugins"
import { useDesignStore } from "@/store/modules/designStore/designStore"
import { resize } from "@/utils"
import { EChartsCoreOption } from "echarts/core"
import { Ref, computed, onMounted, onUnmounted, shallowRef, watch } from "vue"

export type EChartsOption = EChartsCoreOption
export type themeType = 'Purple' | 'westeros' | undefined
export const useEcharts = (el: Ref<HTMLElement>, options: EChartsCoreOption) => {
    const chart = shallowRef<echarts.ECharts>()
    const initChart = (theme?: themeType) => {
        if (theme) {
            chart.value = echarts.init(el.value, theme)
        } else {
            chart.value = echarts.init(el.value, 'westeros')
        }
        setOptions(options)
    }

    const setOptions = (options: EChartsOption) => {
        chart.value && chart.value.setOption(options)
    }
    const diposeChart = () => {
        chart.value && chart.value.dispose()
    }

    onMounted(() => {
        initChart()
        resize(chart.value)
    })

    const theme = computed(() => {
        return useDesignStore().getDarkTheme ? 'Purple' : 'westeros'
    })
    watch(theme, (nVal: themeType) => {
        chart.value && chart.value.dispose()
        initChart(nVal)
    })
    onUnmounted(() => {
        chart.value && chart.value.dispose()
    });

    return {
        initChart,
        diposeChart,
        setOptions
    }

}