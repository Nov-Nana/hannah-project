<script setup lang='ts'>
import { reactive, toRefs, computed } from 'vue';
import { icon } from '@/plugins';
import { renderIcon, routerByName } from '@/utils';
import { ChartLayoutStoreEnum } from '@/store/modules/chartLayoutStore/chartLayoutStore.d'
import { useChartLayoutStore } from '@/store/modules/chartLayoutStore/index'
import { HistoryStackEnum } from '@/store/modules/chartHistoryStore/chartHistoryStore.d'
import { useChartHistoryStore } from '@/store/modules/chartHistoryStore/index'
import { useChartEditStore } from '@/store/modules/chartEditStore/index'
import { PageEnum } from '@/enums/pageEnum';

const { Home, BarChart, Prism, ArrowBack, ArrowForward } = icon.ionicons5;
const { LayoutFilled } = icon.antd;
const { setItem } = useChartLayoutStore()
const { getCharts, getLayers, getDetails } = toRefs(useChartLayoutStore())

const btnList = reactive([
    {
        key: ChartLayoutStoreEnum.CHARTS,
        select: getCharts,
        title: '图表组件',
        icon: renderIcon(BarChart)
    },
    {
        key: ChartLayoutStoreEnum.LAYERS,
        select: getLayers,
        title: '图层控制',
        icon: renderIcon(LayoutFilled)
    },
    {
        key: ChartLayoutStoreEnum.DETAILS,
        select: getDetails,
        title: '详情设置',
        icon: renderIcon(Prism)
    }
])
function handleGoHome() {
    window['$dialog'].warning({
        title: '提示',
        content: '确定放回首页吗？数据将不会被保存',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
            routerByName(PageEnum.PROJECT_ALL_NAME)
        }
    })
}
function handleStyle(item: any) {
    if (item.key === ChartLayoutStoreEnum.DETAILS) {
        return item.select ? '' : 'primary'
    }
    return item.select ? 'primary' : ''
}
function handleClick(item: any) {
    setItem(item.key, !item.select)

}

const chartHistoryStore = useChartHistoryStore()
const isBackStack = computed(() => chartHistoryStore.getBackStack.length > 0)
const isForwardStack = computed(() => chartHistoryStore.getForwardStack.length > 0)
const historyList = reactive([
    {
        key: HistoryStackEnum.BACK_STACK,
        title: '后退',
        icon: renderIcon(ArrowBack),
        select: isBackStack
    },
    {
        key: HistoryStackEnum.FORWARD_STACK,
        title: '前进',
        icon: renderIcon(ArrowForward),
        select: isForwardStack
    },
])

const chartEditStore = useChartEditStore()
function handleHistoryClick(item: any) {
    switch (item.key) {
        case HistoryStackEnum.BACK_STACK:
            chartEditStore.setBack()
            break;
        case HistoryStackEnum.FORWARD_STACK:
            chartEditStore.setForward()
            break;
    }
}
</script>
<template>
    <n-flex class="header-left-btn">
        <n-button size="small" quaternary @click="handleGoHome">
            <n-icon :size="20">
                <Home></Home>
            </n-icon>
        </n-button>
        <n-flex>
            <n-tooltip v-for="item in btnList" :key="item.key" placement="bottom" trigger="hover">
                <template #trigger>
                    <n-button size="small" ghost :type="handleStyle(item)" :focusable="false"
                        @click="handleClick(item)">
                        <component :is="item.icon"></component>
                    </n-button>
                </template>
                <span>{{ item.title }}</span>
            </n-tooltip>
            <n-divider vertical />
            <n-tooltip v-for="item in historyList" :key="item.key" placement="bottom" trigger="hover">
                <template #trigger>
                    <n-button size="small" ghost type="primary" :disabled="!item.select"
                        @click="handleHistoryClick(item)">
                        <component :is="item.icon"></component>
                    </n-button>
                </template>
                <span>{{ item.title }}</span>
            </n-tooltip>
        </n-flex>

    </n-flex>
</template>
<style lang='scss' scoped></style>