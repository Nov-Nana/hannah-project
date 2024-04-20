import { ConfigType, ChartFrameEnum } from "@/packages/index.d";

export const LineLinearSingleConfig: ConfigType = {
    key: 'LineLinearSingle',
  chartKey: 'VLineLinearSingle',
  conKey: 'VCLineLinearSingle',
  title: '单折线渐变图',
    category: 'Lines',
    categoryName: '折线图',
    package: 'Charts',
    chartFrame: ChartFrameEnum.ECHARTS,
    image: 'line_linear_single.png'
}