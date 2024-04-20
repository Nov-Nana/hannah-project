import {ConfigType,ChartFrameEnum} from '@/packages/index.d'

export const CapsuleChartConfig:ConfigType = {
    key: 'CapsuleChart',
    chartKey: 'VCapsuleChart',
    conKey: 'VCCapsuleChart',
    title: '胶囊柱图',
    category: 'Bars',
    categoryName: '柱状图',
    package: 'Charts',
    chartFrame: ChartFrameEnum.ECHARTS,
    image: 'capsule.png'
}