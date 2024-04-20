import { StorageEnum } from "@/enums/storageEnum"
import { getLocalStorage, clearLocalStorage } from "."
import { cryptoDecode } from "./crypto"
import { router } from '@/router'
import { PageEnum } from "@/enums/pageEnum"

/**
 * 判断是否登录
 * @returns boolean
 */
export const loginCheck = () => {
    try {
        const userInfo = getLocalStorage(StorageEnum.STORAGE_USER_INFO)
        if (!userInfo) return false
        const decodeInfo = cryptoDecode(userInfo)
        if (decodeInfo) {
            return true
        }
        return false
    } catch (e) {
        return false
    }
}

/**
 * 根据名字获取路由信息
 * @param pageName 路由名字
 * @param param 路由参数
 * @returns 
 */
export const getPathByName = (pageName: string, param?: string) => {
    try {
        // 获取路由信息
        const pathData = router.resolve({ name: pageName })
        return param ? (pathData as any)[param] : pathData
    } catch (e) {
        console.log('查询路由信息失败')
    }
}

/**
 * 打开新页面
 * @param path 路径
 * @returns 
 */
export const openNewWindow = (path: string) => {
    return window.open(path, '_blank')
}

/**
 * 根据名字跳转路由
 * @param pageName 路由名字
 * @param isReplace 是否替换路由
 * @param windowOpen 是否打开新页面
 * @returns 
 */
export const routerByName = (pageName: string, isReplace?: boolean, windowOpen?: boolean) => {
    if (windowOpen) {
        const path = getPathByName(pageName)
        if (path) openNewWindow(path)
        return
    }
    if (isReplace) {
        router.replace({ name: pageName })
        return
    }
    router.push({ name: pageName })
}
/**
 * 根据路径跳转路由
 * @param path 路由路径
 * @param isReplace 是否替换路由
 * @param windowOpen 是否打开新页面
 * @param query 参数
 * @returns 
 */
export const routerByPath = (path: string, query?: Array<string | number>, isReplace?: boolean, windowOpen?: boolean) => {
    let fullPath = ''
    if (query?.length) {
        fullPath = `${path}/${query.join('/')}`
    }
    if (windowOpen) {
        return openNewWindow(fullPath)
    }
    if (isReplace) {
        router.replace({ path: fullPath })
        return
    }
    router.push({ path: fullPath })
}

/**
 * 退出登录
 */
export const logout = () => {
    clearLocalStorage(StorageEnum.STORAGE_USER_INFO)
    routerByName(PageEnum.BASE_LOGIN_NAME)
}