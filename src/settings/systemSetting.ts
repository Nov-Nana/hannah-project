import { LanguageEnum } from "@/enums/styleEnum"

/**
 * 用户配置
 */
export const systemSetting = {
    isCollapsed: true, // 是否折叠，默认是
    lang: LanguageEnum.ZH
}

// 侧边栏折叠后的宽度，支持全部折叠会覆盖为0
export const asideCollapsedWidth = 60

// 侧边栏宽度
export const asideWidth = '270'