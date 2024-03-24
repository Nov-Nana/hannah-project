import Color from 'color'
import {useDesignStore} from '@/store/modules/designStore/designStore'

/**
 * 颜色变亮
 * hsl(100, 50%, 10%) -> hsl(100, 50%, 50%)
 * @param color 颜色
 * @param concentration 0-1 浓度
 * @returns
 */
export function lighten(color: string, concentration: number) {
    return Color(color).lighten(concentration).toString()
}

/**
 * 颜色变暗
 *  hsl(100, 50%, 50%)-> hsl(100, 50%, 10%) 
 * @param color 颜色
 * @param concentration 0-1 浓度
 * @returns
 */
export function darkekn(color: string, concentration: number) {
    return Color(color).darken(concentration).toString()
}

/**
 * hsla 转换
 * @param color 颜色
 * @param alpha 默认 = 1
 * @returns
 */
export function alpha(color: string, alpha = 1) {
    return Color(color).alpha(alpha).toString()
}

export const setHTMLTheme = (themeName?: string) =>{
    const e = window.document.documentElement
    if(themeName){
        e.setAttribute('data-theme', themeName)
        return
    }
    const designStore = useDesignStore()
    e.setAttribute('data-theme', designStore.themeName)
}