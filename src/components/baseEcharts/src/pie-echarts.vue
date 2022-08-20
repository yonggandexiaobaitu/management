
<template>
  <div class="pieEcharts">
    <BaseEchart :options="comoptions" />
  </div>
</template>

<script setup>
import BaseEchart from "@/components/baseEcharts/index.vue"
import { computed, } from "vue";
const props=defineProps({
  data:{
    type:Array,
    default:()=>([])
  }
})
const comoptions=computed(()=>{
  console.log('计算属性触发了');
  return {
  title: {
    text: '分类数量,饼图',
    subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data:props.data,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
})





</script>

<style lang="less" scoped>
</style>