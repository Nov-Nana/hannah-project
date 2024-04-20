import { ConfigType, ChartFrameEnum } from "@/packages/index.d";

export const LineGradientSingleConfig: ConfigType = {
    key: 'LineGradientSingle',
  chartKey: 'VLineGradientSingle',
  conKey: 'VCLineGradientSingle',
  title: '单折线渐变面积图',
    category: 'Lines',
    categoryName: '折线图',
    package: 'Charts',
    chartFrame: ChartFrameEnum.ECHARTS,
    image: 'line_gradient_single.png'
}