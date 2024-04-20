import {ConfigType,ChartFrameEnum} from '@/packages/index.d'

export const BarLineConfig:ConfigType = {
    key: 'BarLine',
    chartKey: 'VBarLine',
    conKey: 'VCBarLine',
    title: '柱状图 & 折线图',
    category: 'Bars',
    categoryName: '柱状图',
    package: 'Charts',
    chartFrame: ChartFrameEnum.ECHARTS,
    image: 'bar_line.png'
}