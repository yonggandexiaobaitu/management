// 设置缓存相关
import Utils from "./index"
class CacheforLocalStorage {
  setCache (key, value) {
    //判断当前是否是对象类型，对象类型需要转字符串
    if (Utils.isObject(value)) {
      window.localStorage.setItem(key, JSON.stringify(value))
    } else {
      window.localStorage.setItem(key, value)
    }

  }
  getCache (key) {
    return window.localStorage.getItem(key)
  }
  clearCache () {
    window.localStorage.clear()
  }
  removeCache (key) {
    window.localStorage.removeItem(key)
  }

}
export default new CacheforLocalStorage();