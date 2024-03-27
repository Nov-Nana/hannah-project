import { excludeParseEventKeyList, excludeParseEventValueList } from '@/enums/eventEnum'
import { NIcon } from 'naive-ui'
import { h } from 'vue'
import ResizeObserver from 'resize-observer-polyfill';

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

export const resize = (chart: any) => {
    const observer = new ResizeObserver(() => {
        chart.resize();
    });
    let myEcharts = document.getElementById('myEcharts')
    if (myEcharts) {
        observer.observe(myEcharts);
    } else {
        console.error('找不到 myEcharts')
    }
}
