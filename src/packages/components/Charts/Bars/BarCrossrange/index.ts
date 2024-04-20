import {ConfigType,ChartFrameEnum} from '@/packages/index.d'

export const BarCrossrangeConfig: ConfigType= {
    key: 'BarCrossrange',
  chartKey: 'VBarCrossrange',
  conKey: 'VCBarCrossrange',
  title: '横向柱状图',
  category: 'Bars',
  categoryName: '柱状图',
  package: 'Charts',
  chartFrame: ChartFrameEnum.ECHARTS,
  image: 'bar_y.png'
}