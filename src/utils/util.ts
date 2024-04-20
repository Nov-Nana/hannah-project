import { excludeParseEventKeyList, excludeParseEventValueList } from '@/enums/eventEnum'
import { NIcon } from 'naive-ui'
import { AsyncComponentLoader, defineAsyncComponent, h } from 'vue'
import ResizeObserver from 'resize-observer-polyfill';
import screenfull from 'screenfull';
import Loading from '@/components/ChartHome/Loading.vue'

/**
 * JSON 序列化，支持函数和 undefined
 * @param data 
 * @returns 
 */
export const JSONStringify = <T>(data: T) => {
    // 使用JSON.stringify()方法将数据转换为JSON字符串
    return JSON.stringify(
        data,
        (_key, value) => {
            // 如果value的类型为function，则返回函数的字符串形式
            if (typeof value === 'function') {
                return `${value}`
            }
            // 如果value的类型为undefined，则返回null
            if (typeof value === 'undefined') {
                return null
            }
            // 否则返回value
            return value
        },
        // 设置缩进
        2
    )
}

export const JSONParse = (data: string) => {
    // 使用JSON.parse()方法解析JSON字符串，并传入一个回调函数
    return JSON.parse(data, (k, v) => {

        // 过滤函数字符串
        if (excludeParseEventKeyList.includes(k)) return v

        // 过滤函数值表达式
        if (typeof v === 'string') {
            const someValue = excludeParseEventValueList.some(excludeValue => v.indexOf(excludeValue) > -1)
            if (someValue) return v
        }

        // 还原函数值
        if (typeof v === 'string' && v.indexOf && (v.indexOf('function') > -1 || v.indexOf('=>') > -1)) {
            return evalFn(`(function(){return ${v}})()`)
        } else if (typeof v === 'string' && v.indexOf && v.indexOf('return ') > -1) {
            const baseLeftIndex = v.indexOf('(')
            if (baseLeftIndex > -1) {
                const newFn = `function ${v.substring(baseLeftIndex)}`
                return evalFn(`(function(){return ${newFn}})()`)
            }
        }
        return v

    })
}

// 将字符串转为函数
export const evalFn = (fn: string) => {
    var Fun = Function
    return new Fun('return ' + fn)
}

/**
 * render 图标
 * @param icon 图标
 * @param set 属性
 * @returns 
 */
export const renderIcon = (icon: any, set = {}) => {
    return () => h(NIcon, set, { default: () => h(icon) })
}

/**
 * render 语言
 * @param lang 要国际化的字段
 * @param set 属性
 * @param tag 要渲染成的标签
 */
export const renderLang = (lang: string, set = {}, tag = 'span') => {
    return () => h(tag, set, { default: () => window['$t'](lang) })
}

/**
 * 图标尺寸重加载
 * @param chart 
 */
export const resize = (chart: any) => {
    const observer = new ResizeObserver(() => {
        chart.resize();
    });
    let baseChart = document.getElementById('baseChart')

    if (baseChart) {
        chart && observer.observe(baseChart);
    } else {
        console.error('找不到 baseChart')
    }
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time: any, cFormat?: string) {
    if (arguments.length === 0 || !time) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string')) {
            if ((/^[0-9]+$/.test(time))) {
                // support "1548221490638"
                time = parseInt(time)
            } else {
                // support safari
                // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
                time = time.replace(new RegExp(/-/gm), '/')
            }
        }

        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{([ymdhisa])+}/g, (_, key: 'a' | 'y' | 'd' | 'h' | 'i' | 's' | 'm') => {
        const value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
        return value.toString().padStart(2, '0')
    })
    return time_str
}

/**
 * * 全屏操作函数
 * @param isFullscreen
 * @param isEnabled
 * @returns
 */
export const handleScreenFull = (isFullscreen?: boolean) => {
    // 是否是全屏
    if (isFullscreen) return screenfull.isFullscreen

    if (screenfull.isEnabled) {
        screenfull.toggle()
        return true
    }
    window['$message'].warning('您的浏览器不支持全屏功能！')
}

/**
 * * 生成一个不重复的ID
 * @param { Number } randomLength
 */
export const getUUID = (randomLength = 10) => {
    return Number(Math.random().toString().substring(2, randomLength) + Date.now()).toString(36)
}

// 生成当前时间格式为 yyyy-mm-dd hh:mm:ss
export const getNowFormatDate = () => {
    const date = new Date()
    const seperator1 = '-'
    const seperator2 = ':'
    let month: string | number = date.getMonth() + 1
    let strDate: string | number = date.getDate()
    if (month >= 1 && month <= 9) {
        month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
    }
    const currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + ' ' + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds()
    return currentdate
}

/**
 * 加载异步组件
 * @param loader 异步组件加载
 * @returns 
 */
export const loadAsyncComponent = (loader: AsyncComponentLoader<any>) =>
    defineAsyncComponent({
        loader,
        loadingComponent: Loading,
        delay: 20,
    })

/**
 * 从url中获取获取参数
 * @returns id
 */
export const getRouteParams = () => {
    return document.location.hash.split('?')[0].split('/').pop() || ''
}

export const setTitle = (title?: string) =>{
    title && (document.title = title)
}