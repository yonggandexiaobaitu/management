
<template>
  <div class="Nightingale-Chart">
    <BaseEchart :options="comoptions" />
  </div>
</template>

<script setup>
import BaseEchart from "@/components/baseEcharts/index.vue"
import { computed, } from "vue";
const props = defineProps({
  data: {
    type: Array,
    default: () => ([])
  }
})
const comoptions = computed(() => {
  console.log('计算属性触发了');
  return {
    title: {
      text: '玫瑰图',
      subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c} ({d}%)'
    },
    legend: {
      left: 'center',
      top: 'bottom',
      data: [
        'rose1',
        'rose2',
        'rose3',
        'rose4',
        'rose5',
        'rose6',
        'rose7',
        'rose8'
      ]
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: 'Area Mode',
        type: 'pie',
        radius: [20, 140],
        center: ['75%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 5
        },
        data: [
          { value: 30, name: 'rose 1' },
          { value: 28, name: 'rose 2' },
          { value: 26, name: 'rose 3' },
          { value: 24, name: 'rose 4' },
          { value: 22, name: 'rose 5' },
          { value: 20, name: 'rose 6' },
          { value: 18, name: 'rose 7' },
          { value: 16, name: 'rose 8' }
        ]
      }
    ]
  }
})





</script>

<style lang="less" scoped>
</style>