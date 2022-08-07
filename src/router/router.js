import {createRouter,createWebHashHistory} from "vue-router";
import CacheforLocalStorage from "@/utils/cache"
const routes=[
  {
    path:'/login',
    name:'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path:'/',
    redirect:'/login'
  },
  {
    path:'/main',
    name:'main',
    component:()=>import('@/views/main/main.vue')
  }
];
const router=createRouter({
  history:createWebHashHistory(),
  routes
})
//axios添加前置导航守卫
router.beforeEach((to, from) => {
  if(to.path==='/login')return true;
  let token=CacheforLocalStorage.getCache('token');
  if(token){
    return true;
  }else{
    router.push('/login')
  }
})
export default router;