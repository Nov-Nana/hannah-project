import { defineStore } from "pinia";
import { ChartHistoryStoreType, HistoryItemType } from "./chartHistoryStore.d";


export const useChartHistoryStore = defineStore('useChartHistoryStore', {
    state: (): ChartHistoryStoreType => ({
        // 后退栈
        backStack: [],
        // 前进栈
        forwardStack: []
    }),
    getters: {
        getBackStack(): Array<HistoryItemType> {
            return this.backStack
        },
        getForwardStack(): Array<HistoryItemType> {
            return this.forwardStack
        }

    },
    actions: {
        // 撤回
        backAction() {
            try {
                if (this.getBackStack.length > 1) {
                    const targetData = this.popBackStackItem()
                    if (!targetData) {
                        return
                    }
                    this.pushForwardStackItem(targetData)
                    return targetData
                }
            } catch (err) {
                console.log(err)
            }
        },
        // 移除后退栈
        popBackStackItem() {
            if (this.backStack.length > 0) {
                return this.backStack.pop()
            }
        },
        // 移除前进栈
        popForwardStackItem() {
            if (this.forwardStack.length > 0) {
                return this.forwardStack.pop()
            }
        },
        // 推入前进栈
        pushForwardStackItem(item: HistoryItemType) {
            if(item) {
                this.forwardStack.push(item)
            }
        },
        // 推入后退栈
        pushBackStackItem(item: HistoryItemType) {
            if(item) {
                this.backStack.push(item)
            }
        }


    }
})