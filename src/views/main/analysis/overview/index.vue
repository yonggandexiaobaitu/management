<template>
  <div>
    <pie-echarts :data="data"/>
    <NightingaleChart :data="data"/>
    <areaChart :xAxis_data="xAxis_data"  :series_data="series_data" />
  </div>
</template>

<script setup>
import NightingaleChart from "@/components/baseEcharts/src/Nightingale-Chart.vue"
import pieEcharts from "../../../../components/baseEcharts/src/pie-echarts.vue";
import areaChart from "@/components/baseEcharts/src/area-chart.vue"
import {ref,computed} from "vue"
let data=ref([]);
let xAxis_data=computed(()=>{
  console.log('data.value',data.value.map(item=>item.name));
  // return [];
  return data.value.map(item=>{
    return item.name;
  })
})
let series_data=computed(()=>{
  console.log('data.value',data.value);
  // return [];
  return data.value.map(item=>{
    return item.value;
  })
})
const getdata = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let data = [{ "id": 2, "name": "上衣", "goodsCount": 49749 }, { "id": 3, "name": "裤子", "goodsCount": 84754 }, { "id": 4, "name": "鞋子", "goodsCount": 58283 }, { "id": 5, "name": "厨具", "goodsCount": 57354 }, { "id": 6, "name": "家具", "goodsCount": 49002 }, { "id": 7, "name": "床上用品", "goodsCount": 98579 }, { "id": 8, "name": "女装", "goodsCount": 112268 }];
      console.log('页面2秒之后更新');
      resolve(data)
    }, 2000)
  })
}
getdata().then(res => {
   data.value= res.map(item => {
    return { value: item.goodsCount, name: item.name }
  })
 
})
</script>

<style lang="less" scoped>

</style>