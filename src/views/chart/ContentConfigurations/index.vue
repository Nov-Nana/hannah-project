<script setup lang='ts'>
import { computed, ref, toRefs } from 'vue';
import { ContentBox } from '../ContentBox'
import { useChartEditStore } from '@/store/modules/chartEditStore';
import { useChartLayoutStore } from '@/store/modules/chartLayoutStore';
import { ChartLayoutStoreEnum } from '@/store/modules/chartLayoutStore/chartLayoutStore.d';
import { icon } from '@/plugins';
import { loadAsyncComponent } from '@/utils';

const enum TabsEnum {
    PAGE_SETTING = 'pageSetting',
    CHART_SETTING = 'chartSetting',
    CHART_ANIMATION = 'chartAnimation',
    CHART_DATA = 'chartData',
    CHART_EVENT = 'chartEvent'
}
const chartEditStore = useChartEditStore()
const tabsSelect = ref<TabsEnum>(TabsEnum.CHART_SETTING)
const selectTarget = computed(() => {
    const selectId = chartEditStore.getTargetChart.selectId
    if (selectId.length !== 1) return undefined
    const target = chartEditStore.componentList[chartEditStore.fetchTargetIndex()]
    if (target?.isGroup) {
        tabsSelect.value = TabsEnum.CHART_SETTING
    }
    return target
})

const { LaptopOutline, Construct, Dice, Podium, Tennisball } = icon.ionicons5
const ContentEdit = loadAsyncComponent(() => import('@/views/chart/ContentEdit/index.vue'))
const CanvasPage = loadAsyncComponent(() => import('./components/CanvasPage/index.vue'))
const ChartSetting = loadAsyncComponent(() => import('./components/ChartSetting/index.vue'))
const ChartAnimation = loadAsyncComponent(() => import('./components/ChartAnimation/index.vue'))
const ChartData = loadAsyncComponent(() => import('./components/ChartData/index.vue'))
const ChartEvent = loadAsyncComponent(() => import('./components/ChartEvent/index.vue'))
// 详情页面设置
const globalTabList = [
    {
        key: TabsEnum.PAGE_SETTING,
        title: '页面配置',
        icon: LaptopOutline,
        render: CanvasPage
    }
]
const chartsDefaultTabList = [
    {
        key: TabsEnum.CHART_SETTING,
        title: '定制',
        icon: Construct,
        render: ChartSetting
    },
    {
        key: TabsEnum.CHART_ANIMATION,
        title: '动画',
        icon: Dice,
        render: ChartAnimation
    }
]

const chartsTabList = [
    ...chartsDefaultTabList,
    {
        key: TabsEnum.CHART_DATA,
        title: '数据',
        icon: Podium,
        render: ChartData
    },
    {
        key: TabsEnum.CHART_EVENT,
        title: '事件',
        icon: Tennisball,
        render: ChartEvent
    }
]

const { getDetails } = toRefs(useChartLayoutStore())
const { setItem } = useChartLayoutStore()
const collapsed = computed(() => {
    return getDetails.value
})

const handleCollapse = () => {
    setItem(ChartLayoutStoreEnum.DETAILS, true)
}
const handleExpand = () => {
    setItem(ChartLayoutStoreEnum.DETAILS, false)
}
</script>
<template>
    <n-layout has-sider sider-placement="right">
        <n-layout-content>
            <!-- 图表拖拽 -->
            <ContentEdit></ContentEdit>
        </n-layout-content>

        <n-layout-sider collapse-mode="transform" :collapsed="collapsed" :collapsed-width="0" :width="350"
            :native-scrollbar="false" show-trigger="bar" @collapse="handleCollapse" @expand="handleExpand">
            <ContentBox class="get-content-config" :show-top="false" :backIcon="false" :depth="2">
                <!-- 页面配置 -->
                <n-tabs v-if="!selectTarget" class="tabs-box" size="small" type="segment">
                    <n-tab-pane v-for="item in globalTabList" :key="item.key" :name="item.title" size="small"
                        display-directive="show:lazy">
                        <template #tab>
                            <n-flex align="center">
                                <span>{{ item.title }}</span>
                                <n-icon size="16">
                                    <component :is="item.icon"></component>
                                </n-icon>
                            </n-flex>
                        </template>
                        <component :is="item.render"></component>
                    </n-tab-pane>
                </n-tabs>

                <!-- 编辑 -->
                <n-tabs v-if="selectTarget" v-model:value="tabsSelect" class="tabs-box" size="small" type="segment">
                    <n-tab-pane v-for="item in selectTarget.isGroup ? chartsDefaultTabList : chartsTabList"
                        :key="item.key" :name="item.key" size="small" display-directive="show:lazy">
                        <template #tab>
                            <n-flex align="center">
                                <span>{{ item.title }}</span>
                                <n-icon size="16">
                                    <component :is="item.icon"></component>
                                </n-icon>
                            </n-flex>
                        </template>
                        <component :is="item.render"></component>
                    </n-tab-pane>
                </n-tabs>


            </ContentBox>
        </n-layout-sider>
    </n-layout>

</template>
<style lang='scss' scoped>
@include get(content-config) {
    overflow: hidden;

    .tabs-box {
        padding: 10px;
    }
}
</style>