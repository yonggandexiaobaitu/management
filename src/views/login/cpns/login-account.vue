<template>
  <div class="loginAccount">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="70px" class="demo-ruleForm" status-icon>
      <el-form-item label="账号" prop="account">
        <el-input v-model="ruleForm.account" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" />
      </el-form-item>
    </el-form>

  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import rules from "../config/formconfig"

//ref引用的form表单
const ruleFormRef = ref()
//form表单绑定的数据
const ruleForm = reactive({
  account: "",
  password: ""
});
const submitForm = async (formEl) => {
  if (!formEl) {
    //如果当前没有，就获取一下引用值才可以
    formEl = ruleFormRef.value;
  }
  let res = null;
  try {
    await formEl.validate((valid, fields) => {
      if (valid) {
        res = 'success'
      }else{
        throw new Error('失败了')
      }
    })
    return res;
  } catch (error) {
    throw new Error(error)
  }
}






defineExpose({
  ruleForm,
  submitForm
})
</script>

<style lang="less" scoped>
</style>