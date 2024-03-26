import {SettingStoreEnums} from '@/enums/settingEnum'
/**
 * 用户配置
 */
export const systemSetting = {
    [SettingStoreEnums.ASIDE_ALL_COLLAPSED]: true,
    lang: 'zh'
}

// 侧边栏折叠后的宽度，支持全部折叠会覆盖为0
export const asideCollapsedWidth = 60

// 侧边栏宽度
export const asideWidth = '270'