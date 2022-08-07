<template>
  <div class="login">
    <el-tabs type="border-card" class="_eltabs">
      <el-tab-pane label="账号登陆">
        <login-account ref="loginAccountRef" />
      </el-tab-pane>
      <el-tab-pane label="手机登陆">
        <login-phone />
      </el-tab-pane>
    </el-tabs>
    <div class="password">
      <el-checkbox v-model="checked" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <div class="loginactions">
      <el-button type="primary" class="btn" @click="loginaction">立即登陆</el-button>
    </div>

  </div>
</template>

<script setup>
import loginAccount from "./cpns/login-account.vue";
import loginPhone from "./cpns/login-phone.vue";
import useLogin from "@/stores/modules/login"
import CacheforLocalStorage from "@/utils/cache"
import { ref, watch, computed, onMounted } from 'vue';

//使用login仓库
const loginStore = useLogin();
//获取账号登陆组件实例
const loginAccountRef = ref()

//是否记住密码
let checked = ref();
onMounted(() => {
  if (CacheforLocalStorage.getCache('accountInfo')) {
    checked.value = true;
    let accountInfo=JSON.parse(CacheforLocalStorage.getCache('accountInfo'));
    loginAccountRef.value.ruleForm.account = accountInfo.account ?? '';
    loginAccountRef.value.ruleForm.password = accountInfo.password ?? '';
  } else {
    checked.value = false;
  }
})

//点击登陆
const loginaction = () => {
 
  loginAccountRef.value.submitForm().then((res) => {
 
    //如果有记住密码，就存储到缓存中
    if (checked.value) {
      CacheforLocalStorage.setCache('accountInfo', JSON.stringify(Object.assign(loginAccountRef.value.ruleForm, {
        checked: checked.value
      })))
    } else {
      CacheforLocalStorage.removeCache('accountInfo')
    }
    loginStore.loginActions(loginAccountRef.value.ruleForm.account, loginAccountRef.value.ruleForm.password)
  }, (err) => {
  
  })

}
</script>

<style lang="less" scoped>
@width: 500px;

.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url('../../assets/images/login_bg.png');

  .password {
    width: @width;
    display: flex;
    justify-content: space-between;
  }

  .loginactions {
    width: @width;

    .btn {
      width: 100%;
    }
  }

  :deep(._eltabs) {
    width: @width  !important;
  }
}
</style>