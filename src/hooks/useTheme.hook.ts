import { useDesignStore } from "@/store/modules/designStore/designStore"
import { GlobalThemeOverrides, darkTheme } from "naive-ui"
import { computed, toRefs } from "vue"
import { lighten, alpha } from '@/utils'
import {borderRadius} from '@/settings/designSetting'


/**
 * 返回暗黑主题
 */
export const useDarkThemeHook = () => {
    const designStore = useDesignStore()
    return computed(() => (designStore.getDarkTheme ? darkTheme : undefined))
}

/**
 * 设置全局主题
 */
export const useThemeOverridesHook = () => {
    const designStore = useDesignStore()
    const { getApptheme } = toRefs(designStore)
    const darkTheme = computed((): GlobalThemeOverrides => {
        // 通用
        const commonObj = {
            common: {
                primaryColor: getApptheme.value,
                primaryColorHover: lighten(alpha(getApptheme.value), 0.1),
                primaryColorPressed: lighten(alpha(getApptheme.value), 0.1),
                primaryColorSuppl: getApptheme.value,
                borderRadius
            }
        }
        // 亮色主题
        const lightObj = {
            common: {
                ...commonObj.common
            }
        }
        // 暗色主题
        const darkObj = {
            common: {
                ...commonObj.common
            },
            loadingBar: {
                colorLoading: getApptheme.value,
            }
        }
        return designStore.getDarkTheme ? darkObj : lightObj
    })
    return darkTheme
}