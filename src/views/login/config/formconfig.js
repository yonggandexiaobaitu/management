import {reactive} from "vue"

//表单的配置规则
const rules = reactive({
  account: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 5, max: 11, message: '账号长度5到11位', trigger: 'blur' },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
  ],
 
})
export default rules;