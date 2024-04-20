import { ConfigType, ChartFrameEnum } from "@/packages/index.d";

export const LineGradientsConfig: ConfigType = {
    key: 'LineGradients',
    chartKey: 'VLineGradients',
    conKey: 'VCLineGradients',
    title: '双折线渐变面积图',
    category: 'Lines',
    categoryName: '折线图',
    package: 'Charts',
    chartFrame: ChartFrameEnum.ECHARTS,
    image: 'line_gradient.png'
}