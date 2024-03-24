import { StorageEnum } from "@/enums/storageEnum"
import { getLocalStorage } from "."
import { cryptoDecode } from "./crypto"

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