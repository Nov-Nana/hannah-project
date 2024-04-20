
export enum ChartFrameEnum {
    // 支持 dataset 的 echarts 框架
    ECHARTS = 'echarts',
    // UI 组件框架
    NAIVE_UI = 'naiveUI',
    // 自定义带数据组件
    COMMON = 'common',
    // 无数据变更
    STATIC = 'static'
  }

// 组件配置
export type ConfigType = {
    // 组件 key
    key: string
    // 画布组件 key
    chartKey: string
    // 右侧设置面板组件 key
    conKey: string
    // 标题
    title: string
    // 分类
    category: string
    // 分类名称
    categoryName: string
    // 所属包
    package: string
    // 归类
    chartFrame?: ChartFrameEnum
    // 预览图
    image: string
    // 从指定路径创建创建该组件
    redirectComponent?: string
    // 组件预设的 dataset 值(图片/图标)
    dataset?: any
    // 禁用 拖拽或双击生成组件
    disabled?: boolean
    // 图标
    icon?: string
    // 事件
    configEvents?: { [T: string]: Function }
}

// 组件实例类
export interface PublicConfigType {
  id: string,
  isGroup: boolean,
  attr: {x:number; y:number; w:number;h:number;zIndex:number;offsetX: number;offsetY: number},
  style: {},
}

export interface CreateComponentType extends PublicConfigType {
key: string,
chartConfig: ConfigType,
groupList?: Array<CreateComponentType>
}
export interface CreateComponentGroupType extends CreateComponentType {
  groupList: Array<CreateComponentType>
}