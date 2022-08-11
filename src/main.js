import { createApp  } from 'vue'

//重置浏览器样式
import "normalize.css"
import "./assets/css/index.css"
const app = createApp(App)
//引入pinia
import pinia from "./stores/index"
app.use(pinia)
import useLogin from "@/stores/modules/login"
//初始化store数据，防止用户刷新
const loginStore = useLogin()
loginStore.initStore();

//引入路由
import router from './router/router'
app.use(router)
import App from './App.vue'

console.log('路由路由');
app.mount('#app')
