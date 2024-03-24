import CryptoJS from 'crypto-js'
import { isString } from './type'

const KEY = 'hannah'

/**
 * 加密
 * @param data 
 * @returns 
 */
export const cryptoEncode = (data: string): string => {
    if (!isString(data)) return ''
    const encrytedData = CryptoJS.AES.encrypt(data, KEY, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    }).toString()
    return encrytedData
}

export const cryptoDecode = (data: string): string => {
    if (!isString(data)) return ''
    const decryptedData = CryptoJS.AES.decrypt(data, KEY, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7

    }).toString(CryptoJS.enc.Utf8)
    return decryptedData
}