import { defineStore } from "pinia";
import { ChartEditStoreType, TargetChartType, EditCanvasType,EditCanvasConfigType } from "./chartEditStore.d";
// import { useChartHistoryStore } from "../chartHistoryStore";
import { HistoryItemType } from "../chartHistoryStore/chartHistoryStore";
import { CreateComponentType, CreateComponentGroupType } from "@/packages/index.d";

// const chartHistoryStore = useChartHistoryStore()
export const useChartEditStore = defineStore("useChartEditStore", {
    state: (): ChartEditStoreType => ({
        // 编辑画布属性
        editCanvas: {
            // 编辑区域 Dom
            editLayoutDom: null,
            editContentDom: null,
            // 偏移量
            offset: 20,
            // 系统控制缩放
            scale: 1,
            // 用户控制的缩放
            userScale: 1,
            // 锁定缩放
            lockScale: false,
            // 初始化
            isCreate: false,
            // 拖拽中
            isDrag: false,
            // 框选中
            isSelect: false,
            // 代码编辑中
            isCodeEdit: false
        },
        // 画布配置属性
        editCanvasConfig: {
            projectName: undefined,
            width: 1920, // 默认画布宽度
            height: 1080, // 默认画布高度
        },
        // 操作目标图表
        targetChart: {
            hoverId: undefined,
            selectId: []
        },
        // 图表数组
        componentList: []
    }),
    getters: {
        getTargetChart(): TargetChartType {
            return this.targetChart
        },
        getComponentList(): Array<CreateComponentType | CreateComponentGroupType> {
            return this.componentList
        },
        getEditCanvas(): EditCanvasType {
            return this.editCanvas
        },
        getEditCanvasConfig(): EditCanvasConfigType {
            return this.editCanvasConfig
        }
    },
    actions: {
        fetchTargetIndex(id?: string): number {
            const targetId = id || (this.getTargetChart.selectId.length && this.getTargetChart.selectId[0]) || undefined
            if (!targetId) {
                return -1
            }
            const targetIndex = this.getComponentList.findIndex(item => item.id === targetId)

            if (targetIndex !== -1) {
                return targetIndex
            } else {
                const length = this.getComponentList.length
                for (let i = 0; i < length; i++) {
                    if (this.getComponentList[i].isGroup) {
                        for (const cItem of (this.getComponentList[i] as CreateComponentGroupType).groupList) {
                            if (cItem.id === targetId)
                                return i
                        }
                    }
                }
            }
            return -1
        },
        // 撤回
        setBack() {
            console.log('前进');
        },
        setForward() {
            console.log('前进');
        },
        // 撤回/前进 目标处理
        setBackAndSetForWard(HistoryItem: HistoryItemType, isForward = false) {
            console.log(HistoryItem, isForward);
        }
    }
})