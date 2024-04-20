<script setup lang='ts'>
import { ContentBox } from '../ContentBox'
import { useChartLayoutStore } from '@/store/modules/chartLayoutStore'
import { ChartLayoutStoreEnum, LayerModeEnum } from '@/store/modules/chartLayoutStore/chartLayoutStore.d';
import { icon } from '@/plugins';
import { computed } from 'vue';

const chartLayoutStore = useChartLayoutStore()
const { Layers, LaptopOutline, List } = icon.ionicons5

const layerMode = computed(() => chartLayoutStore.getLayerType)
const handleBack = () => {
    chartLayoutStore.setItem(ChartLayoutStoreEnum.LAYERS, false)
}
const changeLayerType = (key: LayerModeEnum) => {
    chartLayoutStore.setItem(ChartLayoutStoreEnum.LAYER_TYPE, key)
}


const layerModeList = [
    { label: '缩略图', icon: LaptopOutline, value: LayerModeEnum.THUMBNAIL },
    { label: '文本列表', icon: List, value: LayerModeEnum.TEXT }
]
</script>
<template>
    <ContentBox title="图层" class="get-content-layers" :class="{ scoped: !chartLayoutStore.getLayers }" :depth="2"
        @back="handleBack">
        <template #icon>
            <n-icon size="16" :depth="2">
                <Layers></Layers>
            </n-icon>
        </template>
        <template #top-right>
            <n-button-group style="display: flex">
                <n-button v-for="(item) in layerModeList" :key="item.value" ghost size="small"
                    :type="layerMode === item.value ? 'primary' : 'tertiary'" @click="changeLayerType(item.value)">
                    <n-tooltip :show-arrow="false" trigger="hover">
                        <template #trigger>
                            <n-icon size="14" :component="item.icon"></n-icon>
                        </template>
                        {{ item.label }}
                    </n-tooltip>
                </n-button>
            </n-button-group>
        </template>

        <!-- 图层内容 -->
        <n-flex justify="center">
            <n-text class="not-layer-text">暂无图层~</n-text>
        </n-flex>
    </ContentBox>
</template>
<style lang='scss' scoped>
$wight: 200px;

@include get(content-layers) {
    width: $wight;
    overflow: hidden;
    transition: all 0.4s;

    &.scoped {
        width: 0px;
    }

    .not-layer-text {
        position: relative;
        top: 10px;
        white-space: nowrap;
        opacity: 0.4;
    }

}
</style>