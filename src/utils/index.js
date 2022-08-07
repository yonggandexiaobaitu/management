class Utils{
  /**
   * 判断是否是对象类型
   * @param {} value 输入的值
   * @returns 
   */
  static isObject(value) {
    let ObjectTypes = ['Array', 'Function', 'Object', 'Set', 'Map'];
    return ObjectTypes.includes(Object.prototype.toString.call(value).slice(8, -1))
  }

}
export default  Utils;