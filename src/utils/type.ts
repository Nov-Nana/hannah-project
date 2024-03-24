export function isObject(value: any): value is Record<any, any> {
    const type = typeof value
    return value != null && (type === 'object' || type === 'function')
}
export function isString(value: any): value is string {
    return typeof value === 'string';
}
export function isNumber(value: any): value is number {
    return typeof value === 'number';
}
export function isBoolean(value: any): value is boolean {
    return typeof value === 'boolean';
}
export function isUndefined(value: any): value is undefined {
    return typeof value === 'undefined';
}
export function isNull(value: any): value is null {
    return value === null;
}
export function isArray(value: any): value is any[] {
    return Array.isArray(value);
}
export const toNumber = (number: number | string, toFixedNumber = 2) => {
    return isString(number) ? parseFloat(parseFloat(number).toFixed(toFixedNumber)) : number.toFixed(toFixedNumber);
}
export const toString = (str: string) => {
    return isNumber(str) ? `${str}` : (isObject(str) ? JSON.stringify(str) : str)
}