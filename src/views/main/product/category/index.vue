<template>
  <div class="category">
       <myform 
    :fromConfig="fromConfig" 
    :formValue="formValue" 
    @onformchange="onformchange"
    @onsearchAction="onsearchAction"
    
    ></myform>
  </div>
</template>

<script setup>
import myform from "@/components/form/index.vue";
import { setelInput, setdatepicker } from "@/components/form/config/index.js"
import { ref } from "vue"
//表单绑定数据
const formValue = ref({
 category_name:'',
 datevalue:'',
})
//配置表单
const fromConfig = [
  setelInput({
    label: '类别名称',
    placeholder: '请输入类别名称',
    bindDataName: "category_name"
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
</script>

<style lang="less" scoped>

</style>