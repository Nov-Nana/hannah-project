import { StorageEnum } from "@/enums/storageEnum";
import { routesSetting } from "@/settings/menuSetting";
import { getLocalStorage } from "@/utils";
import { defineStore } from "pinia";

const storageConfig = getLocalStorage(StorageEnum.STORAGE_ROUTES)
export const configStore = defineStore('configStore',{
    state: () => storageConfig || routesSetting
})