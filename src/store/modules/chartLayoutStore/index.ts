import { defineStore } from "pinia";
import { ChartLayoutType, ChartModeEnum, LayerModeEnum } from "./chartLayoutStore.d";
import { getLocalStorage, setLocalStorage } from "@/utils";
import { StorageEnum } from "@/enums/storageEnum";

const { STORAGE_CHART_LAYOUT_STORE } = StorageEnum
const storageChartLayout = getLocalStorage(STORAGE_CHART_LAYOUT_STORE)
export const useChartLayoutStore = defineStore('chartLayout', {
  state: (): ChartLayoutType => ({
    // 图层控制
    layers: true,
    // 图表组件
    charts: true,
    // 详情设置（收缩为true）
    details: true,
    // 组件列表展示类型（默认单列）
    chartType: ChartModeEnum.SINGLE,
    layerType: LayerModeEnum.THUMBNAIL,
    // 是否重置画布
    rePositionCanvas: false,
    ...storageChartLayout
  }),
  getters: {
    getLayers: (state) => state.layers,
    getCharts: (state) => state.charts,
    getDetails: (state) => state.details,
    getChartType: (state): ChartModeEnum => state.chartType,
    getLayerType: (state): LayerModeEnum => state.layerType,
  },
  actions: {
    setItem<T extends keyof ChartLayoutType, K extends ChartLayoutType[T]>(
      key: T,
      value: K,
      _computedScale = true
    ): void {
      this.$patch(state => {
        state[key] = value
      })
      // 存储本地
      setLocalStorage(STORAGE_CHART_LAYOUT_STORE, this.$state)
      // 这里需要标记重置画布位置
      this.rePositionCanvas = true;
      // 重新计算拖拽区域缩放比例
      // if (computedScale) {
      //   setTimeout(() => {
      //     chartEditStore.computedScale()
      //   }, 500)
      // }
    },
  }
})