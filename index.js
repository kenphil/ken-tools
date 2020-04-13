(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? 
  module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) : (global.Qarticles = factory())

})(this, function () {
  class Util {
    // 相同引用的对象可以去重
    uniq1(array) {
      return Array.from(new Set(array))
    }

    // 相同引用的对象可以去重
    uniq2(array) {
      return [...new Set(array)]
    }

    // 对象无法去重
    uniq3(array) {
      let result = []
      let obj = {}

      for (let i of array) {
        if (!obj[i]) {
          result.push(i)
          obj[i] = 1
        }
      }

      return result
    }

    // assign是浅拷贝
    simpleCopy(obj) {
      let temp = Array.isArray(obj) ? [] : {}

      for (let i in obj) {
        temp[i] = obj[i]
      }

      return temp
    }

    deepCopy(obj) {
      let _this = this

      let temp = Array.isArray(obj) ? [] : {}

      if (obj && typeof obj === 'object') {
        for (let i in obj) {
          if (obj.hasOwnProperty(i)) {
            // 如果子属性为引用数据类型，递归复制
            if (obj[i] && typeof obj[i] === 'object') {
              temp[i] = _this.deepCopy(obj[i])
            } else {
              // 如果是基本数据类型，只是简单的复制
              temp[i] = obj[i]
            }
          }
        }
      }

      return temp
    }

    /**
     * 防抖
     * 非立即执行版
     * 触发事件后函数不会立即执行，而是在 n 秒后执行，如果在 n 秒内又触发了事件，则会重新计算函数执行时间
     */
    debounceWait(func, wait) {
      let timeout

      return function () {
        let context = this
        let args = arguments

        if (timeout) clearTimeout(timeout)

        timeout = setTimeout(() => {
          func.apply(context, args)
        }, wait);
      }
    }

    /**
     * 防抖
     * 立即执行版
     * 触发事件后函数会立即执行，然后 n 秒内不触发事件才能继续执行函数的效果
     */
    debounceNoWait(func, wait) {
      let timeout

      return function () {
        let context = this
        let args = arguments

        if (timeout) clearTimeout(timeout)

        let callNow = !timeout
        timeout = setTimeout(() => {
          timeout = null;
        }, wait)

        if (callNow) func.apply(context, args)
      }
    }

    /**
     * @desc 函数防抖
     * @param func 函数
     * @param wait 延迟执行毫秒数
     * @param immediate true 表立即执行，false 表非立即执行
     */
    debounce(func, wait, immediate) {
      let timeout

      return function () {
        let context = this
        let args = arguments

        if (timeout) clearTimeout(timeout)

        if (immediate) {
          let callNow = !timeout

          timeout = setTimeout(() => {
            timeout = null;
          }, wait)

          if (callNow) func.apply(context, args)
        } else {
          timeout = setTimeout(function () {
            func.apply(context, args)
          }, wait)
        }
      }
    }

    /**
     * 节流，连续触发事件但是在 n 秒中只执行一次函数
     * 时间戳版
     * 在持续触发事件的过程中，函数会立即执行，并且每 wait 秒执行一次
     */
    throttleBefore(func, wait) {
      let previous = 0

      return function () {
        let now = Date.now()
        let context = this
        let args = arguments

        if (now - previous > wait) {
          func.apply(context, args)
          previous = now
        }
      }
    }

    /**
     * 节流，连续触发事件但是在 n 秒中只执行一次函数
     * 定时器版
     * 在持续触发事件的过程中，函数不会立即执行，并且每 wait 秒执行一次，在停止触发事件后，函数还会再执行一次
     */
    throttleAfter(func, wait) {
      let timeout

      return function () {
        let context = this
        let args = arguments

        if (!timeout) {
          timeout = setTimeout(() => {
            timeout = null
            func.apply(context, args)
          }, wait)
        }
      }
    }

    /**
     * @desc 函数节流
     * @param func 函数
     * @param wait 延迟执行毫秒数
     * @param type 1 表时间戳版，2 表定时器版
     */
    throttle(func, wait, type) {
      let previous =0
      let timeout
      
      return function () {
        let context = this;
        let args = arguments;
        if (type === 1) {
          let now = Date.now();

          if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
          }
        } else if (type === 2) {
          if (!timeout) {
            timeout = setTimeout(() => {
              timeout = null;
              func.apply(context, args)
            }, wait)
          }
        }
      }
    }
  }

  return Util
})