import { JSONStringify, JSONParse } from "@/utils"
/**
 * 存储本地会话数据
 * @param k 键名
 * @param v 键值
 * @returns 
 */
export const setLocalStorage = <T>(k: string, v: T) => {
    try {
        window.localStorage.setItem(k, JSONStringify(v))
    } catch (e) {
        return e
    }
}

/**
 * 获取本地会话数据
 * @param k 键名
 * @returns 
 */
export const getLocalStorage = (k: string) => {
    const item = window.localStorage.getItem(k)
    try {
        return item ? JSONParse(item) : item
    } catch (e) {
        return item
    }
}

/**
 * * 清除本地会话数据
 * @param name
 */
export const clearLocalStorage = (name: string) => {
    window.localStorage.removeItem(name)
}

/**
 * * 存储临时会话数据
 * @param k 键名
 * @param v 键值
 * @returns RemovableRef
 */
export const setSessionStorage = <T>(k: string, v: T) => {
    try {
        window.sessionStorage.setItem(k, JSONStringify(v))
    } catch (e) {
        return false
    }
}

/**
 * * 获取临时会话数据
 * @returns any
 */
export const getSessionStorage = (k: string) => {
    const item = window.sessionStorage.getItem(k)
    try {
        return item ? JSONParse(item) : item
    } catch (e) {
        return item
    }
}

/**
 * 清除本地会话数据
 * @param name
 */
export const clearSessionStorage = (name: string) => {
    window.sessionStorage.removeItem(name)
}