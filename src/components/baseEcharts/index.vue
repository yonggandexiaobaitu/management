<template>
  <div ref="echartsref" style="width: 600px;height:400px;">

  </div>
</template>

<script setup>

import useEcharts from "@/hook/useecharts.js"
import { onMounted, ref, watch, watchEffect } from 'vue';

const props = defineProps({
  options: {
    type: Object,
    default: () => ({})
  },

})
const echartsref = ref(null);

onMounted(() => {
  console.log('echartsref.value', echartsref.value);
  let { myChart, setOption } = useEcharts(echartsref.value);
  setOption(props.options)
  watch(() => props.options, (newval) => {
    console.log('侦听', newval);
    setOption(newval)
  }, {
    deep: true
  })


})




</script>

<style lang="less" scoped>
</style>