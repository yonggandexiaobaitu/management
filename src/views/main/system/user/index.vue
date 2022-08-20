<template>
  <div class="user">
    <div class="user-form">
      <myform :fromConfig="fromConfig" :formValue="formValue" @onformchange="onformchange"
        @onsearchAction="onsearchAction"></myform>
    </div>
    <div class="user-content">
      <mytable :tableData='tableData' v-bind="tableconfig">
        <template #title>
          用户列表
        </template>
        <template #rightcontent>
          <el-button type="success" v-if="$isAuth('system:users:create')" @click="showUserEdit(false)">新建用户</el-button>
        </template>
        <template #order="slotProps">
          {{ slotProps.index + 1 }}
        </template>
        <template #enable="slotProps">
          <el-button type="success">{{ comenable(slotProps.row.enable) }}</el-button>
        </template>
        <template #createAt="slotProps">
          {{ Day.formatday(slotProps.row.createAt, 'YYYY-MM-DD HH:MM:ss') }}
        </template>
        <template #updateAt="slotProps">
          {{ Day.formatday(slotProps.row.updateAt, 'YYYY-MM-DD HH:MM:ss') }}
        </template>
        <template #handle="slotProps">
          <el-button type="primary" v-if="$isAuth('system:users:update')" @click="showUserEdit(true)">编辑</el-button>
          <el-button type="danger" v-if="$isAuth('system:users:delete')">删除</el-button>
        </template>
      </mytable>
    </div>
    <use-dialog v-if="_dialogVisible" ref="useDialogRef" />
  </div>
</template>



<script setup>
import Day from "@/utils/formattime.js"
import myform from "@/components/form/index.vue";
import mytable from "@/components/table/table.vue"
import useForm from "@/hook/useform.js"
import { userslist } from "@/service/api/use.js";//获取用户列表
import tableconfig from "./cpns-config/tableconfig.js";//配置表格
import { ref, computed, nextTick } from "vue";
import useDialog from "./cpns/useDialog.vue"


//表单绑定数据,
let { formValue, fromConfig } = useForm({
  username: '222222222',
  realName: '',//真实姓名
  phone: '',
  status: '',//状态
  datevalue: ''
}, [
  {
    type: 'setelInput',
    options: {
      label: '用户名',
      placeholder: '请输入用户名',
      bindDataName: "username"
    }
  },
  {
    type: 'setelInput',
    options: {
      label: '真实姓名',
      placeholder: '请输入真实名',
      bindDataName: "realName"
    }
  },
  {
    type: 'setelInput',
    options: {
      label: '手机号码',
      placeholder: '请输入手机号码',
      bindDataName: "phone"
    }
  },
  {
    type: 'setelSelect',
    options: {
      placeholder: '请选择状态',
      label: '状态',
      bindDataName: "status",
      elOptions: [
        {
          label: '启用',
          value: 1
        },
        {
          label: '禁用',
          value: 0
        },
      ]
    }
  },
  {
    type: 'setdatepicker',
    options: {
      type: "daterange",
      label: "创建时间",
      start_placeholder: "开始时间",
      end_placeholder: "结束时间",
      bindDataName: "datevalue",
    }
  },
])
//侦听表单改变
const onformchange = (value) => {
  formValue.value = value;
}
//侦听表单查询
const onsearchAction = async () => {
  console.log('查询', formValue.value);
  let res = await userslist({
    cellphone: formValue.value.phone,
    createAt: formValue.value.datevalue,
    enable: formValue.value.status,
    name: formValue.value.username,
    realname: formValue.value.phone,
  })
  tableData.value = res.data.data.list;
  totalCount.value = res.data.data.totalCount;
}
//表格数据
let tableData = ref([]);
//表格总数量
let totalCount = ref(0);

//请求用户列表
userslist().then(res => {
  console.log('res', res);
  tableData.value = res.data.data.list;
  totalCount.value = res.data.data.totalCount;
});
//计算是否显示启用还是禁用
const comenable = computed(() => {
  return (enable) => {
    return enable === 1 ? '启用' : '禁用'
  }
});

let useDialogRef = ref(null);
let _dialogVisible = ref(false)
//显示弹窗
/**
 * 
 * @param {*} isEdit 是否编辑
 */
const showUserEdit = (isEdit) => {
  _dialogVisible.value = true;//显示弹窗
  nextTick(() => {
    useDialogRef.value.init(isEdit)

  })


}

</script>

<style lang="less" scoped>
</style>