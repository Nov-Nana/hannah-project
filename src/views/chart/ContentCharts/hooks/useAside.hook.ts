import { ChartList } from "@/packages/components/Charts"
import { TableList } from "@/packages/components/Tables"
import { ConfigType } from '@/packages/index.d'
import { icon } from "@/plugins"
import { useChartLayoutStore } from "@/store/modules/chartLayoutStore"
import { ChartLayoutStoreEnum } from "@/store/modules/chartLayoutStore/chartLayoutStore.d"
import { renderIcon, renderLang } from "@/utils"
import { ref } from "vue"

// 图表
export type MenuOptionsType = {
  key: string
  icon: ReturnType<typeof renderIcon>
  label: ReturnType<typeof renderLang>
  list: ConfigType[]
}


// 包分类枚举
export enum PackagesCategoryEnum {
  CHARTS = 'Charts',
  TABLES = 'Tables',
  INFORMATIONS = 'Informations',
  PHOTOS = 'Photos',
  ICONS = 'Icons',
  DECORATES = 'Decorates'
}
// 包分类
export type PackagesType = {
  [T in PackagesCategoryEnum]: ConfigType[]
}
//所有图表
export let packagesList: PackagesType = {
  [PackagesCategoryEnum.CHARTS]: ChartList,
  [PackagesCategoryEnum.TABLES]: TableList,
  [PackagesCategoryEnum.INFORMATIONS]: [],
  [PackagesCategoryEnum.PHOTOS]: [],
  [PackagesCategoryEnum.ICONS]: [],
  [PackagesCategoryEnum.DECORATES]: []
}


// 图标

const { BarChart, DocumentText, Image, Bonfire, Cafe } = icon.ionicons5
const { TableOutlined } = icon.antd
const packagesListObj = {
  [PackagesCategoryEnum.CHARTS]: {
    icon: renderIcon(BarChart),
    label: '图表'
  },
  [PackagesCategoryEnum.TABLES]: {
    icon: renderIcon(TableOutlined),
    label: '表格'
  },
  [PackagesCategoryEnum.INFORMATIONS]: {
    icon: renderIcon(DocumentText),
    label: '信息'
  },
  [PackagesCategoryEnum.PHOTOS]: {
    icon: renderIcon(Image),
    label: '图片'
  },
  [PackagesCategoryEnum.ICONS]: {
    icon: renderIcon(Cafe),
    label: '图标'
  },
  [PackagesCategoryEnum.DECORATES]: {
    icon: renderIcon(Bonfire),
    label: '装饰'
  }
}

export const useAsideHook = () => {
  const menuOptions: MenuOptionsType[] = [] // 侧边栏菜单
  // 处理图表
  const handlePackageList = () => {
    for (const val in packagesList) {
      menuOptions.push({
        key: val,
        //@ts-ignore
        icon: packagesListObj[val].icon,
        //@ts-ignore
        label: packagesListObj[val].label,
        //@ts-ignore
        list: packagesList[val]
      })
    }
  }
  handlePackageList()

  const selectOptions = ref(menuOptions[0]) // 当前选中菜单
  const selectValue = ref<string>(menuOptions[0]['key']) // 当前选中菜单的key
  let beforeSelect: string = menuOptions[0]['key'] // 当前选中菜单的key
  const chartLayoutStore = useChartLayoutStore()
  // 点击图表Item
  const handkeClickItem = (key: string, item: any) => {
    selectOptions.value = item
    if (beforeSelect === key) {
      // 折叠 / 展开
      chartLayoutStore.setItem(ChartLayoutStoreEnum.CHARTS, !chartLayoutStore.getCharts, false)
    } else {
      // 展开
      chartLayoutStore.setItem(ChartLayoutStoreEnum.CHARTS, true, false)
    }
    beforeSelect = key
  }

  
  return {
    menuOptions,
    selectOptions,
    selectValue,
    handkeClickItem
  }
}