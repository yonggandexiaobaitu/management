<template>
  <div class="useDialog">
    <el-dialog v-model="dialogVisible" :title="com_title" width="50%">
      <myform  :fromConfig="_fromConfig" :formValue="_formValue"  @onformchange="onformchange"/>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { rolelist } from "@/service/api/role.js"
import myform from "@/components/form/index.vue";
import { departmentlist } from "@/service/api/department.js";//获取部门列表
import useForm from "@/hook/useform.js"
//表单绑定数据,
let Dynanic = [
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
      placeholder: '请选择角色',
      label: '选择角色',
      bindDataName: "role",
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
    type: 'setelSelect',
    options: {
      placeholder: '请选择部门',
      label: '选择部门',
      bindDataName: "dep",
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
]
let _formValue = ref(null);
let _fromConfig = ref(null);

let dialogVisible = ref(false);
let refisEdit = ref(false);//是否是编辑
const init = (isEdit) => {
  let allPromise = [];
  //请求部门列表
  let p1 = departmentlist()
  //请求用户列表
  let p2 = rolelist()
  allPromise.push(p1, p2);
  Promise.all(allPromise).then(res => {
    console.log('获取两个数据', res);
    Dynanic[3].options.elOptions = res[1].data.data.list.map(item => {
      let config = {
        label: item.name,
        value: item.id
      }
      return config
    })
    Dynanic[4].options.elOptions = res[0].data.data.list.map(item => {
      let config = {
        label: item.name,
        value: item.id
      }
      return config
    })
    const config = useForm({
      username: '',
      realName: '',//真实姓名
      phone: '',
      role: '',
      dep: ''
    }, Dynanic)
    console.log('config', config);
    _formValue.value = config.formValue.value;
    _fromConfig.value = config.fromConfig;
    dialogVisible.value = true;//显示弹窗
    refisEdit.value = isEdit;//是否是编辑
  })


}
//侦听表单改变
const onformchange = (value) => {
  _formValue.value = value;
}
const com_title = computed(() => {
  return refisEdit.value ? '编辑用户' : '新增用户'
});



defineExpose({
  init
})
</script>

<style lang="less" scoped>
</style>