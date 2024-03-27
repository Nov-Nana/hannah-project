import { defineStore } from 'pinia'
import { systemSetting, asideCollapsedWidth } from '@/settings/systemSetting'
import { StorageEnum } from '@/enums/storageEnum'
import { getLocalStorage, setLocalStorage } from '@/utils'
import { SettingStoreType } from './settingStore.d'

const { STORAGE_SYSTEM_SETTING } = StorageEnum
const storageSetting = getLocalStorage(STORAGE_SYSTEM_SETTING)
export const useSettingStore = defineStore('settingStore', {
    state: (): SettingStoreType => storageSetting || systemSetting,
    getters: {
        getCollapsed(): boolean {
            return this.isCollapsed
        },
        getCollapsedWidth(): number {
            return this.isCollapsed ? 0 : asideCollapsedWidth
        },
        getLang(): string {
            return this.lang
        }
    },
    actions: {
        setItem<T extends keyof SettingStoreType, K extends SettingStoreType[T]>(key: T, value: K): void {
            this.$patch(state => {
                state[key] = value
            })
            setLocalStorage(STORAGE_SYSTEM_SETTING, this.$state)
        },
        setCollapsed(value: boolean): void {
            this.isCollapsed = value
            setLocalStorage(STORAGE_SYSTEM_SETTING, this.$state)
        },
        changeLang(lang: string): void {
            if (this.lang === lang) return
            this.lang = lang
            setLocalStorage(STORAGE_SYSTEM_SETTING, this.$state)
        }
    }
})