import { CreateComponentType, CreateComponentGroupType } from '@/packages/index.d'


// 编辑画布属性
export enum EditCanvasTypeEnum {
    EDIT_LAYOUT_DOM = 'editLayoutDom',
    EDIT_CONTENT_DOM = 'editContentDom',
    OFFSET = 'offset',
    SCALE = 'scale',
    USER_SCALE = 'userScale',
    LOCK_SCALE = 'lockScale',
    IS_CREATE = 'isCreate',
    IS_DRAG = 'isDrag',
    IS_SELECT = 'isSelect',
    IS_CODE_EDIT = 'isCodeEdit',
}
export type EditCanvasType = {
    // 编辑区域DOM
    [EditCanvasTypeEnum.EDIT_LAYOUT_DOM]: HTMLElement | null,
    // 编辑内容区域DOM
    [EditCanvasTypeEnum.EDIT_CONTENT_DOM]: HTMLElement | null,
    // 画布偏移量
    [EditCanvasTypeEnum.OFFSET]: number,
    // 画布缩放比例
    [EditCanvasTypeEnum.SCALE]: number,
    // 用户缩放比例
    [EditCanvasTypeEnum.USER_SCALE]: number,
    // 是否锁定缩放
    [EditCanvasTypeEnum.LOCK_SCALE]: boolean,
    // 是否初始化创建
    [EditCanvasTypeEnum.IS_CREATE]: boolean,
    // 是否拖拽中
    [EditCanvasTypeEnum.IS_DRAG]: boolean,
    // 是否框选中
    [EditCanvasTypeEnum.IS_SELECT]: boolean,
    // 是否是代码编辑模式
    [EditCanvasTypeEnum.IS_CODE_EDIT]: boolean,
}
// 画布配置属性
export enum EditCanvasConfigEnum {
    PROJECT_NAME = 'projectName',
    WIDTH = 'width',
    HEIGHT = 'height',
    CHART_THEME_COLOR = 'chartThemeColor',
    CHART_CUSTOM_THEME_COLOR_INFO = 'chartCustomThemeColorInfo',
    CHART_THEME_SETTING = 'chartThemeSetting',
    BACKGROUND = 'background',
    BACKGROUND_IMAGE = 'backgroundImage',
    SELECT_COLOR = 'selectColor',
    PREVIEW_SCALE_TYPE = 'previewScaleType'
}
export interface EditCanvasConfigType {
    // 大屏名称
    [EditCanvasConfigEnum.PROJECT_NAME]: string
    // 大屏宽度
    [EditCanvasConfigEnum.WIDTH]: number
    // 大屏高度
    [EditCanvasConfigEnum.HEIGHT]: number
    // 背景色
    [EditCanvasConfigEnum.BACKGROUND]?: string
    // 背景图片
    [EditCanvasConfigEnum.BACKGROUND_IMAGE]?: string | null

    // 图表全局配置
    // [EditCanvasConfigEnum.CHART_THEME_SETTING]: GlobalThemeJsonType
    // 图表主题颜色
    // [EditCanvasConfigEnum.SELECT_COLOR]: boolean
    // 预览展示方式
    // [EditCanvasConfigEnum.PREVIEW_SCALE_TYPE]: PreviewScaleEnum

}

// 操作目标
export type TargetChartType = {
    hoverId?: string,
    selectId: string[]
}

// Store 枚举
export enum ChartEditStoreEnum {
    EDIT_RANGE = 'editRange',
    EDIT_CANVAS = 'editCanvas',
    RIGHT_MENU_SHOW = 'rightMenuShow',
    MOUSE_POSITION = 'mousePosition',
    TARGET_CHART = 'targetChart',
    RECORD_CHART = 'recordChart',
    // 以下需要存储
    EDIT_CANVAS_CONFIG = 'editCanvasConfig',
    REQUEST_GLOBAL_CONFIG = 'requestGlobalConfig',
    COMPONENT_LIST = 'componentList'
}

export interface ChartEditStoreType {
    // 画布属性
    [ChartEditStoreEnum.EDIT_CANVAS]: EditCanvasType,
    // 画布配置
    [ChartEditStoreEnum.EDIT_CANVAS_CONFIG]: EditCanvas,
    // 目标元素
    [ChartEditStoreEnum.TARGET_CHART]: TargetChartType,
    // 组件列表
    [ChartEditStoreEnum.COMPONENT_LIST]: Array<CreateComponentType | CreateComponentGroupType>,

}