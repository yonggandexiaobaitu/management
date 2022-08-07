import axios from "axios";
import config from "./config"
import CacheforLocalStorage from "@/utils/cache"
class myRequest{
  constructor(config){
    this.axiosInstance=axios.create(config)
    // 配置请求拦截和响应拦截
    this.axiosInstance.interceptors.request.use(function (config) {
      // 在发送请求之前做些什么
      //从缓存判断是否有token，如果有，需要携带上token
      if(CacheforLocalStorage.getCache('token')){
        let token=CacheforLocalStorage.getCache('token');
        config.headers['AUTHORIZATION']=`Bearer ${token}`
      }
     
      return config;
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    });
       
    this.axiosInstance.interceptors.response.use(function (response) {
      // 2xx 范围内的状态码都会触发该函数。
      // 对响应数据做点什么
      return response;
    }, function (error) {
      // 超出 2xx 范围的状态码都会触发该函数。
      // 对响应错误做点什么
      return Promise.reject(error);
    });
  }
  request(config){
   return this.axiosInstance.request(config)
  }
  post(config){
   return this.request(Object.assign(config,{
      method:"post"
   
    }))
  }
  get(config){
    return this.request(Object.assign(config,{
      method: 'get', // 默认值
    }))
  }
}

export default new myRequest(config);