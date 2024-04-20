import { ConfigType,ChartFrameEnum } from "@/packages/index.d";

export const LineCommonConfig: ConfigType = {
    key: 'LineCommon',
  chartKey: 'VLineCommon',
  conKey: 'VCLineCommon',
  title: '折线图',
  category: 'Lines',
  categoryName: '折线图',
  package: 'Charts',
  chartFrame: ChartFrameEnum.ECHARTS,
  image: 'line.png'
}