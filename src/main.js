import { createApp } from 'vue'

//重置浏览器样式
import "normalize.css"
import "./assets/css/index.css"
//引入路由
import router  from './router/router'
//引入pinia
import pinia from "./stores/index"
import App from './App.vue'
import useLogin from "@/stores/modules/login"

const app= createApp(App)
app.use(router)
app.use(pinia)
//初始化store数据，防止用户刷新
const loginStore=useLogin()
loginStore.initStore();
app.mount('#app')
