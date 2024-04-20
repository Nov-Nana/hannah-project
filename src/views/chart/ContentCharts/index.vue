<script setup lang='ts'>
import { ContentBox } from '../ContentBox'
import { ChartsSearch } from './components/ChartsSearch'
import { ChartsOptionContent } from './components/ChartsOptionContent'
import { LinSkeleton } from '@/components/LinSkeleton'
import { icon } from '@/plugins';
import { useChartLayoutStore } from '@/store/modules/chartLayoutStore';
import { useAsideHook } from './hooks/useAside.hook'
import { storeToRefs } from 'pinia';

const { BarChart } = icon.ionicons5
const chartLayoutStore = useChartLayoutStore()
const { getCharts } = storeToRefs(chartLayoutStore)
const { menuOptions, selectValue, selectOptions, handkeClickItem } = useAsideHook()

</script>
<template>
    <ContentBox class="get-content-charts" :class="{ scoped: !getCharts }" title="组件" :backIcon="false">
        <template #icon>
            <n-icon size="14" :depth="2">
                <BarChart></BarChart>
            </n-icon>
        </template>
        <template #top-right>
            <ChartsSearch v-show="getCharts" :menuOptions="menuOptions"></ChartsSearch>
        </template>
        <!-- 图表 -->
        <aside>
            <div class="menu-list-box">
                <n-menu class="menu-list" v-model:value="selectValue" :options="menuOptions" :icon-size="16"
                    :indent="18" @update:value="handkeClickItem"></n-menu>
                <div class="menu-component">
                    <LinSkeleton :load="!selectOptions" round text :repeat="2" style="width: 90%"></LinSkeleton>
                    <ChartsOptionContent v-if="selectOptions" :selectOptions="selectOptions" :key="selectValue">
                    </ChartsOptionContent>
                </div>
            </div>
        </aside>
    </ContentBox>
</template>
<style lang='scss' scoped>
/* 整体宽度 */
$width: 330px;
/* 列表的宽度 */
$widthScoped: 65px;
/* 此高度与 ContentBox 组件关联 */
$topHeight: 40px;

@include get(content-charts) {
    width: $width;
    transition: all 0.5s;

    &.scoped,
    .menu-list {
        width: $widthScoped;
    }

    .menu-list-box {
        display: flex;
        height: calc(100vh - #{$--header-height} - #{$topHeight});

        .menu-list {
            flex-shrink: 0;
            @include get-bg-color('background-color2');
        }

        .menu-component {
            flex-shrink: 0;
            width: $width - $widthScoped;
            overflow: hidden;
        }
    }


}
</style>@/views/chart/ContentCharts/hooks/useAside.hook