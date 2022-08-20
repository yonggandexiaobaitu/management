
<template>
  <el-form label-width="120px" :model="form">
    <el-row>
      <template v-for="(item, index) in fromConfig">
        <!-- elinput -->
        <template v-if="item.elitemtype === 'el-input'">
          <el-col :lg="8" :key="index">
            <el-form-item :label="item.label">
              <el-input :placeholder="item.placeholder" v-model="form[item.bindDataName]" />
            </el-form-item>
          </el-col>
        </template>
        <!-- el select-->
        <template v-if="item.elitemtype === 'el-select'">
          <el-col :lg="8">
            <el-form-item :label="item.label">
              <el-select :placeholder="item.placeholder" v-model="form[item.bindDataName]">
                <template v-for="(selectItem, selectIndex) in item.elOptions" :key="selectIndex">
                  <el-option :label="selectItem.label" :value="selectItem.value" />
                </template>
              </el-select>
            </el-form-item>
          </el-col>
        </template>
        <!-- 日期选择器 -->
        <template v-if="item.elitemtype === 'el-date-picker'">
          <el-col :lg="8">
            <el-form-item :label="item.label">
              <el-date-picker :type="item.type" :start-placeholder="item.start_placeholder"
                :end-placeholder="item.end_placeholder" v-model="form[item.bindDataName]" />
            </el-form-item>
          </el-col>
        </template>
      </template>
      <el-col :lg="8"></el-col>
      <el-col :lg="8"></el-col>
      <el-col :lg="8"></el-col>
      <el-col :lg="8">
        <el-form-item>
          <el-button type="primary"  @click="reset">重置</el-button>
          <el-button @click="searchValue">查询</el-button>
        </el-form-item>
      </el-col>

    </el-row>
  </el-form>
</template>

<script setup>
import { ref, watch,toRefs } from "vue"
const props = defineProps({
  //表单配置
  fromConfig: {
    type: Array,
    default: () => ([])
  },
  formValue: {
    type: Object,
    default: () => ({})
  },
});
const emits = defineEmits(['onformchange','onsearchAction'])
let form = ref(Object.assign({}, props.formValue))
let res=toRefs(form.value)
watch(form, (newvalue, oldvalue) => {
  emits('onformchange', newvalue)
}, {
  deep: true
})

//重置
const reset=()=>{
  for (const key in res) {
    if (Object.hasOwnProperty.call(res, key)) {
      const item = res[key];
      item.value=null;
    }
  }
}
//查询
const searchValue=()=>{
  emits('onsearchAction')
}
</script>