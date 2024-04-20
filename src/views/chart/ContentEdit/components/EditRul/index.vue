<script setup lang='ts'>
import { useChartEditStore } from '@/store/modules/chartEditStore';
import { useDesignStore } from '@/store/modules/designStore/designStore';
import { computed, reactive, ref } from 'vue';


const thick = 20
const startX = ref(0)
const startY = ref(0)
const lines = reactive({ h: [], v: [] })
const chartEditStore = useChartEditStore()
const scale = computed(() => {
    return chartEditStore.getEditCanvas.scale
})
// 主题
const designStore = useDesignStore()
const paletteStyle = computed(() => {
    return designStore.getDarkTheme ? {
        bgColor: '#18181c',
        longfgColor: '#4d4d4d',
        shortfgColor: '#4d4d4d',
        fontColor: '#4d4d4d',
        shadowColor: '#18181c',
        borderColor: '#18181c',
        cornerActiveColor: '#18181c'
    } : {
        bgColor: 'rgba(225,225,225, 0)',
        longfgColor: '#BABBBC',
        shortfgColor: '#C8CDD0',
        fontColor: '#7D8694',
        shadowColor: '#E8E8E8',
        lineColor: '#EB5648',
        borderColor: '#DADADC',
        cornerActiveColor: 'rgb(235, 86, 72, 0.6)',
    }
})
// 颜色
const themeColor = computed(() => {
  return designStore.getApptheme
})
// const {width} = toRefs(chartEditStore.getEditCanvasConfig)
// 计算画布大小
const canvasBox = () => {
    const layoutDom = document.getElementById('get-chart-edit-layout')
    if (layoutDom) {
        const scrollW = 20
        return {
            height: layoutDom.clientHeight - scrollW,
            width: layoutDom.clientWidth - scrollW
        }
    }
    return {
        width: chartEditStore.getEditCanvasConfig.width,
        height: chartEditStore.getEditCanvasConfig.height
    }
}
</script>
<template>
    <div class="get-sketch-rule">
        <SketchRule :thick="thick" :scale="scale" :width="canvasBox().width" :height="canvasBox().height"
            :startX="startX" :startY="startY" :lines="lines" :palette="paletteStyle">
        </SketchRule>
        <div ref="$app" class="edit-screens">
            <div ref="$container" class="edit-screen-container">
                <div ref="refSketchRuleBox" class="canvas">
                    <div>
                        <slot></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
#mb-ruler {
    top: 0;
    left: 0;
}

/* 横线 */
#mb-ruler .v-container .lines .line {
    /* 最大缩放 200% */
    width: 200vw !important;
    border-top: 1px dashed v-bind('themeColor') !important;
}

#mb-ruler .v-container .indicator {
    border-bottom: 1px dashed v-bind('themeColor') !important;
}

/* 竖线 */
#mb-ruler .h-container .lines .line {
    /* 最大缩放 200% */
    height: 200vh !important;
    border-left: 1px dashed v-bind('themeColor') !important;
}

#mb-ruler .h-container .indicator {
    border-left: 1px dashed v-bind('themeColor') !important;
}

/* 坐标数值背景颜色 */
#mb-ruler .indicator .value {
    background-color: rgba(0, 0, 0, 0);
}

/* 删除按钮 */
#mb-ruler .line .del {
    padding: 0;
    color: v-bind('themeColor');
    font-size: 26px;
    font-weight: bolder;
}

#mb-ruler .corner {
    border-width: 0 !important;
}
</style>
<style lang='scss' scoped>
@include get(sketch-rule) {
    overflow: hidden;
    width: 100%;
    height: 100%;
}
</style>