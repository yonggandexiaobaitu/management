
<template>
  <div class="Nightingale-Chart">
    <BaseEchart :options="comoptions" />
  </div>
</template>

<script setup>
import BaseEchart from "@/components/baseEcharts/index.vue"
import { computed, } from "vue";
const props = defineProps({
  xAxis_data: {
    type: Array,
    default: () => ([])
  },
  series_data: {
    type: Array,
    default: () => ([])
  },
})
const comoptions = computed(() => {
  console.log('计算属性触发了');
  return {
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: props.xAxis_data
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: props.series_data,
      type: 'line',
      areaStyle: {}
    }
  ]
};
})





</script>

<style lang="less" scoped>
</style>