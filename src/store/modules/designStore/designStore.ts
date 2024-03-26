import { defineStore } from "pinia";
import { DesignStateType, AppThemeColorType } from './designStore.d'
import { theme, lang } from '@/settings/designSetting'
import { ThemeEnum, LanguageEnum } from "@/enums/styleEnum";
import { StorageEnum } from "@/enums/storageEnum";
import { getLocalStorage, setLocalStorage } from '@/utils'

const { darkTheme, appTheme, appThemeDetail } = theme
const { STORAGE_DESIGN } = StorageEnum

const storageDesign = getLocalStorage(STORAGE_DESIGN)


export const useDesignStore = defineStore('design', {
    state: (): DesignStateType => storageDesign || ({
        darkTheme,
        themeName: darkTheme ? ThemeEnum.DARK : ThemeEnum.LIGHT,
        appTheme,
        appThemeDetail,
        lang
    }),
    getters: {
        getDarkTheme(): boolean {
            return this.darkTheme
        },
        getApptheme(): string {
            return this.appTheme
        },
        getAppThemeDetail(): AppThemeColorType | null {
            return this.appThemeDetail
        },
        getLang(): LanguageEnum {
            return this.lang
        }
    },
    actions: {
        // 切换主题
        changeTheme(): void {
            this.darkTheme = !this.darkTheme
            this.themeName = this.darkTheme ? ThemeEnum.DARK : ThemeEnum.LIGHT
            setLocalStorage(STORAGE_DESIGN, this.$state)
        },
        // 设置颜色
        setAppColor(color: AppThemeColorType): void {
            this.appTheme = color.hex
            this.appThemeDetail = color
            setLocalStorage(STORAGE_DESIGN, this.$state)
        },
        // 设置语言
        setLang(lang: LanguageEnum): void {
            if (this.lang === lang) return
            this.lang = lang
            setLocalStorage(STORAGE_DESIGN, this.$state)
        }

    }
})