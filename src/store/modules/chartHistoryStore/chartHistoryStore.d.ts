
// 历史栈
export enum HistoryStackEnum {
    BACK_STACK = 'backStack',
    FORWARD_STACK = 'forwardStack'
}

// 历史记录项
export enum HistoryStackItemEnum {
    ID = 'id',
    TARGET_TYPE = 'targetType',
    ACTION_TYPE = 'actionType',
    HISTORY_DATA = 'historyData'
  }
// 历史记录项类型
export interface HistoryItemType {
    // 会有同时操作多个组件场景
    [HistoryStackItemEnum.ID]: string
    [HistoryStackItemEnum.TARGET_TYPE]: HistoryTargetTypeEnum
    [HistoryStackItemEnum.ACTION_TYPE]: HistoryActionTypeEnum
    [HistoryStackItemEnum.HISTORY_DATA]: CreateComponentType[] | CreateComponentGroupType[] | EditCanvasType[]
  }

export interface ChartHistoryStoreType {
    [HistoryStackEnum.BACK_STACK]: Array<HistoryItemType>
    [HistoryStackEnum.FORWARD_STACK]: Array<HistoryItemType>
}