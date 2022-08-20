import { setelSelect, setelInput, setdatepicker } from "@/components/form/config/index.js"
import { ref } from "vue"
export default (formValueParams, fromConfigParams) => {
  console.log('formValueParams, fromConfigParams',formValueParams, fromConfigParams);
  //表单绑定数据
  const formValue = ref(formValueParams);
  //配置表单
  const fromConfig = fromConfigParams.reduce((pre, item) => {
    if (item.type === 'setelSelect') {
      pre.push(setelSelect(item.options))
    }
    if (item.type === 'setelInput') {
      pre.push(setelInput(item.options))
    }

    if (item.type === 'setdatepicker') {
      pre.push(setdatepicker(item.options))
    }
    return pre;
  }, []);
  console.log('formValue,fromconfig',formValue,fromConfig);
  return {
    formValue,
    fromConfig
  }

}