import { defineStore } from "pinia"
import LoginApi from "@/service/api/login"
import CacheforLocalStorage from "@/utils/cache"
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
      } catch (error) {
        this.userMenus = userMenus
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
      this.userMenus = res.data.data;
      CacheforLocalStorage.setCache('userMenus', res.data.data)
      console.log('获取到角色菜单', res.data.data)
    }
  }

})

