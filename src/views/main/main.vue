<template>


  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <navMenu />
      </el-aside>
      <el-container>
        <el-header>
          <el-breadcrumb separator="=>">
            <template v-for="(item,index) in getBreadData" :key="index">
                <el-breadcrumb-item @click="onbreadcrumbClick(item)">{{item.name}}</el-breadcrumb-item>
            </template>
          </el-breadcrumb>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script setup>
import navMenu from "@/components/nav-menu/index.vue"
import useLogin from "@/stores/modules/login.js"
import { useRouter } from "vue-router";
import {computed} from "vue"
const  loginStore=useLogin();
const router=useRouter();
const getBreadData=computed(()=>{
  return loginStore.breadData;
})
const onbreadcrumbClick=(item)=>{
  console.log('item',item);
  if(item.type===1)return;
  router.push(item.url)

}
</script>

<style lang="less" scoped>
</style>