// 注册全局方法

import isAuth from "./modulefn/isAuth.js"
const globalFns = [{
  name: '$isAuth',
  value: isAuth
}]
//判断是否有权限
export default  (app) => {
  
  globalFns.forEach(item => {
    app.config.globalProperties[`${item.name}`] = item.value;
  })
}