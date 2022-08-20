import { defineAsyncComponent } from "vue"

class Utils {
  /**
   * 判断是否是对象类型
   * @param {} value 输入的值
   * @returns 
   */
  static isObject (value) {
    let ObjectTypes = ['Array', 'Function', 'Object', 'Set', 'Map'];
    return ObjectTypes.includes(Object.prototype.toString.call(value).slice(8, -1))
  }
  //路由懒加载另外一种方式--推荐
  static getModules () {
    const components = import.meta.glob('../views/main/**/*.vue')
    return components
  }
  //定义异步组件可实现路由懒加载
  static loadView (view) {
    return () => defineAsyncComponent(() => import(/* @vite-ignore */`${view}`))
  }
  /**
   * 过滤掉对象指定的key，返回新的对象
   */
  static filterObjetKey (origin, key) {
    let newobj = {};
    for (const originkey in origin) {
      if (Object.hasOwnProperty.call(origin, originkey)) {
        if (key === originkey) {
          continue;
        }
        newobj[originkey] = origin[originkey]
      }
    }
    return newobj;

  }
  /**
   * 根据用户菜单转换动态路由，匹配组件和页面的映射关系
   * 注意：要用路由懒加载的时候，由于不是webpack，用不了import异步导入
   * @param {} userMenus 
   */
  static transformRoutesByuserMenus (userMenus, parentName = '') {
    return userMenus.reduce((preitem, item) => {
      let baseobj = {
        path: item.url,
        name: item.url,
        component: (() => {
          let modules = Utils.getModules();
          //根据item.url获取modules里面的
          let key = null;
          Object.keys(modules).forEach(item2 => {
            if (item2.includes(item.url)) {
              key = item2;
            }
          })
          return modules[key]
        })()
      }
      //判断当前是否要添加parentName
      if (parentName !== '') {
        baseobj.parentName = parentName
      }
      // 后端设计：type为3代表是按钮级别的权限
      if (item.children && item.children.length && item.children[0].type !== 3) {
        baseobj.children = Utils.transformRoutesByuserMenus(item.children, baseobj.name)
      }
      preitem.push(baseobj)
      return preitem;
    }, [])
  }
  /**
   * 将配置好的映射关系扁平化
   */
  static flatUserMenus (userMenus) {
    return userMenus.reduce((preitem, item) => {
      preitem.push(Utils.filterObjetKey(item, 'children'));
      if (item.children) {
        preitem.push(...Utils.flatUserMenus(item.children))
      }
      return preitem;
    }, [])
  }
  //根据路径匹配到仓库userMenus对应的id-------递归体操1
  static getIdByStoreUserMenus (url, userMenus) {
    console.log('第一步根据url获取id当前url为',url);
    let id = null;
    for (const item of userMenus) {
      if (item.url === url&&item.type!==1) {
        id = item.id;
        return item.id;
      } else if (item.children && item.children.length) {
        let resid = Utils.getIdByStoreUserMenus(url, item.children)
        if (resid) {
          id = resid;
          return resid;
        }
      }

    }
  }
  //根据id获取到父级id，树形结构需要返回一个数组的父级id列表
  //第一层父级id肯定为[]
  /**
   * 返回的是父级id集合
   * @param {} id 
   * @param {*} userMenus 
   * @param {*} parentIds 
   * @returns 
   */
  static getBreadDataByStoreUserMenus(id,userMenus,parentIds=[]){
    console.log('getBreadDataByStoreUserMenus先获取到当前path的id',id);
    for (const item of userMenus) {
      if(item.id===id){
        //第一层的id肯定是[]
        return parentIds;
      }
      if(item.children&&item.children.length){
        //父级id+子id
         let findid= Utils.getBreadDataByStoreUserMenus(id,item.children,[...parentIds,item.id,id])
         console.log('findid',findid);
         if(findid){
         
          return findid;
         }
      }
      
    }

       
    


  }

}
export default Utils;