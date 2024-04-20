import {ConfigType,ChartFrameEnum} from '@/packages/index.d'

export const BarCommonConfig: ConfigType = {
    key: 'BarCommon', // 组件 key
    chartKey: 'VBarCommon', // 画布组件 key
    conKey: 'VCBarCommon', // 右侧设置面板组件 key
    title: '柱状图', // 标题
    category: 'Bars', // 分类
    categoryName: '柱状图', // 分类名称
    package: 'Charts', // 所属包
    chartFrame: ChartFrameEnum.ECHARTS, // 归类
    image: 'bar_x.png' // 预览图
}