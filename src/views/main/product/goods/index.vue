<template>
  <div class="user">
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
import { setelSelect, setelInput, setdatepicker } from "@/components/form/config/index.js"
import { ref } from "vue"
//表单绑定数据
const formValue = ref({
  goodsname: '222222222',
  goodsaddress: '',
  goodstatus: '',
  datevalue: ''
})
//配置表单
const fromConfig = [
  setelInput({
    label: '商品名称',
    placeholder: '请输入商品名称',
    bindDataName: "goodsname"
  }),
  setelInput({
    label: '商品地址',
    placeholder: '请输入商品地址',
    bindDataName: "goodsaddress"
  }),

  setelSelect({
    placeholder: '请选择状态',
    label: '状态',
    bindDataName: "goodstatus",
    elOptions: [
      {
        label: '可用',
        value: 1
      },
      {
        label: '下架',
        value: 0
      },
    ]
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