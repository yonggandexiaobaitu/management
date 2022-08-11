import {createRouter,createWebHashHistory} from "vue-router";
import CacheforLocalStorage from "@/utils/cache"
import NotFound from "@/views/notFound/index.vue"
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
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];
const router=createRouter({
  history:createWebHashHistory(),
  routes
})
//axios添加前置导航守卫
let flag = 0
router.beforeEach((to, from) => {
  console.log('to',to);
  // if (flag === 0 && to.matched.length == 0) { 
  //   flag++
  //   router.push(to.path); 
  // } 
  if(to.path==='/login')return true;
  let token=CacheforLocalStorage.getCache('token');
  if(token){
    return true;
  }else{
    router.push('/login')
  }
})
export default router;