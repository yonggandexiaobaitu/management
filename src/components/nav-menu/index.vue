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
import { computed, ref, watch } from 'vue';

import useLogin from "@/stores/modules/login";
import Utils from "@/utils/index"
import { useRoute, useRouter } from "vue-router"
import navSubMenu from "./cpns/nav-sub-menu.vue"
const loginStore = useLogin();
const router = useRouter();
const route = useRoute();
//获取用户菜单列表
const userMenus = computed(() => {
  return loginStore.userMenus;
})
let res = Utils.getIdByStoreUserMenus(route.path, userMenus.value)
//如果当前递归找不到id的话，那么重定向到第一位置
if(!res){
  res=userMenus.value[0].children[0].id;
  router.push(userMenus.value[0].children[0].url)
}
console.log('根据路径获取id',res,route.path);

let id = ref(res + '');//绑定的id，可以用于高亮菜单选项
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