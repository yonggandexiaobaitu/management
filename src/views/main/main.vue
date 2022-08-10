<template>


 <div class="common-layout">
    <el-container>
      <el-aside width="200px">  <navMenu /></el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
 
</template>

<script setup>
import navMenu from "@/components/nav-menu/index.vue"

</script>

<style lang="less" scoped>
</style>