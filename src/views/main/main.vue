<template>


  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <navMenu />
      </el-aside>
      <el-container>
        <el-header>

          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">promotion management</a></el-breadcrumb-item>
            <el-breadcrumb-item>promotion list</el-breadcrumb-item>
            <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
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

</script>

<style lang="less" scoped>
</style>