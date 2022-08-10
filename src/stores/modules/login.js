import { defineStore } from "pinia"
import Utils from "@/utils"
import LoginApi from "@/service/api/login"
import CacheforLocalStorage from "@/utils/cache"
import {useRouter} from "vue-router"
import router from "@/router/router.js"
export default defineStore('loginStore', {
  state () {
    return {
      userId: null,
      userInfo: null,
      userMenus: [],
      token: null,

    }
  },
  actions: {
    //设置初始的仓库数据，防止用户刷新store里面的数据没有了,需要从缓存中拿数据赋值到仓库中
    initStore () {
      //先判断缓存中数据是否是对象，如果是对象，需parse
      let userId = CacheforLocalStorage.getCache('userId');
      let userInfo = CacheforLocalStorage.getCache('userInfo');
      let userMenus = CacheforLocalStorage.getCache('userMenus');
      let token = CacheforLocalStorage.getCache('token');

      try {
        this.userId = JSON.parse(userId);
      } catch (error) {
        this.userId = userId;
      }
      try {
        this.userInfo = JSON.parse(userInfo);
      } catch (error) {
        this.userInfo = userInfo;
      }
      try {
        this.userMenus = JSON.parse(userMenus);
        let res2 = Utils.transformRoutesByuserMenus(this.userMenus)
        console.log('根据角色id获取到角色菜单动态添加路由', res2);
        const routes = Utils.flatUserMenus(res2)
        // console.log('routes', routes);
        routes.forEach(item => {
          // console.log('item', item);
          router.addRoute('main',item);//必须指定放在哪一个目录下面，不然的话，跳转的时候会放在路由的第一级router-view中
        })
       
      } catch (error) {
        this.userMenus = userMenus;
        // let res2 = Utils.transformRoutesByuserMenus(this.userMenus)
        // console.log('根据角色id获取到角色菜单动态添加路由', res2);
        // const routes = Utils.flatUserMenus(res2)
        // // console.log('routes', routes);
        // routes.forEach(item => {
        //   // console.log('item', item);
        //   router.addRoute(item)
        // })
      }
      try {
        this.token = JSON.parse(token);
      } catch (error) {
        this.token = token;
      }


    },
    //登陆请求行为
    async loginActions (account, password) {


      let res = await LoginApi.login(account, password);
      console.log('登陆请求结果res', res.data.data)
      //设置用户id
      this.setUserId(res.data.data.id);
      //设置token,将token添加到缓存中
      this.setToken(res.data.data.token);
      //根据用户id拿到用户相关信息
      await this.getUserInfoByid()
      //根据角色id获取到角色菜单
      await this.getUserMenusByRoleId();
      //动态添加路由
      let res2 = Utils.transformRoutesByuserMenus(this.userMenus)
      console.log('根据角色id获取到角色菜单动态添加路由', res2);
      const routes = Utils.flatUserMenus(res2)
      // console.log('routes', routes);
      routes.forEach(item => {
        // console.log('item', item);
        router.addRoute('main',item)
      })

      //跳转到首页
      router.push('main')

    },
    //设置用户id
    setUserId (id) {
      this.userId = id;
      CacheforLocalStorage.setCache('userId', this.userId)
    },
    //设置token,将token添加到缓存中
    setToken (token) {
      this.token = token;
      CacheforLocalStorage.setCache('token', this.token)
    },
    //根据用户id拿到用户相关信息
    async getUserInfoByid () {
      let res = await LoginApi.getUserInfoByID(this.userId)
      this.userInfo = res.data.data;
      CacheforLocalStorage.setCache('userInfo', this.userInfo)
      console.log('获取到当前用户信息', res);
    },
    //根据角色id获取到角色菜单
    async getUserMenusByRoleId () {
      let res = await LoginApi.getUserMenusByRoleId(this.userInfo.role.id);
      // res.data.data.push({
      //   icon: "el-icon-chat-line-round",
      //   id: 42,
      //   name: "雅欣啊",
      //   sort: 5,
      //   type: 1,
      //   url: "/main/story2",
      //   children:[]
      // })

      this.userMenus = res.data.data;
      CacheforLocalStorage.setCache('userMenus', res.data.data)
      console.log('获取到角色菜单', res.data.data)
    }
  }

})

