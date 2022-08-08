<template>
  <div>
    <el-menu class="el-menu-vertical-demo" >
      <template v-for="item in userMenus">
        <navSubMenu :item='item' />
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { computed } from "vue"
import useLogin from "@/stores/modules/login";
import navSubMenu from "./cpns/nav-sub-menu.vue"

const loginStore = useLogin();

//获取用户菜单列表
const userMenus = computed(() => {
  return loginStore.userMenus;
})

</script>

<style lang="less" scoped>

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>