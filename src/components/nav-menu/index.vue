<template>
  <div class="navMenu">
   
    <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" :default-active="id" :router="true"
      @select="onselect">
      <template v-for="item in userMenus">
        <navSubMenu :item='item' />
      </template>
    </el-menu>
  </div>
</template>
<script setup>
import { computed, ref, onMounted, watch } from 'vue';

import useLogin from "@/stores/modules/login";
import Utils from "@/utils/index"
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router"
import navSubMenu from "./cpns/nav-sub-menu.vue"
const loginStore = useLogin();
const router = useRouter();
const route = useRoute();
//获取用户菜单列表
const userMenus = computed(() => {
  return loginStore.userMenus;
})
let id = ref('');//绑定的id，可以用于高亮菜单选项
let res = null;
onMounted(() => {
  res = Utils.getIdByStoreUserMenus(route.path, userMenus.value);
  //如果当前递归找不到id的话，那么重定向到第一位置
  if (!res) {
    res = userMenus.value[0].children[0].id;
    router.push(userMenus.value[0].children[0].url)
  }
  let res2 = Utils.getBreadDataByStoreUserMenus(res, userMenus.value)
  if (res2.length) {
    let breadData = Utils.flatUserMenus(loginStore.userMenus).reduce((pre, item) => {
      if (res2.includes(item.id)) {
        pre.push(item)
      }
      return pre;
    }, [])
    loginStore.breadData = breadData;
    console.log('面包屑数据', breadData);
  }
  id.value = res + ''
})
onBeforeRouteUpdate((to, from) => {
  res = Utils.getIdByStoreUserMenus(to.path, userMenus.value);
  //如果当前递归找不到id的话，那么重定向到第一位置
  if (!res) {
    res = userMenus.value[0].children[0].id;
    router.push(userMenus.value[0].children[0].url)
  }
  let res2 = Utils.getBreadDataByStoreUserMenus(res, userMenus.value)
  if (res2.length) {
    let breadData = Utils.flatUserMenus(loginStore.userMenus).reduce((pre, item) => {
      if (res2.includes(item.id)) {
        pre.push(item)
      }
      return pre;
    }, [])
    loginStore.breadData = breadData;
  }
})
const isCollapse = ref(false);


const onselect = (item1) => {
  id.value = item1 + '';
}

</script>

<style lang="less" scoped>
.navMenu {
  height: 100vh;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100vh;
}
</style>