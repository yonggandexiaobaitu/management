<template>
  <div class="department">
       <myform 
    :fromConfig="fromConfig" 
    :formValue="formValue" 
    @onformchange="onformchange"
    @onsearchAction="onsearchAction"
    
    ></myform>
  </div>
   <div class="user-content">
      <mytable :tableData='tableData' v-bind="tableconfig">
        <template #title>
          部门列表
        </template>
        <template #rightcontent>
          <el-button type="success">新建用户</el-button>
        </template>
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
          <el-button type="primary">编辑</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </mytable>
   </div>
</template>

<script setup>
import myform from "@/components/form/index.vue";
import mytable from "@/components/table/table.vue"
import tableconfig from "./cpns-config/tableconfig.js";//配置表格
import Day from "@/utils/formattime.js"
import { departmentlist } from "@/service/api/department.js";//获取部门列表
import { setelInput, setdatepicker } from "@/components/form/config/index.js"
import { ref } from "vue"
//表单绑定数据
const formValue = ref({
 dep_name:'',
 dep_person:"",
 datevalue:'',
})
//配置表单
const fromConfig = [
  setelInput({
    label: '部门名称',
    placeholder: '请输入部门名称',
    bindDataName: "dep_name"
  }),
  setelInput({
    label: '部门领导',
    placeholder: '请输入部门领导',
    bindDataName: "dep_person"
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
const onformchange=(value)=>{
  formValue.value=value;
}
//侦听表单查询
const onsearchAction=()=>{
  console.log('查询');
}

//表格数据
let tableData = ref([]);
//表格总数量
let totalCount = ref(0);

//请求部门列表
departmentlist().then(res => {
  console.log('res', res);
  tableData.value = res.data.data.list;
  totalCount.value = res.data.data.totalCount;
});

</script>

<style lang="less" scoped>

</style>