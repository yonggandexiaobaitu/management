<template>
     <div class="user-content">
      <mytable :tableData='tableData' v-bind="tableconfig">
        <template #title>
          菜单列表
        </template>
        <template #rightcontent>
          <el-button type="success">新建菜单</el-button>
        </template>
        <template #createAt="slotProps">
          {{ Day.formatday(slotProps.row.createAt, 'YYYY-MM-DD HH:MM:ss') }}
        </template>
        <template #updateAt="slotProps">
          {{ Day.formatday(slotProps.row.updateAt, 'YYYY-MM-DD HH:MM:ss') }}
        </template>
        <template #handle="slotProps">
          <el-button type="primary">编辑</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </mytable>
    </div>
</template>

<script setup>
import Day from "@/utils/formattime.js"
import mytable from "@/components/table/table.vue"
import tableconfig from "./cpns-config/tableconfig.js";//配置表格
import { menulist } from "@/service/api/menu.js";//获取菜单
import { ref } from "vue";
//表格数据
let tableData = ref([]);
menulist().then(res=>{
  console.log('res',res);
  tableData.value = res.data.data.list;
  console.log('tableData',tableData);
})
</script>

<style lang="less" scoped>

</style>