<template>
  <div>
    <myform :fromConfig="fromConfig" :formValue="formValue" @onformchange="onformchange"
      @onsearchAction="onsearchAction"></myform>

    <div class="user-content">
      <mytable :tableData='tableData' v-bind="tableconfig">
        <template #title>
          角色列表
        </template>
        <template #rightcontent>
          <el-button type="success" v-if="$isAuth('system:role:create')" >新建角色</el-button>
        </template>
        <!-- 序号 -->
        <template #order="slotProps">
          {{ slotProps.index + 1 }}
        </template>
 
        <template #createAt="slotProps">
          {{ Day.formatday(slotProps.row.createAt, 'YYYY-MM-DD HH:MM:ss') }}
        </template>
        <template #updateAt="slotProps">
          {{ Day.formatday(slotProps.row.updateAt, 'YYYY-MM-DD HH:MM:ss') }}
        </template>
        <template #handle="slotProps">
          <el-button type="primary" v-if="$isAuth('system:role:update')" >编辑</el-button>
          <el-button type="danger" v-if="$isAuth('system:role:delete')">删除</el-button>
        </template>
      </mytable>
    </div>
   
  </div>
</template>

<script setup>
import Day from "@/utils/formattime.js"
import myform from "@/components/form/index.vue";
import mytable from "@/components/table/table.vue"
import tableconfig from "./cpns-config/tableconfig.js";//配置表格
import {rolelist} from "@/service/api/role.js"
import { setelInput, setdatepicker } from "@/components/form/config/index.js"
import { ref } from "vue"

//表单绑定数据
const formValue = ref({
  role_name: '',
  auth_info: "",
  datevalue: '',
})
//配置表单
const fromConfig = [
  setelInput({
    label: '角色名称',
    placeholder: '请输入角色名称',
    bindDataName: "role_name"
  }),
  setelInput({
    label: '权限介绍',
    placeholder: '请输入权限介绍',
    bindDataName: "auth_info"
  }),
  setdatepicker({
    type: "daterange",
    label: "创建时间",
    start_placeholder: "开始时间",
    end_placeholder: "结束时间",
    bindDataName: "datevalue",
  })
]
//侦听表单改变
const onformchange = (value) => {
  formValue.value = value;
}
//侦听表单查询
const onsearchAction = () => {
  console.log('查询');
}


//表格数据
let tableData = ref([]);
//表格总数量
let totalCount = ref(0);

//请求用户列表
rolelist().then(res => {
  console.log('res', res);
  tableData.value = res.data.data.list;
  totalCount.value = res.data.data.totalCount;
});



</script>

<style lang="less" scoped>
</style>