# ken-tools


import kt from keng-tools


const arr = kt.uniq1(array) const arr = 或者 kt.uniq2(array)
@param array 数组
相同引用的对象可以去重

const arr = kt.uniq3(array)
@param array 数组
对象无法去重

const newObj = kt.simpleCopy(obj)
@param obj 对象
浅拷贝，当然你也可以使用assign

const newObj = kt.deepCopy(obj)
@param obj 对象
深拷贝

kt.debounceWait(func, wait)
@param func 函数
@param wait 毫秒
防抖，非立即执行，触发事件后函数不会立即执行，而是在 n 秒后执行，如果在 n 秒内又触发了事件，则会重新计算函数执行时间

kt.debounceNoWait(func, wait)
@param func 函数
@param wait 毫秒
防抖，立即执行，触发事件后函数会立即执行，然后 n 秒内不触发事件才能继续执行函数的效果

kt.debounce(func, wait, immediate)
@param func 函数
@param wait 毫秒
@param immediate true 表立即执行，false 表非立即执行
防抖

kt.throttleBefore(func, wait)
@param func 函数
@param wait 秒
节流，时间戳版，在持续触发事件的过程中，函数会立即执行，并且每 wait 秒执行一次

kt.throttleAfter(func, wait)
@param func 函数
@param wait 秒
节流，定时器版，在持续触发事件的过程中，函数不会立即执行，并且每 wait 秒执行一次，在停止触发事件后，函数还会再执行一次

kt.throttle(func, wait, type)
@param func 函数
@param wait 秒
@param type 1 表时间戳版，2 表定时器版
节流

kt.detect(ua)
@param ua userAgent
检查浏览器